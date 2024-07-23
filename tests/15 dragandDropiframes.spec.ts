import {test, expect} from '@playwright/test'
test('drag and drop', async({page})=>{
    test.slow()
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop')
    const frame= page.frameLocator('[rel-title="Photo Manager"] iframe')//locating frame. becuase this dropdron boxes in under frames
    await frame.locator(':text-is("High Tatras")').dragTo(frame.locator('#trash'))//1st is to locate which one should be drag and 2nd is locating where to drop
    await frame.locator('li', {hasText:"High Tatras 2"}).dragTo(frame.locator('#trash'))

    //most precise method
    await frame.locator('li', {hasText:"High Tatras 3"}).hover()//just hover over the element
    await page.mouse.down()//starting the movement
    await frame.locator('#trash').hover()///hover over to drop location
    await page.mouse.up()//release the movement , so that element will drop in the drop location
    await expect(frame.locator('#trash li h5')).toHaveText(["High Tatras", "High Tatras 2", "High Tatras 3"])
})