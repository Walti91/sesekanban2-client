import {BillDetail} from './bill-detail';

export class Payment {

  id: number;
  value: number;
  timestamp: Date;
  isEmailSent: boolean;
  bill: BillDetail;
}
