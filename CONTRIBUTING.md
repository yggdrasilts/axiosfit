# Contributing to Axiosfit

We would love for you to contribute to Axiosfit and help make it even better than it is
today! As a contributor, here are the guidelines we would like you to follow:

- [Issues and Bugs](#issue)
- [Feature Requests](#feature)
- [Submission Guidelines](#submit)
- [Development Setup](#development)
- [Coding Rules](#rules)
- [Commit Message Guidelines](#commit)

## <a name="issue"></a> Found a Bug?

If you find a bug in the source code, you can help us by
[submitting an issue](#submit-issue) to our [Github Repository][github]. Even better, you can
[submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?

You can _request_ a new feature by [submitting an issue](#submit-issue) to our Github
Repository. If you would like to _implement_ a new feature, please submit an issue with
a proposal for your work first, to be sure that we can use it.
Please consider what kind of change it is:

- For a **Major Feature**, first open an issue and outline your proposal so that it can be
  discussed. This will also allow us to better coordinate our efforts, prevent duplication of work,
  and help you to craft the change so that it is successfully accepted into the project. For your issue name, please prefix your proposal with `[discussion]`, for example "[discussion]: your feature idea".
- **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## <a name="submit"></a> Submission Guidelines

### <a name="submit-issue"></a> Submitting an Issue

Before you submit an issue, please search the issue tracker, maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs we will systematically ask you to provide a minimal reproduction scenario using a repository or [Gist](https://gist.github.com/). Having a live, reproducible scenario gives us wealth of important information without going back & forth to you with additional questions like:

- version of Axiosfit used
- 3rd-party libraries and their versions
- and most importantly - a use-case that fails

Unfortunately, we are not able to investigate / fix bugs without a minimal reproduction, so if we don't hear back from you we are going to close an issue that don't have enough info to be reproduced.

You can file new issues by filling out our [new issue form](https://github.com/yggdrasilts/axiosfit/issues/new).

### <a name="submit-pr"></a> Submitting a Pull Request (PR)

<!-- TODO: Review the merging flow -->

Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [Github](https://github.com/yggdrasilts/axiosfit/pulls) for an open or closed PR
   that relates to your submission. You don't want to duplicate effort.
2. Fork the yggdrasilts/axiosfit repo.
3. Make your changes in a new git branch:

   ```shell
   git checkout -b my-fix-branch master
   ```

4. Create your patch, **including appropriate test cases**.
5. Follow our [Coding Rules](#rules).
6. Run the full Axiosfit test suite (see [common scripts](#common-scripts)),
   and ensure that all tests pass.
7. Commit your changes using a descriptive commit message that follows our
   [commit message conventions](#commit). Adherence to these conventions
   is necessary because release notes are automatically generated from these messages.

   ```shell
   git commit -a
   ```

   Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

8. Push your branch to Github:

   ```shell
   git push origin my-fix-branch
   ```

9. In Github, send a pull request to `axiosfit:master`.

- If we suggest changes then:

  - Make the required updates.
  - Re-run the Axiosfit test suites to ensure tests are still passing.
  - Rebase your branch and force push to your Github repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

- Delete the remote branch on Github either through the Github web UI or your local shell as follows:

  ```shell
  git push origin --delete my-fix-branch
  ```

- Check out the master branch:

  ```shell
  git checkout master -f
  ```

- Delete the local branch:

  ```shell
  git branch -D my-fix-branch
  ```

- Update your master with the latest upstream version:

  ```shell
  git pull --ff upstream master
  ```

## <a name="development"></a> Development Setup

### Requirements

- [docker](https://docs.docker.com/install/) is needed to execute all test suites.
- You will need Node.js version 12.3.0+.

1. After cloning the repo, run:

```bash
$ npm i
```

### <a name="common-scripts"></a>Commonly used NPM scripts

```bash
# build the code, run the linter, pass the tests and compile the code
$ npm run build

# run the full unit tests suite
$ npm run test

# run linter
$ npm run lint

# build the documentation
$ npm run compodoc
```

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

- All features or bug fixes **must be tested** by one or more specs (unit-tests).
- We follow [Google's JavaScript Style Guide][js-style-guide], but wrap all code at
  **160 characters**. An automated formatter is available (`npm run format`).

## <a name="commit"></a> Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to **more
readable messages** that are easy to follow when looking through the **project history**. But also,
we use the git commit messages to **generate the Axiosfit change log**.

### Commit Message Format

Each commit message consists of a **header**, a **body** and a **footer**. The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 160 characters! This allows the message to be easier
to read on Github as well as in various git tools.

Footer should contain a [closing reference to an issue](https://help.github.com/articles/closing-issues-via-commit-messages/) if any.

Samples: <!-- (even more [samples](https://github.com/nestjs/nest/commits/master)) -->

<!-- TODO: Add valid samples -->

```
docs(changelog) update change log to beta.5
bugfix(core) need to depend on latest rxjs and zone.js
```

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: npm)
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation',
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert**: Revert to a commit
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **WP**: Work in progress

### Scope

The scope should be the name of the npm package affected (as perceived by person reading changelog generated from commit messages).

The following is the list of supported scopes:

- **axios**
- **decorator**

There are currently a few exceptions to the "use changelog name" rule:

- **changelog**: used for updating the release notes in CHANGELOG.md
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all packages (e.g. `style: add missing semicolons`)

### Subject

The subject contains succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize first letter
- no dot (.) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to
reference Github issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

[github]: https://github.com/yggdrasilts/axiosfit
[js-style-guide]: https://google.github.io/styleguide/jsguide.html
