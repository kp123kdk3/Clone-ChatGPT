#!/bin/bash

# Vercel Setup Helper Script
# This script helps you generate the necessary secrets for Vercel deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Vercel Setup Helper Script${NC}"
    echo -e "${BLUE}================================${NC}"
    echo
}

print_step() {
    echo -e "${GREEN}[STEP]${NC} $1"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_header

print_step "Generating secure secrets for Vercel deployment..."

# Check if openssl is available
if ! command -v openssl &> /dev/null; then
    print_error "openssl is not installed. Please install it first."
    echo "On macOS: brew install openssl"
    echo "On Ubuntu: sudo apt-get install openssl"
    exit 1
fi

# Generate secrets
print_info "Generating NEXTAUTH_SECRET..."
NEXTAUTH_SECRET=$(openssl rand -base64 32)
print_success "NEXTAUTH_SECRET generated"

print_info "Generating JWT_SECRET..."
JWT_SECRET=$(openssl rand -base64 32)
print_success "JWT_SECRET generated"

echo
print_step "Your generated secrets:"
echo
echo "NEXTAUTH_SECRET:"
echo "$NEXTAUTH_SECRET"
echo
echo "JWT_SECRET:"
echo "$JWT_SECRET"
echo

print_step "Next steps to complete Vercel setup:"
echo
echo "1. Go to [Vercel.com](https://vercel.com) and sign up/login"
echo "2. Import your repository: kp123kdk3/Clone-ChatGPT"
echo "3. In Vercel project settings, add these environment variables:"
echo
echo "   DATABASE_URL=your_postgresql_connection_string"
echo "   NEXTAUTH_URL=https://your-app-name.vercel.app"
echo "   NEXTAUTH_SECRET=$NEXTAUTH_SECRET"
echo "   OPENAI_API_KEY=sk-your-openai-api-key"
echo "   JWT_SECRET=$JWT_SECRET"
echo
echo "4. Deploy your project"
echo "5. Get your Project ID and Organization ID from Vercel dashboard"
echo "6. Create a Vercel token at [Vercel Account Settings](https://vercel.com/account/tokens)"
echo "7. Add these secrets to your GitHub repository:"
echo "   - VERCEL_TOKEN"
echo "   - ORG_ID"
echo "   - PROJECT_ID"
echo
echo "8. Test automatic deployment by running: npm run update"
echo
echo "For detailed instructions, see: VERCEL_SETUP.md"
echo

print_success "Setup script completed! Follow the steps above to connect to Vercel."
