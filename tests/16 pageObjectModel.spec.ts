import {test, expect} from '@playwright/test'
import {NavigationPage} from '../Page Object Model/navigationPage'//importing necessary class from other folder
import{ParameterizedMethods} from '../Page Object Model/paraMeterizedMethod'
import { DatePickerPage } from '../Page Object Model/datePickerpage'
import{faker} from '@faker-js/faker'

test ('Navigating to formslayout', async({page})=>{
   test.slow()
   const navigateTO = new NavigationPage(page)
   const parameterized= new ParameterizedMethods(page)
   const datePicker=new DatePickerPage(page)
   const linkOfBrowser='http://localhost:4200/'
   await navigateTO.browserNavigation(linkOfBrowser)
   await navigateTO.navigationToFormsLayout()
   await parameterized.clickSignininUsingGrid("test@test.com", "test", "Option 1")
   await navigateTO.navigationToDatePicker()
   await datePicker.selectDateInCommonCalender(3)
   await datePicker.selectDateInRange(3,4)
   
})

test('inline form', async({page})=>{
   const navigateTO = new NavigationPage(page)
   const parameterized= new ParameterizedMethods(page)
   const fullName= faker.person.fullName() //this will fetch random name
   const randomEmail=`${fullName.replace(' ','')}${faker.number.int(50)}@gmail.com`
   await navigateTO.browserNavigation('http://localhost:4200/')
   await navigateTO.navigationToFormsLayout()
   await parameterized.inLineForm(fullName, randomEmail, true)
})
