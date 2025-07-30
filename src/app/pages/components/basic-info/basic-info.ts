import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorMessage } from "../error-message/error-message";

@Component({
  selector: 'app-basic-info',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ErrorMessage],
  templateUrl: './basic-info.html',
  styleUrl: './basic-info.css',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class BasicInfo {
  labels: { ph: string; name: string }[] = [
    { ph: '12.2$', name: 'Price' },
    { ph: '400', name: 'Stock' },
    { ph: '5%', name: 'Discount' },
  ];
  freeShipping: boolean = false;

  public parent: FormGroupDirective = inject(FormGroupDirective);

  // brands: { brands_id: number; name: string }[] = [];
  brands: { brands_id: number; name: string }[] = [
    { brands_id: 1, name: 'Apple' },
    { brands_id: 2, name: 'Samsung' },
    { brands_id: 3, name: 'Xiaomi' },
    { brands_id: 4, name: 'OnePlus' },
    { brands_id: 5, name: 'Google' },
    { brands_id: 6, name: 'Huawei' },
  ];

  onlyNumber(event: KeyboardEvent) {
    const allowedkeys = ['Enter', 'Backespace'];
    const charCode = event.key;
    if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
      event.preventDefault();
    }
  }

  shipping(){
    this.freeShipping = !this.freeShipping;
    console.log(this.freeShipping);
  }
}
