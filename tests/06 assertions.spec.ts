//types of assertion

import {test, expect} from '@playwright/test'
 
//expected(recived value from application).toHaveVaue(value what would we want to see)

test.beforeEach('Open applicatioj',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click() 
})

test('assertion', async({page})=>{
    //general assertion. like we comparing a exact values with expected value. if assertion fails thn execution will stop
    const a=6
    expect(a).toEqual(6)
    const basicForm= page.locator('nb-card', {hasText:"Basic form"})
    const buttonField=basicForm.getByRole('button')
    const textValue=await buttonField.textContent()
    expect(textValue).not.toEqual('Submit')//this will fail because we coded like not equal to submit, but button name is submit
    //locator assertion. we are checking expected value by using the locator where the expected value is available. if assertion fails thn execution will stop
   await expect(buttonField).toHaveText('Submit')
//soft assertion. in this we can use either general or locator assertion and we have to use soft keyword. execution will continue though assertion fails.
expect.soft(a).toEqual(5)
await expect.soft(buttonField).toHaveText('Sigh in')
await basicForm.getByRole('textbox', {name:"Email"}).fill("test@gmail.com")
})
///if we want to assert that we entered in the input box then we have to use toHaveVaue()--locatorAssertion, if we want to assert a text(inbulid in application) of any button, warning msg, success msg then we have to use textContect(), allTextContents().
//toEqual() is same for both input value and text.