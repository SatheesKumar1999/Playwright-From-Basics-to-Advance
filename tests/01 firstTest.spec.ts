import {test} from '@playwright/test'


test('test one', async({page}) =>{
    await page.goto('https://www.amazon.in')
    await page.getByText('Mobiles').click() //clicking form layout in form
   // await page.locator('ul li [dir="auto"]:text-is("Made for Amazon")').click()
   // await page.locator('ul li :text-is("Smartwatches")').click()
    //await page.locator('[aria-label="Search Amazon.in"]').fill('Watch')
    // await page.getByText('Mobile Accessories').click()
})

//sathees0002, Satheesgithub@1234