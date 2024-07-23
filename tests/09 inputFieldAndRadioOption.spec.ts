import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{ //we can enter  'value' in beforeeach as per out wish
 await page.goto('http://localhost:4200/')
})

test.describe('Forms Layout', () =>{
    test.beforeEach('input fields', async({page})=>{
      await page.getByText('Forms').click()
      await page.getByText('Form Layouts').click() 
    })

    test('Email input field', async({page})=>{
      const emailInputOnUsingTheGrid= page.locator('nb-card', {hasText:'Using the grid'}).getByRole('textbox', {name:'Email'})
      await emailInputOnUsingTheGrid.fill('test@test.com')
      await emailInputOnUsingTheGrid.clear()//it will clear the text box value and we cant give this clear after fill in the same line
      //await emailInputOnUsingTheGrid.pressSequentially('test2@test.com')//this method will use to write work one by one like in fill method entire sentance will write at the time rather than here we will be able to see each work printing
      await emailInputOnUsingTheGrid.pressSequentially('test2@test.com', {delay:500})//when we use delay, each key (word) print will take 0.5 sec
      const textValue=await emailInputOnUsingTheGrid.inputValue()
      expect(textValue).toEqual('test2@test.com')//general assertion
      await expect(emailInputOnUsingTheGrid).toHaveValue('test2@test.com')//locator assertion
    })

    test('Password input field', async({page})=>{
      const passwordInputUsingTheGrid= page.locator('nb-card', {hasText:'Using the grid'}).getByRole('textbox', {name:'Password'})
      await  passwordInputUsingTheGrid.fill('test')
      await passwordInputUsingTheGrid.clear()//it will clear the text box value and we cant give this clear after fill in the same line
      //await passwordInputOnUsingTheGrid.pressSequentially('test2')//this method will use to write work one by one like in fill method entire sentance will write at the time rather than here we will be able to see each work printing
      await passwordInputUsingTheGrid.pressSequentially('test2', {delay:500})//when we use delay, each key (word) print will take 0.5 sec
    })

    test('radio', async({page})=>{
     const usingTheGrid= page.locator('nb-card', {hasText:'Using the grid'})
    await usingTheGrid.getByRole('radio', {name:'Option 1'}).check({force:true})//we use force:true just because radio button is hidden(html attribute value-native-input visually-hidden) for some reason in html code
     //await usingTheGrid.locator(':text-is("Option 1")').click()
    //await usingTheGrid.getByRole('radio', {name:'Option 1'}).click({force:true})
    const radioStatus= await usingTheGrid.locator(':text-is("Option 1")').isChecked()
    expect(radioStatus).toBeTruthy()//general assertion

    await usingTheGrid.locator(':text-is("Option 2")').click()
    await expect(usingTheGrid.locator(':text-is("Option 2")')).toBeChecked()//chking whether that location is chked or not (Locator assertion)
    expect(await usingTheGrid.locator(':text-is("Option 1")').isChecked()/*getting exact status(value) of radio*/).toBeFalsy()//general assertion

  })

})
