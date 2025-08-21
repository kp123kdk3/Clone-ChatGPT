# Contributing to ChatGPT Clone

Thank you for your interest in contributing to ChatGPT Clone! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the [issue template](ISSUE_TEMPLATE.md) when reporting bugs
- Provide detailed steps to reproduce the issue
- Include your environment details (OS, browser, Node.js version)
- Add screenshots if applicable

### Suggesting Features
- Use the [issue template](ISSUE_TEMPLATE.md) for feature requests
- Clearly describe the problem you're trying to solve
- Explain why this feature would be useful
- Consider the impact on existing functionality

### Code Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Write or update tests
5. Ensure all tests pass
6. Commit your changes with a clear message
7. Push to your branch
8. Open a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database
- Git

### Local Development
1. Clone your fork
   ```bash
   git clone https://github.com/YOUR_USERNAME/chatgpt-clone.git
   cd chatgpt-clone
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. Set up database
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Start development server
   ```bash
   npm run dev
   ```

## 📝 Code Style Guidelines

### TypeScript
- Use strict TypeScript configuration
- Provide proper type annotations
- Avoid `any` type - use proper interfaces/types
- Use union types and generics where appropriate

### React Components
- Use functional components with hooks
- Follow React best practices
- Use proper prop types and interfaces
- Keep components focused and single-responsibility

### CSS/Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use CSS variables for theme values

### File Naming
- Use kebab-case for file names
- Use PascalCase for component names
- Use camelCase for functions and variables
- Use UPPER_CASE for constants

## 🧪 Testing

### Writing Tests
- Write tests for all new functionality
- Use descriptive test names
- Test both success and error cases
- Mock external dependencies appropriately

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- --testPathPattern=ComponentName
```

### Test Structure
- Unit tests for utility functions
- Component tests for React components
- Integration tests for API endpoints
- E2E tests for critical user flows

## 📚 Documentation

### Code Documentation
- Add JSDoc comments for complex functions
- Document component props and usage
- Include examples in README files
- Keep documentation up-to-date

### Commit Messages
Use conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(auth): add two-factor authentication
fix(chat): resolve message streaming issue
docs(readme): update installation instructions
```

## 🔄 Pull Request Process

### Before Submitting
- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Documentation updated
- [ ] No console.log statements left
- [ ] No sensitive information committed

### Pull Request Template
Use the provided [PR template](PULL_REQUEST_TEMPLATE.md) when creating pull requests.

### Review Process
- All PRs require at least one review
- Address review comments promptly
- Keep PRs focused and manageable in size
- Update PR description if significant changes are made

## 🚀 Deployment

### Automatic Deployment
- PRs are automatically tested via GitHub Actions
- Merging to main triggers automatic deployment
- Deployment status is visible in PR checks

### Manual Deployment
See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed deployment instructions.

## 🐛 Troubleshooting

### Common Issues
- **Build failures**: Check Node.js version and dependencies
- **Database issues**: Verify connection string and permissions
- **Test failures**: Ensure all dependencies are installed
- **Linting errors**: Run `npm run lint` to identify issues

### Getting Help
- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Contact maintainers for urgent issues

## 📋 Contributor Checklist

- [ ] I have read and understood the contributing guidelines
- [ ] My code follows the project's style guidelines
- [ ] I have added tests for my changes
- [ ] I have updated documentation as needed
- [ ] My changes generate no new warnings
- [ ] I have tested my changes locally
- [ ] I have considered the impact on existing functionality

## 🎉 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors list
- Project documentation

## 📞 Contact

If you have questions about contributing:
- Open a GitHub issue
- Start a GitHub discussion
- Contact maintainers directly

---

**Thank you for contributing to ChatGPT Clone! Your contributions make this project better for everyone.**
