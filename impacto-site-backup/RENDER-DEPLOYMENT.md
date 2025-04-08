# Impacto Render Deployment Guide

This guide provides instructions for deploying the Impacto website to Render.com without the admin functionality.

## Deployment Instructions

1. **Create a new Web Service** in your Render dashboard

2. **Connect your GitHub repository**
   - Select the Impacto GitHub repository
   - Choose the branch to deploy (typically `main` or `master`)

3. **Configure the deployment settings**:
   - **Name**: `impacto-site` (or your preferred name)
   - **Environment**: Node
   - **Region**: Choose the region closest to your users
   - **Branch**: `master` (or your main branch)
   - **Build Command**: `chmod +x render-build.sh && ./render-build.sh`
   - **Start Command**: `cd build && node server.js`
   - **Auto-Deploy**: Enable (optional)

4. **Add Environment Variables**:
   Required environment variables:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

5. **Click "Create Web Service"** to start the deployment

## What to Expect

The deployment process:

1. Clones your repository
2. Runs the build script to create a production version
3. Removes admin functionality (admin pages, login, assessment system)
4. Creates a standalone Next.js application
5. Deploys the public-facing website only

## Troubleshooting

If you encounter deployment issues:

- Check the build logs for specific error messages
- Ensure all environment variables are properly set
- Verify the middleware is correctly redirecting protected routes
- Make sure the `build-production.sh` script is executable

## Important Notes

- The admin panel is completely disabled in this deployment
- API routes are blocked in production
- Protected routes redirect to the home page
- The blog page is set to dynamic rendering to avoid static generation issues 