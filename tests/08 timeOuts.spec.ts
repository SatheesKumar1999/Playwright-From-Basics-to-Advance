//we have multiple timeout. 1)global(No default), 2)test(30000), following 3 should not morethan test timeout 3)action(ND), 4)navigation(ND), 5)expected(5000)
//globalTimeout:, timeout:,actionTimeout:,navigationTimeout:, expect{ timeout:}
import {test, expect} from '@playwright/test'

test.beforeEach('Open applicatioj',async ({page}, testInfo)=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 4000)//it will create 2000(2 sec) fro each tests
})

test('timeout', async({page})=>{
    //test.setTimeout(20000)//we can override test timeout for this particular test by using this.
    //test.slow()//it will make test time to *3
    const suceessMsg=  page.locator('.bg-success')
    const text=await suceessMsg.textContent({timeout:7000})//just i override the time with 17000(its less than test time out(test timeout manually overrided with 40000 at this time)). manually i updated action timeout to 5000 so that i overrideded action time(15000 is the time to show-up the required text)
    console.log(text)
    
    //await expect(suceessMsg).toHaveText('Data loaded with AJAX get request.')
    })
    
    test('alternative Auto waiting', async({page})=>{
        const suceessMsg=  page.locator('.bg-success') 
        
       const getText=await suceessMsg.allTextContents()
       expect(getText).toContain('Data loaded with AJAX get request.')
       console.log(getText)
       
    })