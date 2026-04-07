# milk-delivery-app

This repository contains a Next.js milk delivery application with unit tests, Selenium end-to-end tests, Docker packaging, and a GitHub Actions CI/CD pipeline.

## Local development

Run the app locally:

```bash
cd milk_delivery_app
npm install
npm run dev
```

Run quality checks:

```bash
cd milk_delivery_app
npm test
npm run typecheck
npm run build
```

Run Selenium tests after the app is already running on port `3000`:

```bash
cd milk_delivery_app
npm run test:e2e
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

Build the image directly:

```bash
docker build -t milk-delivery-app .
docker run -p 3000:3000 milk-delivery-app
```

Deploy on a Docker host from the published GitHub image:

```bash
docker login ghcr.io
docker pull ghcr.io/<your-github-user-or-org>/milk-delivery-app:latest
docker run -d --name milk-delivery-app --restart unless-stopped -p 3000:3000 ghcr.io/<your-github-user-or-org>/milk-delivery-app:latest
```

## GitHub CI/CD

The workflow in `.github/workflows/docker-image.yml` runs:

1. `frontend-backend`: install, unit tests, typecheck, and production build
2. `e2e-selenium`: boot the app and run Selenium browser tests
3. `docker-build`: build the Docker image and push it to GitHub Container Registry
4. `deploy`: optionally pull and run the image on a remote Docker host over SSH

## Required GitHub secrets for deploy

- `DEPLOY_HOST`
- `DEPLOY_USERNAME`
- `DEPLOY_SSH_KEY`
- `DEPLOY_REGISTRY_USERNAME`
- `DEPLOY_REGISTRY_TOKEN`
