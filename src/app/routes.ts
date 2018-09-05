import {Routes} from '@angular/router'
import {AuthGuard, LoginGuard} from './auth/auth.guard';
import {AuthComponent} from './auth/auth.component';
import {DeveloperTableComponent} from './developer/developer-table.component';
import {DeveloperCVScannerComponent} from './developer/developer-cv-scanner.component';
import {DeveloperEditorComponent} from './developer/developer-editor.component';
import {DeveloperComponent} from './developer/developer.component';
import {ContactEditorComponent} from './contact/contact-editor.component';
import {SkillsEditorComponent} from './developer/skills-editor.component';
import {PersonalInfoEditorComponent} from './developer/personal-info-editor.component';
import {ContractEditorComponent} from './contract/contract-editor.component';
import {ActionEditorComponent} from './action/action-editor.component';
import {EvaluationEditorComponent} from './evaluation/evaluation-editor.component';
import {SocietyTableComponent} from './society/society-table.component';
import {SocietyEditorComponent} from './society/society-editor.component';
import {SocietyComponent} from './society/society.component';
import {SocietyContactTableComponent} from './society-contact/society-contact-table.component';
import {SocietyContactEditorComponent} from './society-contact/society-contact-editor.component';
import {SocietyContactComponent} from './society-contact/society-contact.component';
import {AdminComponent} from './admin/admin.component';
import {UserTableComponent} from './admin/users/admin.users-table.component';
import {UserEditorComponent} from './admin/users/admin.users-editor.component';

export const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ADMIN']},
    children: [
      {path: 'users', component: UserTableComponent},
      {path: 'users/create', component: UserEditorComponent},
      {path: 'users/:error', component: UserTableComponent},
      {path: 'users/edit/:reference', component: UserEditorComponent},
      {path: '**', redirectTo: 'users'}
    ]
  },
  {path: 'developers', component: DeveloperTableComponent, canActivate: [AuthGuard]},
  {path: 'developers/create/from-cv', component: DeveloperCVScannerComponent, canActivate: [AuthGuard]},
  {path: 'developers/create', component: DeveloperEditorComponent, canActivate: [AuthGuard]},
  {path: 'developers/:error', component: DeveloperTableComponent, canActivate: [AuthGuard]},
  {
    path: 'developers/:mode/:reference', component: DeveloperComponent, canActivate: [AuthGuard],
    children: [
      {path: 'general', component: DeveloperEditorComponent},
      {path: 'contact', component: ContactEditorComponent},
      {path: 'skills', component: SkillsEditorComponent},
      {path: 'personal-info', component: PersonalInfoEditorComponent},
      {path: 'contract', component: ContractEditorComponent},
      {path: 'action', component: ActionEditorComponent},
      {path: 'evaluation', component: EvaluationEditorComponent},
      {path: '**', redirectTo: 'general'}
    ]
  },
  {path: 'societies', component: SocietyTableComponent, canActivate: [AuthGuard]},
  {path: 'societies/create', component: SocietyEditorComponent, canActivate: [AuthGuard]},
  {path: 'societies/:error', component: SocietyTableComponent, canActivate: [AuthGuard]},
  {
    path: 'societies/:mode/:reference', component: SocietyComponent, canActivate: [AuthGuard],
    children: [
      {path: 'general', component: SocietyEditorComponent},
      {path: 'contact', component: ContactEditorComponent},
      {path: 'action', component: ActionEditorComponent},
      {path: 'contacts', component: SocietyContactTableComponent},
      {path: 'contacts/create', component: SocietyContactEditorComponent},
      {path: 'contacts/:error', component: SocietyContactTableComponent},
      {
        path: 'contacts/:mode/:societyContactReference', component: SocietyContactComponent,
        children: [
          {path: 'general', component: SocietyContactEditorComponent},
          {path: 'contact', component: ContactEditorComponent},
          {path: 'action', component: ActionEditorComponent},
          {path: '**', redirectTo: 'general'}
        ]
      },
      {path: '**', redirectTo: 'general'}
    ]
  },
  {path: '**', redirectTo: '/developers'}
];
