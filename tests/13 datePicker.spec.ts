import {test, expect} from '@playwright/test'

test('date picker',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click() 
    const dateInputField=page.getByPlaceholder('Form Picker')
    await dateInputField.click()
    //await page.locator('nb-calendar-picker').getByText('14').click()//just we locator data picker and select from that because only one 14 there in the picker
    //await page.locator('[class="day-cell ng-star-inserted"]').getByText('30').click()
    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact:true}).click()
    const dateInputFieldValue=page.getByPlaceholder('Form Picker').textContent()
    await expect(dateInputField).toHaveValue('Jun 1, 2024')
    //expect(dateInputFieldValue).toEqual('Jun 1, 2024')

})

test('date picker smart way in range',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click() 
   
    const dateInputField=page.getByPlaceholder('Range Picker')
    await dateInputField.click()
    let i=1
    while(i<=2){
        
    let date=new Date()
    date.setDate(date.getDate()+6)//440 days added from the currect in date object
    var expectedDate=date.getDate().toString()
    if(i==2){
        date.setDate(date.getDate()+1)//440 days added from the currect in date object
        expectedDate=date.getDate().toString()
    }
    console.log(expectedDate)
    const expectedMonth=date.toLocaleString('En-uS', {month:"short"})
    const expectedFullNameMonth=date.toLocaleString('En-uS', {month:"long"})
    const expectedYear=date.getFullYear()
    const dateToAssert=`${expectedMonth} ${expectedDate}, ${expectedYear}`
    let calenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
    const expectMonthAndYear=` ${expectedFullNameMonth} ${expectedYear}`
    while(!calenderMonthAndYear.includes(expectMonthAndYear)){
        await page.locator('[data-name="chevron-right"]').click()
        calenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="range-cell day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    //await expect(dateInputField).toHaveValue(dateToAssert)
    i++
}
})

test('date picker smart way in common calendar',async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click() 
   
    const dateInputField=page.getByPlaceholder('Form Picker')
    await dateInputField.click()
    let date=new Date()
    date.setDate(date.getDate()+6)//440 days added from the currect in date object
    const expectedDate=date.getDate().toString()
    //console.log(expectedDate)
    const expectedMonth=date.toLocaleString('En-uS', {month:"short"})
    const expectedFullNameMonth=date.toLocaleString('En-uS', {month:"long"})
    const expectedYear=date.getFullYear()
    const dateToAssert=`${expectedMonth} ${expectedDate}, ${expectedYear}`
    let calenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
    const expectMonthAndYear=` ${expectedFullNameMonth} ${expectedYear}`
    while(!calenderMonthAndYear.includes(expectMonthAndYear)){
        await page.locator('[data-name="chevron-right"]').click()
        calenderMonthAndYear=await page.locator('nb-calendar-view-mode').textContent()
    }
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact:true}).click()
    await expect(dateInputField).toHaveValue(dateToAssert)
    

})