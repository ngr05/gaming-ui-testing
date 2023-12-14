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

## CLI

I have created a CLI tool that can make running these tests easier. As it is almost a separate thing, I have created a
separate readme which can be found [here](CLI_README.md). The rest of this readme is writen with just direct NPM
actions.

## Running the Tests

The tests can be run either using the bundled Playwright browsers or using Sauce Labs. The CLI tool has been created
with making it easy to run the tests against any environment. If you would like to like to run the tests directly, there
are number of commands that have been created. They are the following...

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

Test results are documented withing TestRail. The implementation of this has been developed from the initial starting
point that can be found in [this video](https://www.youtube.com/watch?v=sEF9DOcFRY0). TestRail support documentation can
also be found [here](https://support.testrail.com/hc/en-us/articles/9682231778324-Integrating-with-Playwright).

Due to us running the same tests on multiple browsers, we have to do some extra bits of work. Because if we were to look
at the junit report, we would find the same test cases multiple times the TestRail CLI would error. A command line tool
has been created in order to handle the logic. The first step that needs to take place is the creation of a test plan.
The custom reporter will have created junit files for each of the browsers. Each of those files should then be parsed by
with the TestRail CLI and uploaded to the test plan with the configuration that has been set up already for the browser.
Once that is done, the test plan should be closed.

Test cases are automatically created though the use of the TestRail CLI. As long as the Playwright IDs and folders are
not changed, there will be no duplicates.

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

-   Get videos stored and running in Jenkins artifacts
-   Demonstrate CI capabilities of the tests
    -   Report to TestRail from Jenkins
    -   Add a flag to the parameters for whether to report into TestRail
    -   On failure, post to Slack

## Jenkins

In order to work on a Jenkins Pipeline to run the tests, I have used a dockerised version in order to test. I used
[these docs](https://www.jenkins.io/doc/book/installing/docker/) to run the instance. To start this instance, just run
`gput development`.

This will start an instance of Jenkins at http://localhost:8080. The admin password will be output at the end of the dev
script.

While developing the script, it is best advised to develop the pipeline through the UI directly before storing it in
this repo.

### Required Plugins

-   Badge
-   Parameterized Scheduler
-   Slack Notification

### Initial Dev Job Setup

1. Go to [http://localhost:8080](http://localhost:8080)
2. Input the admin password
3. Install suggested plugins and wait for them to install
4. Select `Skip and continue as admin` (or you can create an account)
5. `Save and Finish`
6. `Start using Jenkins`
7. `Create a job`
8. Select `Pipeline` and give the job the name `ui-tests`
9. Copy the pipeline as is from `jenkins/Jenkinsfile` into the Pipeline script at the bottom of the configuration page
10. `Save`

Once the job is run for the first time, it will pick up the parameters and configuration.

### Running the Pipeline from Version Control

1. Select the pipeline definition to `Pipeline script from SCM`
2. Set the repository URL to `https://github.com/ngr05/gaming-ui-testing.git`
3. Set the `Branch Specifier` to `*/$BRANCH`
4. Set the `Script Path` to `jenkins/Jenkinsfile`

### Scheduling

The syntax for scheduling is as follows...

```
┌--------------- minute (0 - 59)
| ┌-------------- hour (0 - 23)
| | ┌------------ day of month (1 - 31)
| | | ┌---------- month (1 - 12) OR jan,feb,mar ...
| | | | ┌-------- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue ...
| | | | |
* * * * * command to be executed
```

There are several predefined values that can be used to instead of the Cron expression in Jenkins...

| Entry     | Description                                   | Equivalent to |
| --------- | --------------------------------------------- | ------------- |
| @yearly   | Run at any time during the year               | H H H H \*    |
| @annually | Run at any time during the year               | H H H H \*    |
| @monthly  | Run at any time during the month              | H H H \* \*   |
| @weekly   | Run at any time during the week               | H H \* \* H   |
| @daily    | Run at any time during the day                | H H \* \* \*  |
| @midnight | Run at some time between 12:00 AM and 2:59 AM |               |
| @hourly   | Run at any time during the hour               | H \* \* \* \* |

Here are some example schedules...

| Schedule          | Job                                            |
| ----------------- | ---------------------------------------------- |
| \* \* \* \* \*    | Run cron job every minute                      |
| \*/5 \* \* \* \*  | Run cron job every 5 minutes                   |
| \*/30 \* \* \* \* | Run cron job every 30 minutes                  |
| 0 \* \* \* \*     | Run cron job every hour                        |
| 0 \*/3 \* \* \*   | Run cron job every 3 hours                     |
| 0 13 \* \* \*     | Run cron job every day at 1pm                  |
| 30 2 \* \* \*     | Run cron job every day at 2.30am               |
| 0 0 \* \* \*      | Run cron job every day at midnight             |
| 0 0 \* \* 0       | Run cron job every Sunday                      |
| 0 0 \* \* 1       | Run cron job every Monday                      |
| 0 0 1 \* \*       | Run cron job every first day of every month    |
| 0 0 1 1 \*        | Run cron job every first of January every year |

> To allow periodically scheduled tasks to produce even load on the system, the symbol H (for “hash”) should be used
> wherever possible. For example, using 0 0 \* \* \* for a dozen daily jobs will cause a large spike at midnight. In
> contrast, using H H \* \* \* would still execute each job once a day, but not all at the same time, better using
> limited resources.

> The `H` symbol can be thought of as a random value over a range, but it actually is a hash of the job name, not a
> random function, so that the value remains stable for any given project.

In order to start builds with parameters with the scheduler, the schedule should be delimited with the `%` character
with the parameters separated by a semi-colon. For example, to run the tests against Bingo on Staging hourly...

```
H * * * * % environment=staging;product=bingo
```

Info taken from [Shell Hacks](https://www.shellhacks.com/jenkins-schedule-build-periodically-parameters/).
