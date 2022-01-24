import { AdditionalServiceItemListModel } from './additionalServiceItemListModel';
export interface InvoiceCorporateCustomerListModel {
  id: number;
  taxNumber: string;
  companyName: string;
  email: string;
  rentDate: Date;
  returnedDate: Date;
  totalPrice: number;
  creationDate: Date;
  rentPrice: number;
  additionalServiceItems: AdditionalServiceItemListModel[];
}
