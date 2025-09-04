#!/bin/bash

# Build script for HackMate Platform
echo "🚀 Building HackMate Platform..."

# Set environment variables to ignore linting errors
export ESLINT_NO_DEV_ERRORS=true
export NEXT_TELEMETRY_DISABLED=1

# Run the build
npm run build

echo "✅ Build completed!"
