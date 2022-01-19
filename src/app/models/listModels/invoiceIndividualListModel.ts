import { AdditionalServiceItemListModel } from "./additionalServiceItemListModel";

export interface InvoiceIndividualListModel{
    id:number
    nationalityNo:string
    firstName:string
    lastName:string
    email:string
    rentDate:Date
    returnedDate:Date
    totalPrice:number
    creationDate:Date
    additonalServiceItems: AdditionalServiceItemListModel[]
  
   
}