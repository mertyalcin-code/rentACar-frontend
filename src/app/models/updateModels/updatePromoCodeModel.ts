export interface UpdatePromoCodeModel {
  id: number;
  discountRate: number;
  startDate: Date;
  endDate: Date;
  description: string;
  code: string;
}
