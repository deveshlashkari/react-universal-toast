#!/bin/bash

# Release script for react-universal-toast
# Usage: ./release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default to patch if no argument provided
RELEASE_TYPE=${1:-patch}

echo -e "${YELLOW}🚀 Starting release process...${NC}"

# Check if working directory is clean
if [[ -n $(git status --porcelain) ]]; then
    echo -e "${RED}❌ Working directory is not clean. Please commit or stash changes.${NC}"
    exit 1
fi

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo -e "${RED}❌ Please switch to main branch before releasing.${NC}"
    exit 1
fi

# Pull latest changes
echo -e "${YELLOW}📥 Pulling latest changes...${NC}"
git pull origin $CURRENT_BRANCH

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm test

# Build the project
echo -e "${YELLOW}🔨 Building project...${NC}"
npm run build

# Bump version
echo -e "${YELLOW}📈 Bumping version ($RELEASE_TYPE)...${NC}"
NEW_VERSION=$(npm version $RELEASE_TYPE --no-git-tag-version)
echo -e "${GREEN}✅ New version: $NEW_VERSION${NC}"

# Commit version bump
git add package.json package-lock.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
echo -e "${YELLOW}🏷️  Creating and pushing tag...${NC}"
git tag $NEW_VERSION
git push origin $CURRENT_BRANCH
git push origin $NEW_VERSION

echo -e "${GREEN}🎉 Release $NEW_VERSION initiated!${NC}"
echo -e "${GREEN}✅ GitHub Actions will automatically publish to npm.${NC}"
echo -e "${YELLOW}📦 Check the Actions tab on GitHub for progress.${NC}"
