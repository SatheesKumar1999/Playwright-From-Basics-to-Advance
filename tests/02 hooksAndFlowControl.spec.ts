import {test} from '@playwright/test'
//Hooks--> beforeeach, beforeall, aftereah, after all
//Beforeach means each of test will exeute after beforeeach test, before all means its a general code and we can put in before all like local host is same for all test. so we can put local hose in beforeall or before each. its per our wish
test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200/')//this both will execute for each test
   // await page.getByText('Forms').click()
})

test.afterEach(async({page})=>{
    await page.getByText('Extra Components').click()
})
/* test('test one', async({page}) =>{
   await page.getByText('Form Layouts').click() 
})

test('test one2', async({page}) =>{
    await page.getByText('Datepicker').click() 
})*/
 //if we use any hooks inside describe then those code will be only for describe block
test.describe('forms', ()=>{
    test.beforeEach(async({page})=>{//this before each will olt work for this particular describe
     await page.locator(':text-is("Forms")').click() //this will applicable this describe only
    })

    test('forms layout', async({page})=>{
        await page.getByText('Form Layouts').click() 
    })

    test('Date Picker', async({page})=>{
        await page.getByText('Datepicker').click() 
    })
})