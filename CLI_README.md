# Gaming Playwright UI Tests (GPUT) CLI Tool

## Installation

At this point, the package is not stored for use by anybody and just available to those in the repository. Once the
repository is pulled down, enter it and run a link. Once that is complete you can check the installation by running
`gput -v` to verify.

```
$ git clone git@github.com:ngr05/gaming-ui-testing.git
$ cd <code directory>
$ npm link
$ gput -v
```

## Help

Using the `-h` or `--help` option on any command will output the help for the command in question. If you are not sure
how it works or what is needed, this option should provide insight.

## Commands

### Development

Starts the local development environment. This is specific to the running of the Jenkins instance locally. There is no
specific infrastructure that is required to run anything locally. If you would like to see the running of the Jenkins
job locally then this would be a good starting point. This is ideal for the development of the Jenkins intergration. If
you would like to start the instance again from a fresh canvas, please pass in the refresh option and the docker
commands will be run to clean up after any previous running instance.

#### Options

|         | Long    | Short | Description                                       | Example                 |
| ------- | ------- | ----- | ------------------------------------------------- | ----------------------- |
| refresh | --fresh | -f    | Whether to clear the data volumes and start clean | gput development -f     |
| help    | --help  | -h    | Displays the help for the command                 | gput development --help |

#### Example

```
$ gput development --fresh
```

### Test

Runs the tests. This command handles all elements of running the tests. The product and environment are both mandatory
fields. All others are optional. If the TestRail option is passed in, the run will report to TestRail. With that, the
username and password/api key for TestRail must be specified along with a title for the run. The UI option will open the
Playwright UI for manual execution. If you would only like to run specific tests, you can pass in as many tag arguments
as you would like and only those tests will be executed.

#### Options

|             | Long                        | Short            | Description                                                           | Example                           |
| ----------- | --------------------------- | ---------------- | --------------------------------------------------------------------- | --------------------------------- |
| environment | --environment <environment> | -e <environment> | The environment to test (choices: "live", "next", "staging", "test2") | gput test -e test2                |
| key         | --key <key>                 | -k <key>         | The user's api key                                                    | gput test -k something            |
| product     | --product <product>         | -p <product>     | The product to test (choices: "bingo", "casino", "vegas")             | gput test -p bingo                |
| title       | --title <title>             |                  | The title of the test run                                             | gput test --title 'Test Run'      |
| testrail    | --testrail                  | -tr              | Whether to report the test run in TestRail                            | gput test -tr                     |
| ui          | --ui                        |                  | Run the tests using the playwirght UI                                 | gput test --ui                    |
| username    | --username <username>       | -u <username>    | The user's username                                                   | gput test -u some.one@flutter.com |
| tag         | --tag <tag...>              | -t <tag...>      | Any specific tags to run tests for                                    | gput test -t test                 |
| help        | --help                      | -h               | Displays the help for the command                                     | gput test --help                  |

#### Example

```
$ gput test -e staging -p vegas -tr --title 'Some Test Run' -u some.one@flutteruki.com -p password
```

### Report

Report the test run. This could be opening the reports for the run locally or it can be reporting to TestRail. By
default, it will just open the HTML report locally. If the TestRail flag is passed, the run will be reported into
TestRail if the username and the password are passed along with a title for the test run. They will take the XML
`testrail.[browser].xml` files from the `test-results` directory and upload them. If there is a legacy test run there it
will upload those results so it is advised to always run the tests before this to ensure you are looking at the latest
results.

#### Options

|          | Long                  | Short         | Description                                | Example                           |
| -------- | --------------------- | ------------- | ------------------------------------------ | --------------------------------- |
| key      | --key <key>           | -k <key>      | The user's api key                         | gput test -k something            |
| title    | --title <title>       | -t <title>    | The title of the test run                  | gput test -t 'Test Run'           |
| testrail | --testrail            | -tr           | Whether to report the test run in TestRail | gput test -tr                     |
| username | --username <username> | -u <username> | The user's username                        | gput test -u some.one@flutter.com |
| help     | --help                | -h            | Displays the help for the command          | gput report --help                |

#### Example

```
$ gput report
```

### Help

Display help for the CLI tool.

#### Options

N/A

#### Example

```
$ gput help
```
