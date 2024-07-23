import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{   
    await page.goto('http://localhost:4200/')
   })

test('ToolTip', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click() 
    const toolTipPlacement= page.locator('nb-card', {hasText:'Tooltip Placements'})
    await toolTipPlacement.getByRole('button', {name:'Right'}).hover()//first pointing parent then hoven the tip button
   //await page.getByRole('toolTip').textContent()
    // await page.locator('nb-card nb-card-body :text-is("Top")').hover()//single line code to hover the Tip button by using child element
    const toolTip=await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')
})
 
test.describe('dialouge', ()=> {
  //Box triggered from application
  test('Dialog', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click() 
    //clicking dialouge which is triggered in application
   // await page.getByText('Open Dialog', ({exact:true})).screenshot({path:"screenShot/cam.png"})
   await page.locator('nb-card', {hasText:"Open Dialog with template"}).locator(':text-is("Open Dialog with component")').click()
   await page.waitForTimeout(1000)
    //await page.getByText('Open Dialog', ({exact:true})).locator('..').locator(':text-is("Open Dialog with template")').click()//open the dialog box
    await page.locator('nb-card' ).locator('..').locator(':text-is("Dismiss Dialog")').click()//we can use this code also and we can create code by using parent locator
//dialouge trigged from Browser
})
test('Dialog Box triggered from Browser', async({page})=>{
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click() 
    
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })
    
   await page.locator('tr', {hasText:'mdo@gmail.com'}).locator('.nb-trash').click()
   await expect(page.locator('tr').first()).not.toHaveText('mdo@gmail.com')
})
})
//adding table row to the page
test('adding new row', async({page})=>{
   
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click() 
    await page.locator('.nb-plus').click()// clicking plus icon
    await page.locator('input-editor input[placeholder="First Name"]').fill('SK')//updating SK in the table column
    await page.locator('.nb-checkmark').click()//adding to the row by clicking tick mark
    const value=await page.locator('tr', {hasText:'SK'}).isVisible()//chking whether name that we added is available or not by using the row(that is if we added the name thn new roe would craeted with SK)
    expect(value).toBeTruthy()
    console.log(value)

   
})

test('like tooltip but not a tooltip', async({page})=>{
   
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Popover').click() 
    await page.getByRole('button', {name:"Left"}).hover()
    const text= await page.locator('nb-popover').textContent()
    expect(text).toEqual('Hello, how are you today?')
    console.log(text)
    const t= page.locator('nb-card').filter({has: page.locator(':text-is("on hover")')})
    const e=await t.locator('p').textContent()
    console.log(e)
   
})