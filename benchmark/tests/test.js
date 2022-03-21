const {Builder, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const fs = require('fs')
var os = require("os");

const ITERATIONS = 10
const WARMUP_ROUNDS = 5
const SERVICE = new chrome.ServiceBuilder('../chromedriver.exe')
let loggerTest1 = fs.createWriteStream('./test1.txt')
let loggerTest2 = fs.createWriteStream('./test2.txt')
let loggerTest3 = fs.createWriteStream('./test3.txt')
let loggerTest4 = fs.createWriteStream('./test4.txt')
let loggerTest5 = fs.createWriteStream('./test5.txt')
let testData1 = []
let testData2 = []
let testData3 = []
let testData4 = []
let testData5 = []

async function main(){
  let driver = await new Builder().forBrowser('chrome').setChromeService(SERVICE).build()
  helloSelenium(driver)
}

async function helloSelenium(driver) {
    console.log("helloselenium :)")
    await driver.get('http://localhost:8080/');
    driver.manage().setTimeouts({implicit: 0.5 })

    testEdit(driver, 'button-3')
}

async function testInsert(driver, buttonId) {
    for(let i=0; i < ITERATIONS + WARMUP_ROUNDS; i++){
      const element = await driver.wait(until.elementLocated(By.id(buttonId)))
      await element.click()

      const measurement = await driver.wait(until.elementLocated(By.id('measurement')))
      const msr = await measurement.getText()

      if(buttonId == 'button-1'){
        testData1.push(msr)
      }
      if(buttonId == 'button-2'){
        testData2.push(msr)
      }

      console.log("added [", msr, "] to  test data array")
      driver.navigate().refresh()
    }
    writeTestDataToFile("test-insert", buttonId)
}

async function testEdit(driver, buttonId){
    for(let i=0; i < ITERATIONS + WARMUP_ROUNDS; i++){
      const element = await driver.wait(until.elementLocated(By.id('button-2')))
      await element.click()

      const element2 = await driver.wait(until. elementLocated(By.id(buttonId)))
      await element2.click()

      const measurement = await driver.wait(until.elementLocated(By.id('measurement')))
      const msr = await measurement.getText()

      if(buttonId == 'button-3'){
        testData3.push(msr)
      }
      if(buttonId == 'button-4'){
        testData4.push(msr)
      }
      if(buttonId == 'button-5'){
        testData5.push(msr)
      }

      console.log("added [", msr,"]")
      driver.navigate().refresh()
    }
    writeTestDataToFile("test-edit", buttonId)
}

function writeTestDataToFile(testMode, buttonId){

  if(testMode == 'test-insert'){
    if(buttonId == 'button-1'){
      testData1.forEach(line => {
        loggerTest1.write(line + os.EOL)
      })
    }
    if(buttonId == 'button-2'){
      testData2.forEach(line => {
        loggerTest2.write(line + os.EOL)
      })
    }
  }

  if(testMode == 'test-edit'){
    if(buttonId == 'button-3'){
      testData3.forEach(line => {
        loggerTest3.write(line + os.EOL)
      })
    }
    if(buttonId == 'button-4'){
      testData4.forEach(line => {
        loggerTest4.write(line + os.EOL)
      })
    }
    if(buttonId == 'button-5'){
      testData5.forEach(line => {
        loggerTest5.write(line + os.EOL)
      })
    }

  }


   
}

main()
