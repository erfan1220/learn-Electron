import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  imports: [CommonModule],
  templateUrl: './error-message.html',
  styleUrl: './error-message.css',
})
export class ErrorMessage {
  @Input() control!: AbstractControl | null;
  @Input() fieldName = 'Field';

  getErrorMessage(): string {
    if (!this.control || !this.control.errors) return '';

    if (this.control.errors['required']) {
      return `${this.fieldName} is required.`;
    }
    if (this.control.errors['minlength']) {
      const requiredLength = this.control.errors['minlength'].requiredLength;
      return `${this.fieldName} must be at least ${requiredLength} characters long.`;
    }
    if (this.control.errors['maxlength']) {
      const requiredLength = this.control.errors['maxlength'].requiredLength;
      return `${this.fieldName} must be at most ${requiredLength} characters long.`;
    }
    if (this.control.errors['pattern']) {
      return `${this.fieldName} has an invalid format.`;
    }
    if (this.control.errors['min']) {
      return `${this.fieldName} must be greater than or equal to ${this.control.errors['min'].min}.`;
    }
    if (this.control.errors['max']) {
      return `${this.fieldName} must be less than or equal to ${this.control.errors['max'].max}.`;
    }

    return `Invalid ${this.fieldName}.`;
  }
}
