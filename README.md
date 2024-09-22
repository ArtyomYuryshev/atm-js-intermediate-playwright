# Disclaimer

> This is an educational project.
> Do not consider current solutions as the only correct ones and ready for use on a production project

# NOTE!

> **You should create a `.env` file and define the variables "RP_API_KEY" and "RP_PROJECT". <br> The value for the "RP_API_KEY" variable should be your API token, and the value for the "RP_PROJECT" variable should be your project name. <br> Currently, all ReportPortal configuration is commented out to allow running tests without a ReportPortal account.**

> **Tests adapted for mobile devices, tagged @mobile. Tests adapted for tablet devices, tagged @tablet**

# How To

### To update local modules:

You can update local modules by running the following command in your terminal:

```shell
npm install
```

### To init PW:

```shell
npm init playwright@latest
```

### To run tests:

You can run tests by using the following command in your terminal:

```shell
npm run test:desktop
```

By default tests runs in headless mode. To run in 'headed' mode:

```shell
npm run test:desktop:headed
```
NOTE: To run tests on mobile devices, see package.json

### To view HTML report:

```shell
npm run report
```

### To run Junit report on http://localhost:3000:

```shell
npm run report:runJunit
```

### To run Prettier for ALL files to check:

```shell
npm run prettier:check
```

### To run Prettier for ALL files to re-write:

```shell
npm run prettier:write
```

### To run ESLint for ALL files:

```shell
npm run lint
```

### To update Golden Screenshots:

```shell
npm run update-snapshots
```
NOTE: it is better to create screenshots by running the test in the mode (with or without head) in which you plan to test. Otherwise, the visual difference may exceed the percentage set by the tests