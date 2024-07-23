import {test, expect} from '@playwright/test'

test ('Mobile Validation', async({page})=>{
   test.slow()
    await page.goto('http://localhost:4200/')
    await page.locator('.sidebar-toggle').click()
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await page.locator('.sidebar-toggle').click()
    const emailInputOnUsingTheGrid= page.locator('nb-card', {hasText:'Using the grid'}).getByRole('textbox', {name:'Email'})
    await emailInputOnUsingTheGrid.fill('test@test.com')
    await emailInputOnUsingTheGrid.clear()//it will clear the text box value and we cant give this clear after fill in the same line
    //await emailInputOnUsingTheGrid.pressSequentially('test2@test.com')//this method will use to write work one by one like in fill method entire sentance will write at the time rather than here we will be able to see each work printing
    await emailInputOnUsingTheGrid.pressSequentially('test2@test.com')//when we use delay, each key (word) print will take 0.5 sec
    const textValue=await emailInputOnUsingTheGrid.inputValue()
    expect(textValue).toEqual('test2@test.com')//general assertion
    await expect(emailInputOnUsingTheGrid).toHaveValue('test2@test.com')//locator assertion
  })