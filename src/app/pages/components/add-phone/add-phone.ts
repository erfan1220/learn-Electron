import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AdvInfo } from '../adv-info/adv-info';
import { BasicInfo } from '../basic-info/basic-info';
import { Specification } from '../specification/specification';
import { ErrorToast } from '../error-toast/error-toast';
import { ProductService } from '../../shared/services/product';
import { MessageService } from '../../shared/services/message-service';

@Component({
  selector: 'app-add-phone',
  imports: [
    MatIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdvInfo,
    BasicInfo,
    Specification,
    ErrorToast,
  ],
  templateUrl: './add-phone.html',
  styleUrl: './add-phone.css',
})
export class AddPhone {
  @Input() basic: object = {};
  @Input() adv: object = {};
  @Input() specs: object = {};

  error_text: string = '';
  show_error: boolean = false;
  fullData: { [key: string]: any } = {};

  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private product: ProductService = inject(ProductService);
  private messageService: MessageService = inject(MessageService);

  NewPhoneForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.NewPhoneForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      Price: [
        '',
        [Validators.required, Validators.pattern(/^([1-9]\d*)(\.\d{1,2})?$/)],
      ],
      Stock: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      Discount: [
        '',
        [
          Validators.min(0),
          Validators.max(100),
          Validators.pattern(/^[0-9]+$/),
        ],
      ],
    });
  }
  backward() {
    this.router.navigate(['/pages/main-page']);
  }
  onSubmit() {
    if (this.NewPhoneForm.valid) {
      const formData = new FormData();
      for (const key in this.fullData) {
        const value = this.fullData[key];

        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'object') {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      }
      if (this.fullData['specification'] && this.fullData['mainImage']) {
        this.product.addProduct(formData).subscribe({
          next: () => {
            this.messageService.message = 'Successfully added';
            this.backward();
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else if (!this.fullData['specification']) {
        this.show_error = true;
        this.error_text =
          'Please add at least 3 specifications before submitting.';
        setTimeout(() => {
          this.show_error = false;
        }, 3000);
      } else if (!this.fullData['mainImage']) {
        this.show_error = true;
        this.error_text = 'Please insert an image for product.';
        setTimeout(() => {
          this.show_error = false;
        }, 3000);
      }
    } else {
      this.show_error = true;
      this.error_text =
        'Please fill out all required fields correctly before submitting.';
      setTimeout(() => {
        this.show_error = false;
      }, 3000);
    }
  }

  recive_basics(data: { [key: string]: string }) {
    for (const key in data) {
      this.fullData[key] = data[key];
    }
  }
  recive_adv(data: { [key: string]: string | File | null }) {
    for (const key in data) {
      this.fullData[key] = data[key];
    }
  }
  recive_specs(
    data: {
      name: string;
      value: string;
    }[]
  ) {
    this.fullData['specification'] = data;
  }
}
