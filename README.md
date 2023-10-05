# Gaming Playwright UI Tests

This repo started off life as a POC to see how reliable Playwright would be to test the Gaming UI's while we embark on
Project Cactus. The tests are disgned to run against any portal on multiple browsers. That can be done using the bundled
Playwright browsers or using Sauce Labs.

## Getting Started

1. Checkout the repo
2. Install dependencies
3. Run the tests desired (see below)

```
$ git clone git@github.com:ngr05/gaming-ui-testing.git
$ npm install
```

## Running the Tests

The tests can be run either using the bundled Playwright browsers or using Sauce Labs. There are number of commands that
have been created for either. They are the following...

| Command            | Description                                                                       |
| ------------------ | --------------------------------------------------------------------------------- |
| test               | Runs the tests on within CLI                                                      |
| test:debug         | Runs the tests in debug mode using the Playwright inspector                       |
| test:dry           | Simulates a test run against Sauce Labs without running any tests to check config |
| test:sauce         | Runs the tests in Sauce Labs against the product and environment specified        |
| test:ui            | Uses the Playwright UI to run the tests on your local machine                     |
| test:precommit     | Used before a commit to ensure the code itegrity (not yet implemented)            |
| test:bingo         | Run the tests against all three Bingo environments concurrently                   |
| test:bingo:test    | Run the tests against Bingo in Test                                               |
| test:bingo:staging | Run the tests against Bingo in Staging                                            |
| test:bingo:live    | Run the tests against Bingo in Live                                               |
| test:casino        | Run the tests against both Casino environments concurrently                       |
| test:casino:next   | Run the tests against Casino in the NEXT environment                              |
| test:casino:live   | Run the tests against Casino in Live                                              |
| test:vegas         | Run the tests against all three Vegas environments concurrently                   |
| test:vegas:test    | Run the tests against Vegas in Test                                               |
| test:vegas:staging | Run the tests against Vegas in Staging                                            |
| test:vegas:live    | Run the tests against Vegas in Live                                               |

In order to run the tests successfully, the environment variables `ENVIRONMENT` and `PRODUCT` must be set successfully.

| Variable    | Values                     | Description                              |
| ----------- | -------------------------- | ---------------------------------------- |
| ENVIRONMENT | test2, staging, next, live | The environment to run the tests against |
| PRODUCT     | bingo, casino, vegas       | the product in test                      |

### Sauce Labs

Due to the work of infra to allow access to our test environments, at this point we have to create a proxy tunnel to
Sauce Labs in order to run our tests on their browsers. Details on how to install and run the proxy client can be found
[here on Confluence](https://tools.skybet.net/confluence/pages/viewpage.action?spaceKey=GT&title=Using+a+Tunnel).
Details on starting a tunnel can also be found on that page.

Once the tunnel is started, the `SAUCE_TUNNEL_NAME` and the `SAUCE_TUNNEL_OWNER` must be defined when starting to run
the tests. For example...

```
$ npm run test:sauce -- -e ENVIRONMENT=staging -e PRODUCT=vegas
```

(To be confirmed)

Note that we still need to pass in the environment and the product to run the tests against. These need to be passed
into the `saucectl` application that will actually execute the tests. For this reason we need to delimit the npm command
and pass in the variables as options as seen above.

### User Accounts

The accounts used for testing are all stored and maintained using the
[Automated User Service](https://stash.skybet.net/projects/GPERF/repos/aws-terraform-aus/browse).

## Reporting

When running tests locally, Playwright reports for the tests can be inspected. They will not open post run but can be
opened by running `npx playwright show-report`.

### Testrail

Ultimately, we would like to report the running of tests within Testrail. At the time of writing this, it has not been
implemented but is certainly a must have.

## Development

### Linting

ESLint has been set up and can be used by running either `npm run lint` to examine the code or `npm run lint:fix` to
correct errors automatically.

### Formatting

Along with the linter, prittier has been set up to implement and define code styles to maintain. These can be run by
using either `npm run check` to check the code or again, `npm run check:fix` to automatically fix issues.

### Pre Commit Checks

Before a commit will be accepted, the linter and styleing checks are executed to maintain standards. If there are any
issues, these must be fixed before the commit will be accepted. Ideally, the tests will also be run and checked for
issues before acceptance. At the time of writing this, that has not yet been implemented.

## Things To Do...

-   Make Sauce Labs tunnel config environment variables
-   Have them run against all environments
    -   Including Live 😬
-   Implement promo tests
-   Demonstrate CI capabilities of the tests
    -   Archive/store results
    -   On failure, post to Slack
-   Filter tests
    -   Per product
    -   Gold/Silver/Bronze
-   Report into Testrail
    -   Could we extend the `test` function to take in Testrail test IDs?
-   Create a custom runner with commander?
