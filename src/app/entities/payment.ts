import {BillDetail} from './bill-detail';

export class Payment {

  id: number;
  value: number;
  timestamp: Date;
  emailSent: boolean;
  bill: BillDetail;
}
