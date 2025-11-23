# Airin - CI/CD Notification Tool

Super simple CI/CD notification tool that sends deployment status to Telegram. Works with GitHub Actions and GitLab CI. **No configuration needed!**

## Features

- ✅ **Zero configuration** - webhook already built-in!
- 📱 Instant Telegram notifications
- 🔍 Automatic error detection in logs
- 🚀 Works with GitHub Actions and GitLab CI
- 🆓 Completely free to use
- ⚡ Just add one line to your workflow!

## Quick Start

### GitHub Actions

Just add this to your workflow - that's it! No secrets, no setup needed:

```yaml
- name: Notify Telegram
  if: always()
  uses: albantanie/airin@main
```

**That's literally all you need!** 🎉

## Full Example

### GitHub Actions

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, development]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build and Test
        run: |
          npm install
          npm test
          npm run build

      - name: Deploy
        run: |
          # Your deployment commands
          echo "Deploying..."

      # 🎉 Telegram notification (runs even if build/deploy fails)
      - name: Notify Telegram
        if: always()
        uses: albantanie/airin@main
```

### GitLab CI

Add this to your `.gitlab-ci.yml`:

```yaml
build:
  stage: build
  script:
    - npm install
    - npm run build
  after_script:
    - |
      curl -X POST https://hooks.zapier.com/hooks/catch/25470556/uzws3gf/ \
      -H "Content-Type: application/json" \
      -d "{
        \"workflow_name\": \"${CI_PROJECT_NAME}\",
        \"repository\": \"${CI_PROJECT_PATH}\",
        \"branch\": \"${CI_COMMIT_REF_NAME}\",
        \"commit_sha\": \"${CI_COMMIT_SHA}\",
        \"commit_message\": \"${CI_COMMIT_MESSAGE}\",
        \"author\": \"${GITLAB_USER_NAME}\",
        \"status\": \"${CI_JOB_STATUS}\",
        \"run_id\": \"${CI_PIPELINE_ID}\",
        \"run_url\": \"${CI_PIPELINE_URL}\",
        \"timestamp\": \"${CI_COMMIT_TIMESTAMP}\"
      }"
```

## Configuration (Optional)

By default, Airin uses a built-in webhook. You can override it if needed:

```yaml
- name: Notify Telegram
  if: always()
  uses: albantanie/airin@main
  with:
    zapier_webhook: 'your-custom-webhook-url'  # Optional
    log_file: 'path/to/log.txt'  # Optional
```

### Inputs

| Input | Required | Default | Description |
|-------|----------|---------|-------------|
| `zapier_webhook` | ❌ No | Built-in webhook | Custom Zapier webhook URL |
| `log_file` | ❌ No | `''` | Path to log file for analysis |

### Webhook Payload

The following data is sent to Zapier:

```json
{
  "workflow_name": "Build and Deploy",
  "repository": "username/repo-name",
  "branch": "main",
  "commit_sha": "abc123...",
  "commit_message": "Fix bug in authentication",
  "author": "john.doe",
  "status": "success",
  "run_id": "123456789",
  "run_url": "https://github.com/username/repo/actions/runs/123456789",
  "timestamp": "2025-01-23T10:30:00Z",
  "project": "Backend API",
  "environment": "Production"
}
```

### Status Values

- `success` - All steps completed successfully
- `failure` - One or more steps failed
- `cancelled` - Workflow was cancelled

## Examples

### Full GitHub Actions Example

```yaml
name: Build and Deploy

on:
  push:
    branches: [main, development]

env:
  NODE_ENV: production

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Build application
        run: npm run build

      - name: Deploy to server
        run: |
          # Your deployment commands
          echo "Deploying..."

      # Notification step (always runs)
      - name: Send notification
        if: always()
        run: |
          curl -X POST https://hooks.zapier.com/hooks/catch/25470556/uzws3gf/ \
          -H "Content-Type: application/json" \
          -d '{
            "workflow_name": "${{ github.workflow }}",
            "repository": "${{ github.repository }}",
            "branch": "${{ github.ref_name }}",
            "commit_sha": "${{ github.sha }}",
            "commit_message": "${{ github.event.head_commit.message }}",
            "author": "${{ github.actor }}",
            "status": "${{ job.status }}",
            "run_id": "${{ github.run_id }}",
            "run_url": "${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}",
            "timestamp": "${{ github.event.head_commit.timestamp }}",
            "project": "My API",
            "environment": "Production"
          }'
```

## Zapier Configuration Example

### Telegram Message Template

You can format your Telegram message in Zapier like this:

```
{{emoji}} **{{status}}** - {{workflow_name}}

📦 **Repository:** {{repository}}
🌿 **Branch:** {{branch}}
👤 **Author:** {{author}}
💬 **Commit:** {{commit_message}}
🔗 **Run:** {{run_url}}

⏰ {{timestamp}}
```

Where `emoji` is:
- ✅ for success
- 🚨 for failure
- ⚠️ for cancelled

## Troubleshooting

### Notifications not received

1. **Check Zapier webhook URL**: Make sure the URL is correct
2. **Check Zap is ON**: Ensure your Zap is published and turned on
3. **Check workflow syntax**: Make sure the YAML syntax is correct
4. **Check secrets**: Verify `ZAPIER_WEBHOOK_URL` is set in GitHub/GitLab secrets

### Error: "webhook URL is required"

Make sure you've set the `ZAPIER_WEBHOOK_URL` in your GitHub secrets or passed it directly in the workflow.

## FAQ

**Q: Is this free to use?**
A: Yes! Airin is MIT licensed and doesn't require any paid APIs.

**Q: Do I need OpenAI API?**
A: No! This version uses simple error detection and sends data to Zapier, which can optionally use AI for analysis.

**Q: Can I use without Zapier?**
A: You can modify the webhook URL to any service that accepts JSON webhooks.

**Q: Does it work with private repositories?**
A: Yes! It works with both public and private repositories.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © Albantanie

## Support

For issues and questions, please open an issue on [GitHub](https://github.com/Orangutan168/prop2goapi-admin-frontend/issues).

---

Made with ❤️ by Albantanie
# airin-landing
# airin-landing
# airin-landing
