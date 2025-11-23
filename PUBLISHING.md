# Publishing Airin to npm

## Prerequisites

1. **npm account**: Create an account at https://www.npmjs.com/signup
2. **Organization (optional)**: Create `@prop2go` organization or use your own scope

## Publishing Steps

### 1. Login to npm

```bash
cd airin
npm login
```

Enter your npm credentials when prompted.

### 2. Verify package configuration

```bash
npm run build
npm pack --dry-run
```

This shows what will be included in the package.

### 3. Publish to npm

```bash
# First time publish
npm publish --access public

# For updates (after changing version in package.json)
npm version patch  # or minor, or major
npm publish
```

### 4. Verify publication

Visit: https://www.npmjs.com/package/@prop2go/airin

## Using the Published Package

### GitHub Actions

```yaml
- name: Notify via Airin
  uses: prop2go/airin@v1
  with:
    zapier_webhook: ${{ secrets.ZAPIER_WEBHOOK_URL }}
```

### Or install as npm package (for custom scripts)

```bash
npm install @prop2go/airin
```

## Version Management

Follow semantic versioning:

- `npm version patch` → 1.0.0 → 1.0.1 (bug fixes)
- `npm version minor` → 1.0.0 → 1.1.0 (new features, backwards compatible)
- `npm version major` → 1.0.0 → 2.0.0 (breaking changes)

## Unpublishing (if needed)

```bash
# Unpublish specific version
npm unpublish @prop2go/airin@1.0.0

# Unpublish entire package (within 72 hours)
npm unpublish @prop2go/airin --force
```

**Warning**: Only unpublish if absolutely necessary!

## Distribution Tags

```bash
# Publish as beta
npm publish --tag beta

# Publish as latest (default)
npm publish --tag latest
```

## Package Stats

Check download stats: https://www.npmjs.com/package/@prop2go/airin

## Troubleshooting

### Error: "You do not have permission to publish"

- Make sure you're logged in: `npm whoami`
- Check organization membership
- Verify package name is available

### Error: "Package name too similar to existing package"

- Choose a different name in package.json
- Or request the package name if it's abandoned

### Error: "You must verify your email"

- Check your npm account email
- Verify your email address

## Maintenance

### Regular updates

1. Update dependencies: `npm update`
2. Test: `npm test`
3. Build: `npm run build`
4. Bump version: `npm version [patch|minor|major]`
5. Publish: `npm publish`

---

For questions, contact: tech@prop2go.com
