import {BillDetail} from './bill-detail';

export class Reminder {
  id: number;
  timestamp: Date;
  isEmailSent: boolean;
  bill: BillDetail;
}
