# LoveSac on Edge Delivery Services

## Sites
-  Preview: https://main--eds--charles-x-chen.hlx.page/
-  Live: https://main--eds--charles-x-chen.hlx.live/

## Dependencies

### 1. Code Dependencies

-   `@preact/signals`: state management library
-   `Preact`: fast alternative to React
-   `ttag`: i18n library
-   `react-icons`: collection of popular icons

### 2. Development and Testing

-   `@adobe/aem-cli`: Edge local dev server
-   `Vite`: Frontend build tool
-   `PostCSS`: Tool for transforming CSS (supports CSS Nesting and CSS Modules)
-   `Vitest`: Vite-native unit testing framework
-   `Storybook`: Tool for developing UI components in isolation

### 3. Code Style

-   `ESLint`: Static code analysis tool
-   `Stylelint`: CSS linter
-   `Prettier`: Code formatter

## Project Structure

The project is organized into the following main directories:

-   `blocks/`: Contains AEM blocks.
-   `styles/`: Houses global CSS. It's recommended to keep this as minimal as possible.
-   `scripts/`: Directory for AEM scripts.
-   `packages/commerce/src/`: Location of Preact components.

## Initial Setup

Follow these steps to clone and set up the project:

```bash
git clone {repository} lvs
cd lvs
pnpm install
```

## Development Process

Follow these steps for development:

### 1. Creating a New Branch

Create a new branch from the staging branch for your features or fixes:

```bash
git checkout staging
git checkout -b JIRAID-1
```

### 2. Running the Development Server

Start the development server:

```bash
export COMMERCE_URL=https://staging.lovesac.com/
pnpm dev
```

### 3. Making Changes

Make the necessary changes to your code.
Create / update storybook stories.

#### 3.1. Preview Changes in Storybook

Create `Component.stories.jsx` file and run:

```bash
cd packages/commerce
export COMMERCE_URL=https://staging.lovesac.com/
pnpm sb
```

It will run the storybook dev server.

#### 3.2. Integrate Preact Component to a Block

Update `blocks/{block}/index.js`

```js
import MyAccount from '~/MyHub/MyAccount';
import render from '~/render';

export default function decorate(block) {
    block.innerHTML = '';
    render(block, MyAccount);
}
```

`~` is a shortcut for `packages/commerce/src`

### 4. Testing

Run tests, format code, and check for linting errors:

```bash
# Run tests
(cd packages/commerce && pnpm vitest)

# Lint JS/TS files with ESLint
pnpm eslint --fix UPDATED_DIR

# Lint CSS files with Stylelint
pnpm stylelint --fix UPDATED_DIR

# Format code with Prettier
pnpm prettier --write UPDATED_DIR
```

### 5. Committing Changes

Once you've made changes, ensure to commit them with a meaningful message, including the JIRA ID and a brief description
of the changes:

```bash
git commit -m 'JIRAID-1 - Ticket Name'
git push
```

### 6. Smoke-test

Smoke-test your changes on an environment:
[https://jiraid-1.staging3.lovesac.com](https://jiraid-1.staging3.lovesac.com/)

### 7. Create a Pull Request

Create a pull request in GitHub, ensuring that your code changes are ready to be reviewed by peers.

### 8. Pass the Ticket to "In Review"

Update the ticket status to "In Review" to indicate that the changes are currently under peer review.

### 9. Pass the Ticket to "Ready for QA"

Once the code review is passed, update the ticket status to "Ready for QA" to indicate that the changes are ready for
quality assurance testing. Don't merge the pull request yet.

### 10. Deploy the Ticket to Staging

After QA is passed, deploy the ticket to the staging environment for further validation.

### 11. Move the Ticket to UAT (Internal Validation)

Finally, move the ticket to UAT (User Acceptance Testing) for internal validation before the release.
