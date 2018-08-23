
import {Language} from './language.model';
import {User} from './user.model';

export class DeveloperView {
  reference: string;
  firstname: string;
  lastname: string;
  stage: string;
  manager: User;
  rh: User;
  note: string;
  availability: Date;
  gender: string;
  mobility: string;
  createdDate: Date;
  modifiedDate: Date;
  placeOfBirth: string;
  birthDate: Date;
  nationality: string;
  socialSecurityNumber: string;
  familySituation: string;
  title: string;
  languages: string;
  qualifications: string[];
  experience: string;
  formation: string;
  email1: string;
  email2: string;
  email3: string;
  tel1: string;
  tel2: string;
  tel3: string;
  fax: string;
  address: string;
  npa: string;
  city: string;
  country: string;
}
