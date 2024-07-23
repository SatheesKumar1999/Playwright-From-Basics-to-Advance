import {test, expect} from '@playwright/test'

//test.describe.configure({mode:'parallel'})--- this code is used to run a test parallely

test.beforeEach(async({page})=>{   // we can enter  'value' in beforeeach as per out wish
    await page.goto('http://localhost:4200/')
   })

test('Check Box', async({page})=>{
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click() 

    await page.getByRole('checkbox', {name:'Hide on click'}).click({force:true})
    await page.screenshot({path:"screenShot/checkBox.png"})
    await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force:true})
    
//all check boxs are checked at the same time by using for loop
    const allBox= page.getByRole('checkbox')
    for(const box of await allBox.all()){  //.all() this will get all the chkbox and arrange it in array. This for loop basically used to iterate each value in the array.
        await box.check({force:true})
    }
})
   //for Check Boxes, Click() method will perform only click action, but Check() will first look for status of the box. if already chk box is chked then no action will perform though test will passed. so we have to use uncheck() when chk box is already chked and viseversa.

test('List and DropDown', async({page})=>{
    test.slow()
        const DropDown= page.locator('ngx-header nb-select')//locating the drop down
        await DropDown.click()
      // const options= page.locator('ul nb-option[ng-reflect-value="cosmic"]')//locating the required option in the list
     //  await options.click()
     const options= page.locator('nb-option-list nb-option')//locating options
     await expect(options).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
      await options.filter({hasText:'Cosmic'}).click()//from  the options, we are selecting cosmic
     await DropDown.click()//just clicking the dropdown again to fetch all text as below
     const option=await page.locator('nb-option-list').textContent()//fetching the text from the list
     console.log(option)
     const header=page.locator('nb-layout-header')
     await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')//to chk backround color

     const Colors={
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
     }
     
     for(const color in Colors){
        await options.filter({hasText:color}).click()
        await expect(header).toHaveCSS('background-color', Colors[color] )
        if(color!='Corporate'){ //just putting this because we want to perform loop till corporate.
          await DropDown.click()  
        }
     }
})