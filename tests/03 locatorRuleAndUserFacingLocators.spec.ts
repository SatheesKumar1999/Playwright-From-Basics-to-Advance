import {test} from '@playwright/test'

test.beforeEach('Open applicatioj',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click() 
})

test('locator syntax format/rules', async({page})=>{
    await page.locator('input').first().click()//by using tag name
    await page.locator('#inputPassword2').click()//by using ID---password
    await page.locator('.input-full-width')//by using Class(part of the class value)---Email
    await page.locator('[placeholder="Jane Doe"]').click()//by using Attribute---jane doe field
  //  await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition cdk-focused cdk-mouse-focused"]').click()//by using Class full value
    await page.locator('.input-full-width#inputEmail1').click()//by using combination of locators
    page.locator('')//by using Class Xpath (Not recommended to use)
    page.locator(':text("Inline")')//partial text
    let text= await page.locator(':text("Inline")').allTextContents()//getting the text by using partial text
    console.log("Expected Text is: "+text)
    page.locator(':text-is("Inline form")')//by using full text
    let text1= await page.locator(':text-is("Inline form")').allTextContents()//getting text by using full text
    console.log("Expected Text recheck: "+text1)
    await page.locator(':text-is("Charts")').click()
})

test('User Facing Locators', async({page})=>{
  await page.getByRole('textbox', {name:"Email"/*name should be what we see in the field*/}).first().click() // we have define what is the role(textbox, chk box.._) and name (test) of the field
  await page.getByRole('button',{name:"Sign in"}).first().click()

  await page.getByLabel('Email').first().click()//by using lable text or name

  await page.getByText('Using the Grid').click()//by using text... always looking partial text(for example if we getbytext('1') in date picker then pw cant find exact match as getbytext match partial text. in data picker we have 1, 11, 12...so pw will confuse which one have to pick. for this we have solution and see that in data picker lession)
  await page.getByTestId('SignIn').click() // we have to manually add testid in source and keyword should be data-testid and value based on our own
  await page.getByTitle('Datepicker').click() // by using title value
  await page.getByPlaceholder('Form Picker').click()//by  using placeholder value

 
})