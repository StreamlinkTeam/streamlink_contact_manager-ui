import {Component, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.css']
})
export class FieldErrorDisplayComponent {

  @Input() displayError: boolean;
  @Input() errorMessage;

  @Input() model: NgModel;
  @Input() fieldName: string;


  getValidationMessages() {

    let thing: string = this.fieldName || this.model.name;
    let messages: string[] = [];
    if (this.model.errors) {
      for (let errorName in this.model.errors) {
        switch (errorName) {
          case 'email':
            messages.push(`L'entée ${thing} doit avoir une format email valide`);
            break;
          case 'required':
            messages.push(`L'entée ${thing} est requise`);
            break;
          case 'minlength':
            messages.push(`L'entrée ${thing} doit avoir au minimum 
      ${this.model.errors['minlength'].requiredLength} characters`);
            break;
          case 'maxlength':
            messages.push(`L'entrée ${thing} doit avoir au maximum 
      ${this.model.errors['minlength'].requiredLength} characters`);
            break;
          case 'pattern':
            messages.push(`L'entré ${thing} contient des characters illégaux`);
            break;
        }
      }
    }
    return messages;
  }


}
