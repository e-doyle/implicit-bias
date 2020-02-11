let bias = {}
var biasCommands = {
    startTest: function () {
        this
            .waitForElementVisible('@takeTest')
            .click('@takeTest')
            .waitForElementVisible('@proceed')
            .pause(1000)
            .click('@proceed')
            .waitForElementVisible('@ageTest')
            .click('@ageTest')
            .waitForElementVisible('@continue')
            .click('@continue')
        return this
    },
    demo11: function () {
        this
            .waitForElementVisible('@decline')
            .click('@decline') //1
            .waitForElementVisible('@decline')
            .click('@decline') //2
            .waitForElementVisible('@decline')
            .click('@decline') //3
            .waitForElementVisible('@decline')
            .click('@decline') //4
            .waitForElementVisible('@decline')
            .click('@decline') //5
            .waitForElementVisible('@decline')
            .click('@decline') //6
            .waitForElementVisible('@decline')
            .click('@decline') //7
            .waitForElementVisible('@decline')
            .click('@decline') //8
            .waitForElementVisible('@decline')
            .click('@decline') //9
            .waitForElementVisible('@decline')
            .click('@decline') //10
            .waitForElementVisible('@decline')
            .click('@decline') //11
        return this
    },
    demo13: function () {
        this
            .waitForElementVisible('@decline')
            .click('@decline') //1
            .waitForElementVisible('@decline')
            .click('@decline') //2
            .waitForElementVisible('@decline')
            .click('@decline') //3
            .waitForElementVisible('@decline')
            .click('@decline') //4
            .waitForElementVisible('@decline')
            .click('@decline') //5
            .waitForElementVisible('@decline')
            .click('@decline') //6
            .waitForElementVisible('@decline')
            .click('@decline') //7
            .waitForElementVisible('@decline')
            .click('@decline') //8
            .waitForElementVisible('@decline')
            .click('@decline') //9
            .waitForElementVisible('@decline')
            .click('@decline') //10
            .waitForElementVisible('@decline')
            .click('@decline') //11
            .waitForElementVisible('@decline')
            .click('@decline') //12
            .waitForElementVisible('@decline')
            .click('@decline') //13
        return this
    },
    pressE: function (browser) {
        this
        browser.keys("e")
        return this
    },
    pressI: function (browser) {
        this
        browser.keys("i")
        return this
    }
}


module.exports = {
    url: 'https://implicit.harvard.edu/implicit/',
    commands: [biasCommands],
    elements: {
        takeTest: {
            selector: '//a[contains(text(),"Take a Test")]',
            locateStrategy: 'xpath'
        },
        ageTest: {
            selector: '//a[contains(text(),"Age IAT")]',
            locateStrategy: 'xpath'
        },
        proceed: {
            selector: '//a[contains(text(),"I wish to proceed")]',
            locateStrategy: 'xpath'
        },
        continue: {
            selector: '//button[@class="btn btn-primary"]',
            locateStrategy: 'xpath'
        },
        decline: {
            selector: '//button[contains(text(),"Decline to Answer")]',
            locateStrategy: 'xpath'
        },
        eleven: {
            selector: '//*[contains(text(),"Page 1 out of 11")]',
            locateStrategy: 'xpath'
        },
        thirteen: {
            selector: '//*[contains(text(),"Page 1 out of 13")]',
            locateStrategy: 'xpath'
        },
        error: {
            selector: '//*[@id="canvas"]/div[3]',
            locateStrategy: 'xpath'
        },
        biasResult: {
            selector: '//*[@id="pi-app"]/div/div/div[2]/div/div/ol/li[1]/div/div[1]/div/p',
            locateStrategy: 'xpath'
            
        }
    }
}
async function runKeyPress(browser) {
    let status = {
        run: false,
        method: ''
    }
    let hasError = await bias.api.element('xpath', '//*[@id="canvas"]/div[3]')
    console.log(hasError)
    if (!hasError.value.error) status = {
        run: true,
        method: 'pressI'
    }
    console.log(status)
    if (status.run) {
        bias[status.method](browser)
    }
    return status
}