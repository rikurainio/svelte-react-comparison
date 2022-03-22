const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
var os = require("os");

const ITERATIONS = 1000
const WARMUP_ROUNDS = 5
const SERVICE = new chrome.ServiceBuilder('../chromedriver.exe')
let loggerTest= fs.createWriteStream('./test.txt')
let testData = []

async function main(){
  let driver = await new Builder().forBrowser('chrome').setChromeService(SERVICE).build()
  helloSelenium(driver)
}

async function helloSelenium(driver) {
    console.log("helloselenium :)")
    await driver.get('http://localhost:8080/');
    driver.manage().setTimeouts({implicit: 0.5 })

    testInsert(driver, 'button-insert-10')
    //testEdit(driver, 'button-3')
}


async function testInsert(driver, buttonId) {
    for(let i=0; i < ITERATIONS + WARMUP_ROUNDS; i++){
      const element = await driver.wait(until.elementLocated(By.id(buttonId)))
      await element.click()

      const measurement = await driver.wait(until.elementLocated(By.id('measurement')))
      const msr = await measurement.getText()

      testData.push(msr)
      console.log("added [", msr, "] to  test data array")
      driver.navigate().refresh().then(
        driver.manage().setTimeouts({implicit: 0.5 })
      )
    }
    writeTestDataToFile()
}


async function testEdit(driver, buttonId){
    console.log("start of testEdit")
    for(let i=0; i < ITERATIONS + WARMUP_ROUNDS; i++){
      try{
        const element = await driver.wait(until.elementLocated(By.id('button-2')))
        await element.click()
  
        const element2 = await driver.wait(until. elementLocated(By.id(buttonId)))
        await element2.click()
  
        const measurement = await driver.wait(until.elementLocated(By.id('measurement')))
        const msr = await measurement.getText()
        driver.navigate().refresh().then(
          driver.manage().setTimeouts({implicit: 0.5 })
        )
      }
      catch(err){
        console.log("error:",err)
      }
    }
    writeTestDataToFile("test-edit", buttonId)
}

function writeTestDataToFile(){
  console.log("writing... (" + testData.length + ")")
  testData.forEach((line) => {
    loggerTest.write(line + os.EOL)
  })
}

main()
