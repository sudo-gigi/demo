# Contributing to GamEd

Thank you for considering contributing to Prograde! We welcome all kinds of contributions, including bug reports, feature requests, and code improvements.

## Table of Contents

- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Code Contributions](#code-contributions)
    - [Development Workflow](#development-workflow)
      - [Branch Naming Rules](#branch-naming-rules)
      - [Commit Message Rules](#commit-message-rules)
    - [Submitting Pull Requests](#submitting-pull-requests)
- [License](#license)

## Getting Started

1. Fork the repository.
2. Clone your forked repository:
   ```sh
   git clone https://github.com/<your-github-username>/Backend-GamEd.git
   ```
3. Navigate to the project directory:
   ```sh
   cd src
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Start the local server to preview and interact with the app:
   ```sh
   npm run start:dev
   ```

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on [GitHub Issues](https://github.com/hngprojects/Prograde-Backend/issues) and include as much detail as possible. Provide steps to reproduce, expected and actual behavior, and any relevant logs. [Issue example](https://github.com/hngprojects/hng_boilerplate_nestjs/issues/1217)


### Suggesting Features

If you have an idea for a new feature, please open an issue on [GitHub Issues](https://github.com/hngprojects/Prograde-Backend/issues) and describe your proposal. Explain why the feature would be useful and how it should work. [Issue example](https://github.com/hngprojects/hng_boilerplate_nestjs/issues/9)



### Code Contributions

> Please make sure to have created a fork of the original repository. This is where you will work in when contibuting.

#### Development Workflow

1. Create a new branch for your work:
   ```sh
   git checkout -b feat/your-feature-name
   ```
   ##### Branch Naming Rules
   - You will likely work on features, bug fixes, refactors (restructuring code without changing functionality), chores on the repo (routine tasks such as updating dependencies or changing configurations), or documentation. Each of the type of update should be used as a prefix your branch name as `feat/`, `refactor/`, `fix/`, `chore/`, or `docs/`
   - For any of these updates, you will likely use a ticket or an issue. The ticket number, e.g. HNG-2145 or issue number should also be included in your branch name
   - Finally, a short description for your update should follow suit. This is often taken from the ticket title
   - All of this (except the ticket number acronym, `HNG`) should be written in lowercase
     > Thus, a typical branch should look like `feat/GamEd-create-login-page` or like `chore/remove-unused-variables` if your update has no corresponding ticket or issue (unlikely)

2. Run Tests

    Run the existing tests to ensure your changes do not break anything. If you added new functionality, write corresponding tests.

    ```sh
    npm run test
    ```

3. Make your changes, and commit them with descriptive messages:

   ```sh
   git commit -m "feat: your commit message"
   ```

   ##### Commit Message Rules

   Commit messages also follow a similar pattern. However, there is no need to add ticket number since they can be easily tracked given the branch name. Instead, use a colon, `:`, after the type of change (`feat`, `fix`, etc.), a whitespace, then your commit message. In cases where you are required to add the ticket number, you may use a the parenthesis after the type of change, like `feat(GamEd-1234): your commit message`

   > Another example: `refactor: use a single state for formData` or `refactor(GamEd-1234): use a single state for formData`

> Please notice how both branch names an commit messages use the imperative tense. The imperative tense is a command or request, which makes it clear what the commit does. i.e., "fix login issue", NOT "I fixed login issue", and NOT "fixed login issue"

3. Push your branch to your forked repository:
   ```sh
   git push origin <your-branch>
   ```

#### Submitting Pull Requests

1. Ensure your branch is up to date with your remote repository:
   ```sh
   git checkout dev
   git pull origin dev
   git checkout <your-branch>
   git rebase dev
   ```
   > You should regularly update your remote repository with changes from the [default branch of the] upstream repository
2. Run tests and ensure all tests pass:
   ```sh
   npm test
   ```
   > Make it a habit to run tests before creating pull requests.
3. Submit a pull request from your branch to the upstream repository.
4. In your pull request description, explain what changes you made and why.


## License

By contributing, you agree that your contributions will be licensed under the [Apache License](LICENSE).