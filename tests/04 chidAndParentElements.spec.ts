//locationg the element by using child (Consider wanted element should be child one)
import {test} from '@playwright/test'

test.beforeEach('Open applicatioj',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click() 
})

test('locating the elememt By using child element', async({page})=>{
 
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
   await page.locator('nb-card'/*parent tag*/).locator('nb-radio').locator(':text-is("Option 2")').click()
   await page.locator('nb-card').getByRole('button', {name:"Sign in"}).first().click()
   await page.locator('nb-card').nth(3).getByRole('button').click()//here we use index(position number), so we dont need to put button name unless that parent has more than 1 button
   })

test('locating element by using parent',async ({page})=>{
    await page.locator('nb-card', {hasText:"Option 1"}).getByRole('textbox', {name:'Email'}).click()
    await page.locator('nb-card'/*Parent tag*/, {hasText:"Using the Grid"}/*Making parent to unique by using this*/).getByRole('textbox', {name:'Email'}).click()
    await page.locator('nb-card', {has:page.locator("#inputPassword2")}).getByRole('textbox', {name:"Password"}).click() 
    await page.locator('nb-card').filter({hasText:"Send"}).getByRole('textbox', {name:"Recipients"}).click() 
    await page.locator('nb-card').filter({hasText:"Sign in"}).filter({has:page.locator('nb-checkbox')}).getByRole('textbox', {name:"Password"}).click() 
    await page.locator(':text-is("Inline form")').locator('..').getByRole('textbox', {name:'Email'}).click()//without pointing parent tag just we pointing text name and (..)mean going up to element and click related box
    await page.locator('nb-card', {hasText:"Using the Grid"}).locator(':text-is("Option 1")').click()
  })
  //we use filter just because for more accurate to locate the Parent element. ( same parent tag might get more web element like nb-card has 2-3 web elements such us Using the grid, Forms withoutlabel,..etc to locate exact web element we use filter for sign in, then playwright will find the paraent element where sign in is there)