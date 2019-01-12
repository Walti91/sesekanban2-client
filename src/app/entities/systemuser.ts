import {EnumPosition} from './enum-position.enum';
import {Gender} from './gender.enum';

export class Systemuser {

  id: number;
  position: EnumPosition
  name: string;
  birthday: Date;
  gender: Gender
  telephoneNumber: string;
  email: string;
}
