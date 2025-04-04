#!/bin/bash

# This script is specifically for Render.com deployments
# It builds the application without admin functionality

echo "===================================================="
echo "IMPACTO RENDER PRODUCTION BUILD"
echo "===================================================="

# Make our build script executable
chmod +x build-production.sh

# Run the production build script
./build-production.sh

# Copy the build directory to where Render expects it
echo "===================================================="
echo "Copying build to deployment directory..."
echo "===================================================="

cp -r build ./

echo "===================================================="
echo "Build complete and ready for deployment!"
echo "====================================================" 