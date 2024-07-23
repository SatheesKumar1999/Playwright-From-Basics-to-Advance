import {test, expect} from '@playwright/test'
/*test.beforeEach(async({page})=>{   
    await page.goto('http://localhost:4200/')
   })*/
   //get the row by any text in the row
   test('web tables', async({page})=>{
    const tempGauge= page.locator('[tabtitle="Temperature"] g circle')
    await tempGauge.evaluate(node=>{
        node.setAttribute('cx', '269.879')
        node.setAttribute('cy', '122.901')
    })
    await tempGauge.click()

   /* const tempBox= page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()
    const box=await tempBox.boundingBox()
    const x=box.x//we are setting default bounting value which top left corner of the box
    const y=box.y//
    await page.mouse.move(x,y)
    await page.mouse.down()
  //  await page.mouse.move(x+50, y)
    await page.mouse.move(x+200, y+300)
    await page.mouse.up()*/
   })

   