# AntiPlag - Frontend

![master pipeline](https://github.com/P3K-TEAM/frontend/actions/workflows/github-ci.yml/badge.svg?branch=master)

## Table of contents

1. [Prerequisites](#prerequisites)
1. [Installation and development](#installation-and-development)
1. [Test coverage](#test-coverage)
    - [Unit Tests](#unit-tests)
1. [Deploying to the web](#deploying-to-the-web)

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Node package manager](https://www.npmjs.com/)

## Installation and development

The application is written in reactive framework [Vue](https://vuejs.org).

1. Installing dependencies

    ```shell script
    npm install
    ```

1. Running the dev server

    ```shell script
    npm run serve
    ```

1. Visit the webpage in browser (by default the URL is [http://localhost:8080](http://localhost:8080))

## Test coverage

### Unit Tests

Unit tests allow you to test individual units of code in isolation. The purpose of unit testing is to provide developers
with confidence in their code. By writing thorough, meaningful tests, you achieve the confidence that as new features
are built or your code is refactored your application will remain functional and stable. You can learn about unit
tests [here](docs/UNIT_TESTS.md).

## Deploying to the web

The code is automatically deployed to the webserver using CI pipeline after merge into `master` branch.
