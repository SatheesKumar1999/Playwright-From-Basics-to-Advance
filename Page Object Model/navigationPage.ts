import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

// readonly page:Page //commant this because of extends
    constructor(page:Page){
     super(page)
    }
    async browserNavigation(link: string){
        await this.page.goto(link)
    }
    async navigationToFormsLayout(){
          //  await this.page.getByText('Forms').click()
            this.selectGroupMenuOption("Forms")
            await this.page.getByText('Form Layouts').click() 
    }

    async navigationToDatePicker(){
        //await this.page.getByText('Forms').click()
        this.selectGroupMenuOption("Forms")
      //   await this.waitForSomeTime(2)
        await this.page.getByText('Datepicker').click() 
        }

   async navigateToModelOverLays(){
    this.selectGroupMenuOption("Modal & Overlays")
    await this.page.getByText('Toastr').click()
    const timeOut= this.page.locator('[name="timeout"]')
    await timeOut.clear()
    await timeOut.fill('2000')
    const timeOut1=await timeOut.getAttribute('ng-reflect-model')
    await expect(timeOut).toHaveValue(timeOut1)
    console.log(timeOut1)
    }    


//method to check whether particukular item already expanded or not //it was explained in 47 th lession
    private async selectGroupMenuOption(headingTitle: string){
      const headingTitleOption= this.page.getByTitle(headingTitle)
      const expandValue=await headingTitleOption.getAttribute('aria-expanded') //getting the value of true or false for whether its expand or not already
      if( expandValue == "false"){
        await headingTitleOption.click()//this will excute only when expand is not done
      }
   }
}