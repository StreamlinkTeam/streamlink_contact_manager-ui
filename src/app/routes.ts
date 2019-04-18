import {ActionTableComponent} from './action/action-table.component';
import {NeedComponent} from './need/need.component';
import {NeedEditorComponent} from './need/need-editor.component';
import {NeedTableComponent} from './need/need-table.component';
import {Routes} from '@angular/router';
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
import {UserTableComponent} from './users/users-table.component';
import {UserEditorComponent} from './users/users-editor.component';
import {ProfilComponent} from './profil/profil.component';
import {ProfilPasswordEditorComponent} from './profil/profil-password-editor.component';
import {ResourceTableComponent} from './resource/resource-table.component';
import {ResourceEditorComponent} from './resource/resource-editor.component';
import {ProjectTableComponent} from './project/project-table.component';
import {ProjectEditorComponent} from './project/project-editor.component';
import {PositioningTableComponent} from './positioning/positioning-table.component';
import {PositioningAddComponent} from './positioning-add/positioning-add.component';
import {PositioningEditComponent} from './positioning-edit/positioning-edit.component';
import {ProjectInfoEditorComponent} from './project/project-info-editor.component';

export const appRoutes: Routes = [
  {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
  {
    path: 'profil', component: ProfilComponent, canActivate: [AuthGuard],
    children: [
      {path: 'general', component: UserEditorComponent},
      {path: 'changepassword', component: ProfilPasswordEditorComponent},
      {path: '**', redirectTo: 'general'}
    ]
  },

  {path: 'actions', component: ActionTableComponent, canActivate: [AuthGuard]},

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
  {path: 'positionings', component: PositioningTableComponent, canActivate: [AuthGuard]},
  {path: 'positionings/create', component: PositioningAddComponent, canActivate: [AuthGuard]},
  {path: 'positionings/:error', component: PositioningTableComponent, canActivate: [AuthGuard]},
  {
    path: 'positionings/edit/:reference', component: PositioningEditComponent, canActivate: [AuthGuard],
    // path: 'positionings/:mode/:reference', component: PositioningAddComponent, canActivate: [AuthGuard],
    // children: [
    // {path: 'positionings/edit', component: PositioningAddComponent},
    // {path: 'general', component: PositioningAddComponent},
    // {path: 'action', component: ActionEditorComponent},
    // {path: '**', redirectTo: 'general'}
    // ]
  },
  {path: 'projects', component: ProjectTableComponent, canActivate: [AuthGuard]},
  {path: 'projects/create', component: ProjectEditorComponent, canActivate: [AuthGuard]},
  {path: 'projects/:error', component: ProjectTableComponent, canActivate: [AuthGuard]},
  {path: 'projects/edit/:reference', component: ProjectInfoEditorComponent, canActivate: [AuthGuard]},
  // {
  //   path: 'projects/:mode/:reference', component: ProjectComponent, canActivate: [AuthGuard],
  //   children: [
  //     {path: 'general', component: ProjectEditorComponent},
  //     {path: 'action', component: ActionEditorComponent},
  //     {path: '**', redirectTo: 'general'}
  //   ]
  // },

  {path: 'needs', component: NeedTableComponent, canActivate: [AuthGuard]},
  {path: 'needs/create', component: NeedEditorComponent, canActivate: [AuthGuard]},
  {path: 'needs/:error', component: NeedTableComponent, canActivate: [AuthGuard]},
  {
    path: 'needs/:mode/:reference', component: NeedComponent, canActivate: [AuthGuard],
    children: [
      {path: 'general', component: NeedEditorComponent},
      {path: 'action', component: ActionEditorComponent},
      {path: '**', redirectTo: 'general'}
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
  {path: 'resources', component: ResourceTableComponent, canActivate: [AuthGuard]},
  {path: 'resources/create', component: ResourceEditorComponent, canActivate: [AuthGuard]},
  {path: 'resources/:error', component: ResourceTableComponent, canActivate: [AuthGuard]},
  {
    path: 'resources/:mode/:reference', component: DeveloperComponent, canActivate: [AuthGuard],
    children: [
      {path: 'general', component: ResourceEditorComponent},
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
