import { Component, inject } from '@angular/core';
import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { ErrorMessage } from "../error-message/error-message";

@Component({
  selector: 'app-adv-info',
  imports: [MatIcon, ReactiveFormsModule, ErrorMessage],
  templateUrl: './adv-info.html',
  styleUrl: './adv-info.css',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AdvInfo {
  public parent: FormGroupDirective = inject(FormGroupDirective);
}
