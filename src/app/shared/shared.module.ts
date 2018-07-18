import { ActionService } from './services/action.service';
import { DeveloperService } from './services/developer.service';
import { EvaluationService } from './services/evaluation.service';
import { LanguageService } from './services/language.service';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [  ],
  exports: [
    CommonModule,
    RouterModule,

  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ActionService,
        UserService,
        DeveloperService,
        EvaluationService,
        LanguageService
      ]
    };
  }
}
