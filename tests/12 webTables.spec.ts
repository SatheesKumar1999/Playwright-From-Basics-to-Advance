import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=>{   
    await page.goto('http://localhost:4200/')
   })
   //get the row by any text in the row
   test('web tables', async({page})=>{
    test.slow()
    
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click() 
    const getRow=page.getByRole('row', {name:'Bird'})//pointing row that needs to perform actions
    await getRow.locator('.nb-edit').click()//clicking edit
    await page.locator('input-editor').getByPlaceholder('Age').clear()// locating which column field that value needs to clear
    await page.locator('input-editor').getByPlaceholder('Age').fill('34')//after cleared, updating the new value
    await page.locator('.nb-checkmark').click()//saved
   
//})
//get the row by the specific column
//test('web tables 1', async({page})=>{
  //  await page.getByText('Tables & Data').click()
   // await page.getByText('Smart Table').click() 
    await page.locator('ng2-smart-table-pager').getByText('2').click()//moving to second page
    const getRowByCol=page.getByRole('row', {name:'11'}).filter({has: page.locator('td').nth(1).getByText('11')})//location row by using column. why we are using filter just because text 11 having 2 results thats why
    await getRowByCol.locator('.nb-edit').click()//click edit
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()//locating which column field that value needs to clear
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')//after cleared, updating the new value
    await page.locator('.nb-checkmark').click()
    await expect(getRowByCol.locator('td').nth(5)).toHaveText('test@test.com')
    await expect(page.locator('tbody tr').first()).toContainText('Mark')

    //rows by filter of values
    const ages=['30', '28', '30', '200']
    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()  
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows=page.locator('tbody tr')
             for(let ageRow of await ageRows.all()){
                 const ageValue=await ageRows.locator('td').last().textContent()
                 if (age=='200'){
                 expect(await page.locator('tbody').textContent()).toContain(' No data found ')
                 }else{
                  expect(ageValue).toEqual(age)
           }
       }
   }
})

