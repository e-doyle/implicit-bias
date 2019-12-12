let bias = {}
var biasCommands = require('../pageObjects/biasObjects')
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
        bias.api.pause(1000)
        let res1 = await runDemoTests()
        // If this runs, there was a demographic section. If not (else) then it went directly to IAT section
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
        // IAT
        bias.click('@continue')
            .pause(1000)
        browser.keys(browser.Keys.SPACE), bias.pause(1000)
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
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), browser.keys(browser.Keys.SPACE), bias.pause(1000)
        continueTest(), bias.pause(1000)
        //after all 7 key press sections are complete
        browser.keys(browser.Keys.SPACE), bias.pause(10000)
        //below here is where I would call the demographic if function again, 
        // if one or zero sections appeared before the IAT. 
        //for some reason it isn't running demo13() when it needs to, though.
        // bias
        // if (res1.method) {
        //     bias[res1.method]()
        //     bias.api.pause(500)
        //     let res2 = await runDemoTests()
        //     if (res2.method) {
        //         bias[res2.method]()
        //     }
        //     // This will run if the first demo ran, but no second demo
        //     else {
        //         console.log('no 2nd demo')
        //     }
        // }
        //below I tried to find a way to print the text in the results box, to no avail with the time restraint
        // bias
        // results = bias.findElement(By.xpath('//*[@id="pi-app"]/div/div/div[2]/div/div/ol/li[1]/div/div[1]/div/p')).getText();
        // System.out.println(results);
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
// Ideally I would house this down here & call it in my test more cleanly
// async function continueTest(browser) {
//     bias.api.element(
//         'xpath',
//         '//*[contains(text(),"If you make a mistake")]',
//         async result => {
//             if (!result.value.error) {
//                 browser.keys('e');
//                 bias.pause(1000);
//                 await runKeyPress(browser);
//                 bias.pause(1000)
//                 continueTest()
//             }
//         }
//     );
// }