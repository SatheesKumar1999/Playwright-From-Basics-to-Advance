//reduce the duplication of code by declare the code to a variable

import {test, expect} from '@playwright/test'


test.beforeEach('Open applicatioj',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click() 
})

test.skip('Reusing Locators 1', async ({page})=>{
    
    await page.locator('nb-card', {hasText:"Basic form"}).getByRole('textbox', {name:'Email'}).fill("Test@gmail.com")
    await page.locator('nb-card', {hasText:"Basic form"}).getByRole('textbox', {name:'Password'}).fill("Test")
    await page.locator('nb-card', {hasText:"Basic form"}).getByRole('button', {name:'Submit'}).click()
})
//we can reuse above line of code as follows
test('Reusing Locators on Basic form', async ({page})=>{
    const basicForm= page.locator('nb-card', {hasText:"Basic form"})
    await basicForm.getByRole('textbox', {name:'Email'}).fill("Test@gmail.com")
    await basicForm.getByRole('textbox', {name:'Password'}).fill("Test")
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name:'Submit'}).click()
})

test.only('Reusing Locators on Using the Grid', async ({page})=>{
    const basicFormA= page.locator('nb-card', {hasText:"Using the Grid"})
    const passwordField=basicFormA.getByRole('textbox', {name:'Password'}) //just we can do this also for PW nd all other field, just kind of option we have. and basically its represents that particular text box.
    await basicFormA.getByRole('textbox', {name:'Email'}).fill("Test@gmail.com")
    await passwordField.fill("Test")
    await basicFormA.locator(':text-is("Option 1")').click()
    await basicFormA.getByRole('button', {name:'Sign in'}).click()

    await expect(passwordField).toHaveValue("Test")//its just a assertion like we are chking expected value of this box is test. and this expect keyword should import from playwright as we did in first line.
})

test('Extracting values', async({page})=>{
//taking single text value
const basicFormA= page.locator('nb-card', {hasText:"Using the Grid"})
const buttonTextValue= await basicFormA.getByRole('button').textContent()
console.log(buttonTextValue)
expect(buttonTextValue).toEqual('Sign in')
const basicForm= page.locator('nb-card', {hasText:"Basic form"})
const value=await basicForm.locator('nb-checkbox').textContent()
//taking multiple text values
const allTextValue=await page.locator('nb-radio').allTextContents()
expect(allTextValue).toContain('Option 1')
console.log(allTextValue)
console.log(value)
//taking attribute Value
const attributeValue=await basicForm.getByRole('textbox', {name:"Password"}).getAttribute('type')
console.log(attributeValue)
expect(attributeValue).toEqual('password')
//getting input value(the value given by us)
const emailField= basicFormA.getByRole('textbox', {name:'Email'})
await emailField.fill('test@test.com')
const inputValue=await emailField.inputValue()
expect(inputValue).toEqual('test@test.com')
console.log(inputValue)
})
///if we want to get a value that we entered in the input box then we have to use inputValue(), if we want to get a text value any button, warning msg, success msg then we have to use textContect(), allTextContents().
