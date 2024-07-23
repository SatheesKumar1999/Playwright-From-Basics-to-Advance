import {test, expect} from '@playwright/test'
import { PageObjectManager } from '../Page Object Model/pageObjectManager'


test ('Navigating to formslayout', async({page})=>{
   test.slow()
   const pom=new PageObjectManager(page)
   const linkOfBrowser='http://localhost:4200/'
   await pom.navigateTo().browserNavigation(linkOfBrowser)
   await pom.navigateTo().navigationToFormsLayout()
   await pom.parameterized().clickSignininUsingGrid("test@test.com", "test", "Option 1")
   await page.waitForTimeout(2000)
   await pom.navigateTo().navigationToDatePicker()
   await pom.datePicker().selectDateInCommonCalender(3)
   await pom.datePicker().selectDateInRange(3, 10)
   await pom.navigateTo().navigateToModelOverLays()
})