#!/bin/bash

# EMS Pro Frontend Deployment Script
# This script builds and deploys the frontend application

set -e

echo "🚀 Starting EMS Pro Frontend Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the frontend directory."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run tests
echo "🧪 Running tests..."
npm test

# Build the application
echo "🏗️ Building application..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Error: Build failed. dist directory not found."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to different platforms based on environment
if [ "$DEPLOY_TARGET" = "vercel" ]; then
    echo "🚀 Deploying to Vercel..."
    npx vercel --prod
elif [ "$DEPLOY_TARGET" = "netlify" ]; then
    echo "🚀 Deploying to Netlify..."
    npx netlify deploy --prod --dir=dist
elif [ "$DEPLOY_TARGET" = "docker" ]; then
    echo "🐳 Building Docker image..."
    docker build -t ems-pro-frontend .
    echo "🚀 Pushing Docker image..."
    docker push ems-pro-frontend
else
    echo "📁 Build artifacts ready in dist/ directory"
    echo "You can deploy manually or set DEPLOY_TARGET environment variable"
fi

echo "🎉 Deployment completed successfully!" 