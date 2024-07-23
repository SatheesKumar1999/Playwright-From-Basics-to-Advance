import { Page } from "@playwright/test";
import { NavigationPage } from "./navigationPage";

export class ParameterizedMethods extends NavigationPage{
   
   // readonly page: Page
    constructor(page:Page){
        super(page)
    }

    async clickSignininUsingGrid(emailId:string, password:string, openText: string){
        const usingGrid=this.page.locator('nb-card', {hasText:'Option 1'})
        await usingGrid.getByRole('textbox', {name:'Email'}).fill(emailId)
        await usingGrid.getByRole('textbox', {name:'Password'}).fill(password)
        await this.waitForSomeTime(5)
        await usingGrid.getByRole('radio', {name:openText}).click({force:true})
        await usingGrid.getByText('Sign in').click()
    }

    async inLineForm(name:string, email:string, checkBoxValue: boolean){
        const usingGrid=this.page.locator('nb-card', {hasText:'Inline Form'})
        await usingGrid.getByRole('textbox', {name:'Jane Doe'}).fill(name)
        await usingGrid.getByRole('textbox', {name:'Email'}).fill(email)
        if(checkBoxValue){
            await usingGrid.getByRole('checkbox').click({force:true})
            await usingGrid.getByText('Submit').click()
        }
    }
}