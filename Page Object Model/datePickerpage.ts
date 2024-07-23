import { Page, expect } from "@playwright/test";
import { constants } from "fs";
import { NavigationPage } from "./navigationPage";


export class DatePickerPage {

    readonly page:Page

    constructor(page:Page){
        this.page=page
    }

//method to select date in a calender
    async selectDateInCommonCalender(numberOfDaysfromToday:number){
        const dateInputField=this.page.getByPlaceholder('Form Picker')
        await dateInputField.click()
        const dateToAsset=await this.selectDateinCalender(numberOfDaysfromToday)
        await expect(dateInputField).toHaveValue(dateToAsset)
    }
//method to select dates in the range
    async selectDateInRange(numberOfDaysFromNowForStartDate:number, numberOfDaysFromNowForEndDate:number){
        const dateInputField=this.page.getByPlaceholder('Range Picker')
        await dateInputField.click()
        const calenderStartDate= await this.selectDateinCalender(numberOfDaysFromNowForStartDate)
       const calenderEndDate= await this.selectDateinCalender(numberOfDaysFromNowForEndDate)
        const dateToAsset=`${calenderStartDate} - ${calenderEndDate}`
        await expect(dateInputField).toHaveValue(dateToAsset)
    }

    //common method to select date in a calender
    private async selectDateinCalender(numberOfDaysfromToday: number){
        
        let date=new Date()
        date.setDate(date.getDate()+numberOfDaysfromToday)//440 days added from the currect in date object
        const expectedDate=date.getDate().toString()
        const expectedMonth=date.toLocaleString('En-uS', {month:"short"})
        const expectedFullNameMonth=date.toLocaleString('En-uS', {month:"long"})
        const expectedYear=date.getFullYear()
        const dateToAssert=`${expectedMonth} ${expectedDate}, ${expectedYear}`
        let calenderMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent()
        const expectMonthAndYear=` ${expectedFullNameMonth} ${expectedYear}`
        while(!calenderMonthAndYear.includes(expectMonthAndYear)){
            await this.page.locator('[data-name="chevron-right"]').click()
            calenderMonthAndYear=await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(expectedDate, {exact:true}).click()
        return dateToAssert //just did this because we want to have dateToAssert value when we invoke this method to another
    }
}