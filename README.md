# Disclaimer

> This is an educational project.
> Do not consider current solutions as the only correct ones and ready for use on a production project

# How To

### To update local modules:

You can update local modules by running the following command in your terminal:

```shell
npm install
```

### To run tests:

You can run tests by using the following command in your terminal:

```shell
npm test
```

### To view allure report:

If you want to view the allure report, you can use this command in your terminal:

```shell
allure serve ./allure-results
```

or generate HTML version

```shell
npm run report:generate
```

### To run Prettier for ALL files:

```shell
npx prettier --write .
```

or via npm

```shell
npm run prettier
```

### To analyzing dependencies in a project:

```shell
npm run depcheck
```
