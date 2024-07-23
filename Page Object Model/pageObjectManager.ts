import {NavigationPage} from '../Page Object Model/navigationPage'
import{ParameterizedMethods} from '../Page Object Model/paraMeterizedMethod'
import { DatePickerPage } from '../Page Object Model/datePickerpage'
import { Page } from '@playwright/test'


export class PageObjectManager{

    private readonly page:Page
    private readonly navigationPage:NavigationPage
    private readonly parameterizedMethods:ParameterizedMethods
    private readonly datePickerPage:DatePickerPage

    constructor(page:Page){
        this.page=page
        this.navigationPage=new NavigationPage(this.page)
        this.parameterizedMethods=new ParameterizedMethods(this.page)
        this.datePickerPage=new DatePickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    parameterized(){
        return this.parameterizedMethods
    }

    datePicker(){
       return this.datePickerPage
    }

}