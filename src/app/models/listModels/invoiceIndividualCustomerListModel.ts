import { AdditionalServiceItemListModel } from './additionalServiceItemListModel';

export interface InvoiceIndividualCustomerListModel {
  id: number;
  nationalityNo: string;
  firstName: string;
  lastName: string;
  email: string;
  rentDate: Date;
  returnedDate: Date;
  totalPrice: number;
  creationDate: Date;
  rentPrice: number;
  additionalServiceItems: AdditionalServiceItemListModel[];
}
