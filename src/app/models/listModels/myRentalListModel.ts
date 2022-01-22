export interface MyRentalListModel{
    rentalId:number
    brandName:string
    carName:string
    rentDate:Date
    returnDate:Date
    pickUpCityName:string
    returnCityName:string
    totalPayment:number
    invoiceCreated:boolean
    rentalFinished:boolean
}
