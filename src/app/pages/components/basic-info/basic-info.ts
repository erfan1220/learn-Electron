import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { DataService } from '../../shared/services/data';

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
  @Output() basic = new EventEmitter<{ [key: string]: string }>();

  @Input() basicDetails: object = {};
  ngOnChanges() {
    console.log(
      'BasicInfo input changed:',
      JSON.stringify(this.basicDetails, null, 2)
    );
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['basicDetails'] && this.basicDetails) {
  //     Object.keys(this.basicDetails).forEach((key) => {
  //       if (this.parent.form.get(key)) {
  //         this.parent.form.get(key)?.setValue(this.basicDetails[key]);
  //       }
  //     });
  //   }
  // }

  labels: { ph: string; name: string }[] = [
    { ph: '12.2$', name: 'Price' },
    { ph: '400', name: 'Stock' },
    { ph: '5%', name: 'Discount' },
  ];
  brands: { id: number; name: string }[] = [];
  sellers: { id: number; name: string }[] = [];
  freeShipping: boolean = false;
  basicInfo: { [key: string]: string } = {};

  public parent: FormGroupDirective = inject(FormGroupDirective);
  private data: DataService = inject(DataService);

  ngOnInit() {
    this.data.getBrands().subscribe({
      next: (data) => {
        this.brands = data;
      },
    });

    this.data.getSellers().subscribe({
      next: (data) => {
        this.sellers = data;
      },
    });

    this.DefaultValues();
  }

  shipping() {
    this.freeShipping = !this.freeShipping;
    this.basicInfo['freeShipping'] = String(this.freeShipping);
    this.emitData();
  }
  onInput(event: Event, name: string) {
    const value = (event.target as HTMLInputElement).value;
    this.basicInfo[name] = value;
    this.emitData();
  }
  onChange(event: Event, index: number) {
    const value = (event.target as HTMLSelectElement).value;
    index == 0
      ? (this.basicInfo['Brand'] = value)
      : (this.basicInfo['Seller'] = value);
    this.emitData();
  }

  DefaultValues() {
    this.basicInfo['Brand'] = '1';
    this.basicInfo['Seller'] = '1';
    this.basicInfo['Discount'] = '0';
    this.basicInfo['freeShipping'] = 'false';
    this.emitData();
  }

  emitData() {
    this.basic.emit(this.basicInfo);
  }

  handleKeyPress(event: KeyboardEvent, label: string) {
    if (label === 'Price') {
      const allowedkeys = ['Enter', 'Backespace', '.'];
      const charCode = event.key;
      if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
        event.preventDefault();
      }
    } else {
      const allowedkeys = ['Enter', 'Backespace'];
      const charCode = event.key;
      if (!/^[0-9]$/.test(charCode) && !allowedkeys.includes(charCode)) {
        event.preventDefault();
      }
    }
  }
}
