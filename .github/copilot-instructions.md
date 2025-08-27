# Viral Quote Engine UI

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Quick Reference - Current Repository State
**STATUS: EMPTY REPOSITORY - NO CODE YET**
- Working directory: `/home/runner/work/viral-quote-engine-ui/viral-quote-engine-ui`
- Available tools: Node.js v20.19.4, npm v10.8.2, git
- ✅ WORKS: `ls -la`, `git status`, `npm init`, `node --version`  
- ❌ FAILS: `npm run build`, `npm run dev`, `npm start` (no package.json scripts)
- Quick validation: `ls -la` should show `.github/`, `LICENSE`, `README.md`

## Current Repository State

**Repository is in INITIAL/EMPTY state - most development commands will not work yet.**

This repository currently contains:
- README.md (contains project title: "# viral-quote-engine")
- LICENSE (GPL v3 license - 674 lines)
- .github/copilot-instructions.md (this file)

**Missing (needs to be created):**
- package.json (no build system configured)
- src/ directory (no source code)
- Any JavaScript/TypeScript files
- Build configuration files
- Test configuration
- CI/CD workflows

The repository name suggests this will be a user interface application for displaying viral quotes, likely a web-based frontend application.

## Working Effectively

### Initial Repository Setup
- Clone and explore the repository:
  ```bash
  ls -la
  git --no-pager status
  git --no-pager log --oneline -10
  ```
- Current available tools: Node.js v20.19.4, npm v10.8.2, git
- Repository structure validation: `find . -type f | grep -v ".git" | head -20`

### When Code is Added to Repository

**CRITICAL: The following commands are placeholders for when actual code is present. Currently, most of these will not work since no package.json or build system exists yet.**

#### For React/Next.js Applications (Expected Pattern):
- Install dependencies: `npm install` -- NEVER CANCEL. Allow up to 10 minutes for completion.
- Build the application: `npm run build` -- NEVER CANCEL. Build may take 5-15 minutes. Set timeout to 20+ minutes.
- Start development server: `npm run dev` -- typically runs on http://localhost:3000
- Run tests: `npm test` -- NEVER CANCEL. Tests may take 5-10 minutes. Set timeout to 15+ minutes.
- Lint code: `npm run lint` -- should complete in 1-2 minutes
- Format code: `npm run format` or `npx prettier --write .` -- if prettier is configured

#### For Vue.js Applications (Alternative Pattern):
- Install dependencies: `npm install` -- NEVER CANCEL. Allow up to 10 minutes.
- Build: `npm run build` -- NEVER CANCEL. Set timeout to 20+ minutes.
- Development: `npm run serve` -- typically runs on http://localhost:8080
- Test: `npm run test:unit` -- NEVER CANCEL. Set timeout to 15+ minutes.
- Lint: `npm run lint` -- should complete in 1-2 minutes

#### For Angular Applications (Alternative Pattern):
- Install dependencies: `npm install` -- NEVER CANCEL. Allow up to 10 minutes.
- Build: `ng build` or `npm run build` -- NEVER CANCEL. Set timeout to 25+ minutes.
- Development: `ng serve` or `npm start` -- typically runs on http://localhost:4200
- Test: `ng test` or `npm test` -- NEVER CANCEL. Set timeout to 15+ minutes.
- Lint: `ng lint` or `npm run lint` -- should complete in 1-2 minutes

## Validation Requirements

### Current State Validation
- Always run `ls -la` to verify repository contents
- Check git status: `git --no-pager status`
- Verify available tools: `which node npm git`

### When Application Code is Present
**MANDATORY: Run complete end-to-end validation scenarios after making any changes.**

#### Manual Validation Scenarios (Execute After Code Changes):
1. **Basic Application Flow** (when UI is implemented):
   - Start the development server
   - Navigate to the application in a browser
   - Verify the quote display functionality works
   - Test quote generation/refresh mechanisms
   - Take a screenshot to document UI state

2. **Build and Production Validation**:
   - Run complete build process
   - Verify build artifacts are generated
   - Test production build if serving capability exists
   - Confirm no build errors or warnings

3. **Code Quality Validation**:
   - Always run linting before committing: `npm run lint`
   - Run formatting if configured: `npm run format`
   - Execute full test suite: `npm test` -- NEVER CANCEL
   - Check test coverage if configured

## Common Tasks and Troubleshooting

## Getting Started with Development

### First-Time Project Setup (When Ready to Add Code):
1. **Initialize the project structure:**
   ```bash
   npm init -y                    # Creates package.json with defaults
   mkdir -p src public            # Create standard directories
   touch src/index.js             # Create entry point
   ```

2. **Choose and install a UI framework:**
   ```bash
   # For React/Next.js:
   npm install react react-dom next
   npm install -D @types/react @types/react-dom typescript
   
   # For Vue.js:
   npm install vue
   npm install -g @vue/cli
   
   # For Angular:  
   npm install -g @angular/cli
   ng new . --skip-git
   ```

3. **Add development dependencies:**
   ```bash
   # Common development tools:
   npm install -D eslint prettier
   npm install -D @eslint/js @typescript-eslint/eslint-plugin
   ```

### Setting Up New Project Structure (When Ready):
- Initialize package.json: `npm init -y`
- Install common UI framework:
  - React: `npm install react react-dom next`
  - Vue: `npm install vue @vue/cli`
  - Angular: `npm install -g @angular/cli && ng new .`

### Repository Maintenance:
- Check for dependency updates: `npm outdated`
- Update dependencies: `npm update` -- NEVER CANCEL. May take 5-10 minutes.
- Clean node_modules if issues: `rm -rf node_modules && npm install`

### Troubleshooting Common Issues:

#### "Missing script" errors:
- **Cause**: No package.json or script not defined in package.json
- **Solution**: Add the script to package.json scripts section, or create package.json with `npm init -y`

#### "No such file or directory" errors:
- **Cause**: Trying to run files that don't exist yet
- **Solution**: Check current repository state with `ls -la` and `find . -name "*.js" -o -name "*.ts" -o -name "*.json"`

#### Permission denied errors:
- **Cause**: File permissions or write access issues  
- **Solution**: Check file permissions with `ls -la` and current directory with `pwd`

#### Build/test failures:
- **Current State**: Will fail because no build system exists yet
- **Future**: Once code is added, always wait for completion and check logs for specific error messages

### Common File Locations (When Present):
- Main source code: `/src/` directory
- Components: `/src/components/` or `/components/`
- Styles: `/src/styles/` or `/styles/`
- Public assets: `/public/` directory
- Configuration: Root-level config files (package.json, tsconfig.json, etc.)

### Environment Setup Commands (Validated):
```bash
# Current working commands:
pwd                           # Confirm directory: /home/runner/work/viral-quote-engine-ui/viral-quote-engine-ui
ls -la                       # List all files: shows .github/, LICENSE, README.md
cat README.md               # View project description: "# viral-quote-engine"
git --no-pager log --oneline -5  # View recent commits
git --no-pager status       # Check repository status
node --version              # Check Node.js version: v20.19.4
npm --version               # Check npm version: v10.8.2
which node npm git          # Verify tool availability
find . -type f | grep -v ".git"  # List all non-git files
```

### Commands That Will Fail (Until Code is Added):
```bash
# These commands will fail with meaningful errors:
npm run build    # Error: Missing script "build"
npm run dev      # Error: Missing script "dev"  
npm run lint     # Error: Missing script "lint"
npm install      # Works but installs nothing (no dependencies)
npm test         # Works but shows "Error: no test specified" and exits 1
```

## Expected Development Workflow

1. **Before Making Changes:**
   - Explore repository structure: `ls -la && find . -name "*.json" -o -name "*.js" -o -name "*.ts" -o -name "*.tsx"`
   - Check package.json if exists: `cat package.json`
   - Install dependencies if package.json exists: `npm install`

2. **During Development:**
   - Start development server: `npm run dev` (or framework equivalent)
   - Run tests in watch mode if available: `npm run test:watch`
   - Lint code frequently: `npm run lint`

3. **Before Committing:**
   - Run full build: `npm run build` -- NEVER CANCEL. Set timeout to 30+ minutes.
   - Run all tests: `npm test` -- NEVER CANCEL. Set timeout to 20+ minutes.
   - Run linting: `npm run lint`
   - Format code: `npm run format` (if configured)
   - Manual validation of changed functionality

4. **Production Verification:**
   - Test production build: `npm run build && npm start` (if configured)
   - Verify all functionality works in production mode
   - Check for console errors in browser developer tools

## Critical Reminders

- **NEVER CANCEL** any build or test commands. UI applications can have long build times.
- Always set timeouts of 30+ minutes for builds, 20+ minutes for tests.
- **ALWAYS** perform manual end-to-end testing after making changes.
- Take screenshots of UI changes to document visual impact.
- This repository is currently empty - most commands will fail until code is added.
- Update these instructions as the project structure evolves and actual commands are validated.

## Repository-Specific Notes

- Project appears to be intended as a viral quote engine user interface
- License: GPL (see LICENSE file)
- Currently no CI/CD workflows configured
- No existing test infrastructure
- No existing build configuration

**IMPORTANT: Validate and update these instructions once actual application code is added to the repository.**