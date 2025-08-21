#!/bin/bash

# Auto-update script for ChatGPT Clone repository
# This script automatically commits and pushes changes to GitHub

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    print_error "Not in a git repository. Please run this script from the project root."
    exit 1
fi

# Check if we have uncommitted changes
if git diff-index --quiet HEAD --; then
    print_status "No changes to commit."
    exit 0
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
print_status "Current branch: $CURRENT_BRANCH"

# Check if we're on main branch
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "Not on main branch. Current branch: $CURRENT_BRANCH"
    read -p "Do you want to continue? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Aborted."
        exit 0
    fi
fi

# Stage all changes
print_status "Staging all changes..."
git add .

# Get list of changed files
CHANGED_FILES=$(git diff --cached --name-only)
print_status "Changed files:"
echo "$CHANGED_FILES" | sed 's/^/  - /'

# Generate commit message based on changes
COMMIT_MSG=""
if echo "$CHANGED_FILES" | grep -q "\.md$"; then
    COMMIT_MSG="docs: update documentation"
elif echo "$CHANGED_FILES" | grep -q "\.tsx?$"; then
    COMMIT_MSG="feat: update TypeScript/React components"
elif echo "$CHANGED_FILES" | grep -q "\.css$"; then
    COMMIT_MSG="style: update styling"
elif echo "$CHANGED_FILES" | grep -q "\.json$"; then
    COMMIT_MSG="chore: update configuration"
elif echo "$CHANGED_FILES" | grep -q "\.yml$"; then
    COMMIT_MSG="ci: update GitHub Actions"
else
    COMMIT_MSG="chore: update project files"
fi

# Add timestamp to commit message
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
COMMIT_MSG="$COMMIT_MSG - $TIMESTAMP"

print_status "Commit message: $COMMIT_MSG"

# Commit changes
print_status "Committing changes..."
git commit -m "$COMMIT_MSG"

# Push to remote
print_status "Pushing to remote repository..."
if git push origin "$CURRENT_BRANCH"; then
    print_success "Successfully pushed changes to GitHub!"
    print_status "Repository: https://github.com/kp123kdk3/Clone-ChatGPT.git"
    
    # Check if GitHub Actions are running
    print_status "Checking GitHub Actions status..."
    if command -v gh >/dev/null 2>&1; then
        print_status "GitHub CLI detected. You can check Actions status with:"
        echo "  gh run list --repo kp123kdk3/Clone-ChatGPT"
    else
        print_status "You can check GitHub Actions status at:"
        echo "  https://github.com/kp123kdk3/Clone-ChatGPT/actions"
    fi
else
    print_error "Failed to push changes. Please check your git configuration."
    exit 1
fi

print_success "Auto-update completed successfully!"
