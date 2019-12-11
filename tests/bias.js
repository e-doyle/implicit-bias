let bias = {}
var biasCommands = require('../pageObjects/biasObjects')
module.exports = {
    beforeEach: browser => {
        bias = browser.page.biasObjects()
        bias
            .navigate()
    },
    after: browser => {
        browser.end()
    },
    'Taking the test': async browser => {
        bias
            .startTest()
        //first demographic section (11 or 13 questions)
        bias.api.pause(1000)
        let res1 = await runDemoTests()
        // If this runs, there was a first demo. 
        // If not (else) then it went directly to IAT section
        if (res1.method) {
            bias[res1.method]()
            bias.api.pause(1000)
            let res2 = await runDemoTests()
            if (res2.method) {
                bias[res2.method]()
            }
            // This will run if the first demo ran, but no second demo
            else {
                console.log('no 2nd demo')
            }
        }
        // IAT section 1
        bias
            .click('@continue')
            .pause(1000)
        browser.keys(browser.Keys.SPACE)
        bias.pause(1000)
        browser.keys("e")
        bias.pause(1000)
        await runKeyPress()
        browser.keys("e")
        bias.pause(1000)
        await runKeyPress()
        bias.pause(5000)

        //after all 7 key press sections
        // browser.keys(browser.Keys.SPACE)
        // bias
        // .waitForElementVisible('@resultBox')
        // .getText('@biasResult')
    },
}

async function runDemoTests() {
    let status = {
        run: false,
        method: ''
    }
    let val13 = await bias.api.element('xpath', '//*[contains(text(),"Page 1 out of 13")]')
    if (!val13.value.error) status = {
        run: true,
        method: 'demo13'
    }
    if (!status.run) {
        let val11 = await bias.api.element('xpath', '//*[contains(text(),"Page 1 out of 11")]')
        if (!val11.value.error) status = {
            run: true,
            method: 'demo11'
        }
        console.log('val11', val11)
    }
    console.log('val13', val13)
    console.log(status)
    return status
}

async function runKeyPress() {
    let status = {
        run: false,
        method: ''
    }
    let ePress = await bias.api.element('xpath', '//*[@id="canvas"]/div[3]')
    if (ePress.value.error) status = {
        run: true,
        method: 'pressE'
    }
    if (!status.run) {
        let iPress = await bias.api.element('xpath', '//*[@id="canvas"]/div[3]')
        if (!iPress.value.error) status = {
            run: true,
            method: 'pressI'
        }
        console.log('iPress', iPress)
    }
    console.log('ePress', ePress)
    console.log(status)
    return status
}