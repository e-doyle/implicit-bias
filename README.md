# Automated Implicit Bias

This test navigates the Harvard Implicit Bias Test to the results screen.

You will need a nightwatch.props.js file to run this test, like the following:

```javascript
module.exports = {
    resourcePath: "C:\\PATH\\TO\\YOUR\\REPO\\",
    seleniumServer: "selenium-server-standalone-3.141.59.jar",
    chromedriver: "..\\node_modules\\chromedriver\\lib\\chromedriver\\chromedriver.exe"
 }
```

To use latest chromedriver version, run `npm install chromedriver --save-dev`

To run the implicit bias test, run `nightwatch tests/bias.js`