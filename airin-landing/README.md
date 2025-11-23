# Airin Landing Page

Beautiful landing page for **Airin - AI For CI/CD**, showcasing the simplest way to get Telegram notifications for your GitHub Actions and GitLab CI pipelines.

## Features

- 🎨 Modern, responsive design
- ⚡ Fast and lightweight (vanilla HTML/CSS/JS)
- 📱 Mobile-friendly
- 🚀 Easy to deploy

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The site will be available at `http://localhost:3000`

### What's Included

This landing page demonstrates **Airin** usage and includes:
- `@albantanie/airin` as a dependency (installed via npm)
- Example GitHub Actions workflow
- Interactive code snippets with copy functionality
- Responsive design for all devices

### Deploy

This is a static website that can be deployed anywhere:

- **GitHub Pages**: Push to `gh-pages` branch
- **Vercel**: Connect your repo and deploy
- **Netlify**: Drag and drop the folder
- **Any static hosting**: Upload HTML/CSS/JS files

## About Airin

Airin is an AI-powered CI/CD notification tool that sends instant Telegram notifications for your deployments.

**Zero configuration needed!**

Just add one line to your GitHub Actions:

```yaml
- name: Notify Telegram
  if: always()
  uses: albantanie/airin@v1.2.1
```

Learn more at:
- [npm Package](https://www.npmjs.com/package/@albantanie/airin)
- [GitHub Repository](https://github.com/Orangutan168/prop2goapi-admin-frontend/tree/main/airin)

## License

MIT © Albantanie
