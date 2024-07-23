import { Page } from "@playwright/test";
export class HelperBase{
readonly page:Page
constructor(page:Page){
    this.page=page
}

async waitForSomeTime(timeOut: number){
    await this.page.waitForTimeout(timeOut*1000)
}
}