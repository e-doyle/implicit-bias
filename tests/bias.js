let bias = {}
var biasCommands = require('../pageObjects/biasObjects')
var pauseMs = 900
module.exports = {
    beforeEach: browser => {
        bias = browser.page.biasObjects()
        bias.navigate()
    },
    after: browser => {
        browser.end()
    },
    'Taking the test': async browser => {
        bias.startTest()
        bias.api.pause(pauseMs)
        let demo1 = await runDemoTests()
        if (demo1.method) {
            console.log('1st demographic section found pre IAT')
            bias[demo1.method]()
            bias.api.pause(pauseMs)
            let demo2 = await runDemoTests()
            if (demo2.method) {
                console.log('2nd demographic section found pre IAT')
                bias[demo2.method]()
            } else {
                console.log('no 2nd section found pre IAT')
            }
        }
        bias.click('@continue')
            .pause(pauseMs)
        browser.keys(browser.Keys.SPACE), bias.pause(pauseMs)
        function continueTest() {
            bias.api.element(
                'xpath',
                '//*[contains(text(),"If you make a mistake")]',
                async result => {
                    if (!result.value.error) {
                        browser.keys('e');
                        await runKeyPress(browser);
                        continueTest()
                    }
                }
            );
        }
        for (let i = 0; i < 7; i++) {
            continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(pauseMs)
        }
        continueTest(), bias.pause(pauseMs)
        browser.keys(browser.Keys.SPACE), bias.pause(pauseMs)
        let demo3 = await runDemoTests()
        if (demo3.method) {
            console.log('1st demographic section found post IAT')

            bias[demo3.method]()
            bias.api.pause(pauseMs)
            let demo4 = await runDemoTests()
            if (demo4.method) {
                console.log('2nd demographic section found post IAT')

                bias[demo4.method]()
            } else {
                console.log('no 2nd section found post IAT')
            }
        }
    },
}
async function runDemoTests() {
    let status = {
        run: false,
        method: ''
    }
    let page13 = await bias.api.element('xpath', '//*[contains(text(),"Page 1 out of 13")]')
    if (!page13.value.error) {
        console.log('demo13')
        status = {
            run: true,
            method: 'demo13'
        }
    }
    if (!status.run) {
        let page11 = await bias.api.element('xpath', '//*[contains(text(),"Page 1 out of 11")]')
        if (!page11.value.error) {
            console.log('demo11')
            status = {
                run: true,
                method: 'demo11'
            }
        }
    }
    return status
}
async function runKeyPress(browser) {
    let status = {
        run: false,
        method: ''
    }
    let hasError = await bias.api.element('xpath', '//*[@id="canvas"]/div[3]')
    if (!hasError.value.error) status = {
        run: true,
        method: 'pressI'
    }
    if (status.run) {
        bias[status.method](browser)
    }
    return status
}