# Remote Docker deploy

This project can be deployed from GitHub Actions to a remote Docker host after the image is pushed to GitHub Container Registry.

## Required GitHub secrets

- `DEPLOY_HOST`
- `DEPLOY_USERNAME`
- `DEPLOY_SSH_KEY`
- `DEPLOY_REGISTRY_USERNAME`
- `DEPLOY_REGISTRY_TOKEN`

## Recommended registry token

Create a GitHub personal access token with `read:packages` permission for the account that will pull the image from `ghcr.io`.

## Manual server setup

On the target server:

```bash
docker login ghcr.io
docker pull ghcr.io/<your-github-user-or-org>/milk-delivery-app:latest
docker run -d --name milk-delivery-app --restart unless-stopped -p 3000:3000 ghcr.io/<your-github-user-or-org>/milk-delivery-app:latest
```

If you prefer Compose, use [docker-compose.ghcr.yml](c:\Users\vikas\OneDrive\Documents\milkdelivery\deploy\docker-compose.ghcr.yml) and replace `your-github-user-or-org` before running `docker compose up -d`.
