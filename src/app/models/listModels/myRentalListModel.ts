export interface MyRentalListModel{
    id:number
    brandName:string
    carName:string
    rentDate:Date
    returnDate:Date
    pickUpCityName:string
    returnCityName:string
    totalPayment:number
    isInvoiceCreated:boolean
    isRentalFinished:boolean
}
