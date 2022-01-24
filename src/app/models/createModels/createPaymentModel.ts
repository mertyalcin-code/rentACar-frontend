export interface CreatePaymentModel {
  paymentTime: Date;
  rentalId: number;
  returnDate: Date;
  cardNo: string;
  day: string;
  month: string;
  cvv: string;
}
