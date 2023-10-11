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

| Command             | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| test                | Runs the tests on within CLI                                                      |
| test:debug          | Runs the tests in debug mode using the Playwright inspector                       |
| test:dry            | Simulates a test run against Sauce Labs without running any tests to check config |
| test:sauce          | Runs the tests in Sauce Labs against the product and environment specified        |
| test:ui             | Uses the Playwright UI to run the tests on your local machine                     |
| test:precommit      | Used before a commit to ensure the code itegrity (not yet implemented)            |
| test:prod           | Runs tests for all products in the production environment                         |
| test:preprod        | Runs tests for all products in the preprod environments                           |
| test:bingo          | Run the tests against all three Bingo environments concurrently                   |
| test:bingo:test     | Run the tests against Bingo in Test                                               |
| test:bingo:staging  | Run the tests against Bingo in Staging                                            |
| test:bingo:live     | Run the tests against Bingo in Live                                               |
| test:bingo:preprod  | Runs the tests for Bingo in all pre production environments                       |
| test:casino         | Run the tests against both Casino environments concurrently                       |
| test:casino:next    | Run the tests against Casino in the NEXT environment                              |
| test:casino:live    | Run the tests against Casino in Live                                              |
| test:casino:preprod | Runs the tests for Casino in all pre production environments                      |
| test:vegas          | Run the tests against all three Vegas environments concurrently                   |
| test:vegas:test     | Run the tests against Vegas in Test                                               |
| test:vegas:staging  | Run the tests against Vegas in Staging                                            |
| test:vegas:live     | Run the tests against Vegas in Live                                               |
| test:vegas:preprod  | Runs the tests for Vegas in all pre production environments                       |

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
$ SAUCE_TUNNEL_NAME=nick_green_tunnel SAUCE_TUNNEL_OWNER=sso-nicholas.green-bb555 npm run test:sauce -- -e ENVIRONMENT=staging -e PRODUCT=vegas
```

Note that we still need to pass in the environment and the product to run the tests against. These need to be passed
into the `saucectl` application that will actually execute the tests. For this reason we need to delimit the npm command
and pass in the variables as options as seen above.

### User Accounts

The accounts used for testing are all stored and maintained using the
[Automated User Service](https://stash.skybet.net/projects/GPERF/repos/aws-terraform-aus/browse).

There is a custom fixture function that has been created to get a user account per test. It is imperative that the
accounts are released after each test. It is best to do this in the after each hook for the tests. For example...

```
test.afterEach(async ({ homepage }) => {
    await releaseAccount((await homepage.getAccount()).username);
});
```

When using the custom fixtures, there is a method on the page object class that needs to be extended called `getAccount`
that can be used to get the account for the test. It acts as a singleton. If there is a user already defined, it is
returned. If there is not, it gets a new user account and stores it for us throughout the test.

### Filtering

There is the ability to filter tests on tags through all the start commands, apart from with Sauce Labs (only because I
haven't fully investigated). To filter the `grep` option needs to be passed to Playwright. This can be done by
delimiting the npm command and passing the option along with the tags to filter on. For example...

```
$ ENVIRONMENT=staging PRODUCT=vegas npm run test -- --grep "@login"
```

The tests that have the tag in their title will then be executed. This means that the test must look something like
this...

```
test('@login', async ({ account, homepage }) => {
    [...]
});
```

If you would like to run multiple tags, the option is a regex. Therefore, multiple tags can be passed by separating them
with a pipe. Eg.

```
$ ENVIRONMENT=staging PRODUCT=vegas npm run test -- --grep "@login|@logout"
```

## Reporting

When running tests locally, Playwright reports for the tests can be inspected. They will not open post run but can be
opened by running `npx playwright show-report`.

### Testrail

Ultimately, we would like to report the running of tests within Testrail. At the time of writing this, it has not been
implemented but is certainly a must have.

## Development

### Custom Fixtures

Details on fixtures can be found [here](https://playwright.dev/docs/test-fixtures). The custom fixtures for this repo
can be found at `src/playwright.ts`. The use of fixtures means that we can set up the environment on a per test basis so
that each test is isolated and can focus on testing the functionality in front of it.

There is a custom worker that has been defined for handling user accounts per worker. This means that a single user
account will be allocated to a worker and can then be used for all tests carried out by that worker. Once the worker has
completed its workload, the account is then released to be utilised by any other tests.

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

### Tagging

Tagging is done by adding tags to the title of tests. Each tag should begin with a `@` and be followed by the tag.

```
test('this is a test @silver @vegas @stage', async ({ homepage }) => {
```

## Things To Do...

-   Implement promo tests
-   Demonstrate CI capabilities of the tests
    -   Archive/store results
    -   On failure, post to Slack
-   Report into Testrail
    -   Could we extend the `test` function to take in Testrail test IDs?
-   Create a custom runner with commander?

## Jenkins

In order to work on a Jenkins Pipeline to run the tests, I have used a dockerised version in order to test. I used
[these docs](https://www.jenkins.io/doc/book/installing/docker/) to run the instance. To start this instance, just run
`./jenkins/start-dev.sh`.

This will start an instance of Jenkins at http://localhost:8080. The admin password will be output at the end of the dev
script.

While developing the script, it is best advised to develop the pipeline through the UI directly before storing it in
this repo.

### Required Plugins

-   Slack Notification

### Initial Job Setup

1. Go to [http://localhost:8080](http://localhost:8080)
2. Input the admin password
3. Install suggested plugins and wait for them to install
4. Select `Skip and continue as admin`
5. `Save and Finish`
6. `Start using Jenkins`
7. `Create a job`
8. Select `Pipeline` and give the job the name `ui-tests`
9. Select `Discard old builds` and set `Max # of builds to keep` to 10
10. Select `GitHub project` and set to `https://github.com/ngr05/gaming-ui-testing/`
11. Select `This project is parameterised`
12. Create a string parameter called `BRANCH` with the default value set to `main`
13. Create a choice parameter called `PRODUCT` with the options `bingo`, `casino` and `vegas`
14. Create a choice parameter called `ENVIRONMENT` with the options `live`, `staging`, `next` and `test`

#### Running the Pipeline from Version Control

1. Select the pipeline definition to `Pipeline script from SCM`
2. Set the repository URL to `https://github.com/ngr05/gaming-ui-testing.git`
3. Set the `Branch Specifier` to `*/$BRANCH`
4. Set the `Script Path` to `jenkins/Jenkinsfile`
