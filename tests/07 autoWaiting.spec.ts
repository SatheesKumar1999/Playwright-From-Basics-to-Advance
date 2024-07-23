//await will wait 30 sec for locators and 5 sec for assertion. we can modify await time PW.config(but not needed).if we need more waiting period then e can auto waiting
//we have multiple autowaiting methods, we can use any based on situation.1000ms=1 sec
//for some actions default wait (Await) isn't applicable, at the time we can automatic wait. even some time await time also will not work for some, at the time aslo we can use automatic wait
import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

test.beforeEach('Open applicatioj',async ({page})=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('autowaiting', async({page})=>{
const suceessMsg=  page.locator('.bg-success')//.bg-success is a web element of suceess msg.
//await suceessMsg.click()
await suceessMsg.waitFor({state:"attached"})// alltextcontent will not wait as same as textcontent. so we have to put automatic wait
const text=await suceessMsg.allTextContents()
expect(text).toContain('Data loaded with AJAX get request.')

//await expect(suceessMsg).toHaveText('Data loaded with AJAX get request.', {timeout:20000})//we are giving 20 sec for assertion. means, this execution will waiting for 20sec, if bw 20sec expected value compared thn remaining time will be ignored.
})

test('alternative Auto waiting', async({page})=>{
    const suceessMsg=  page.locator('.bg-success') 
    //wait for element
    await page.waitForSelector('.bg-success')
    

    //wait for particular resonse (we have to take that particular action response url from Network)
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')
   
   const getText=await suceessMsg.allTextContents()
   expect(getText).toContain('Data loaded with AJAX get request.')
   console.log(getText)
    //we have few more wait option and those aren't in the lession
})