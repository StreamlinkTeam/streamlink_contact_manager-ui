
import {Contact} from './contact.model';
import {PersonalInformation} from './personal-information.model';
import {SkillsInformation} from './skills-information.model';
import {User} from './user.model';

export class DeveloperResponse {
  reference: number;
  firstname: string;
  lastname: string;
  stage: string;
  manager: User;
  rh: User;
  note: string;
  availability: Date;
  mobility: string;
  createdDate: Date;
  modifiedDate: Date;
  personalInformation: PersonalInformation;
  skillsInformation: SkillsInformation;
  contact: Contact;

}
