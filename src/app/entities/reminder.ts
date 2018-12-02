import {BillDetail} from './bill-detail';

export class Reminder {
  id: number;
  timestamp: Date;
  emailSent: boolean;
  bill: BillDetail;
}
