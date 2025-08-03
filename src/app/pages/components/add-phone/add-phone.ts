import { Component, inject, Injector, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { DataService } from '../../shared/services/data';

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
  advInfo: { name: string; image: string; description: string }[] | null = null;
  basicInfo:
    | {
        id: number;
        price: number;
        stock: number;
        brand_id: number;
        discount: number;
        shipping: boolean;
        seller_id: number;
      }[]
    | null = null;
  specs: { name: string; value: string }[] | null = null;

  error_text: string = '';
  show_error: boolean = false;
  fullData: { [key: string]: any } = {};
  btn_text: string = 'add';
  selectedToUpdate: number | null = null;

  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private product: ProductService = inject(ProductService);
  private messageService: MessageService = inject(MessageService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private data: DataService = inject(DataService);

  NewPhoneForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.btn_text = 'add';
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
      seller: [''],
      brand: [''],
      shipping: [''],
    });

    //=========================
    this.route.queryParams.subscribe((params) => {
      const phoneId = params['id'];
      this.selectedToUpdate = phoneId;
      if (phoneId) {
        const model = { phoneId };
        this.btn_text = 'update';
        this.data.getDetails(model).subscribe({
          next: (details) => {
            const data = details[0];
            if (data.advinfo.length) {
              this.advInfo = data.advinfo.map((i: any) => ({
                name: i.name,
                image: i.image,
                description: i.description,
              }));
            }
            if (data.specifications.length) {
              this.specs = data.specifications.map((i: any) => ({
                name: i.name,
                value: i.value,
              }));
            }
            if (data.basicinfo.length) {
              this.basicInfo = data.basicinfo.map((i: any) => ({
                id: i.id,
                price: i.price,
                stock: i.stock,
                brand_id: i.brand_id,
                discount: i.discount,
                shipping: i.shipping,
                seller_id: i.seller_id,
              }));
            }
          },
          error: (err) => {
            console.error('Error fetching details', err);
          },
        });
      } else {
        this.basicInfo = null;
        this.advInfo = null;
        this.specs = null;
      }
    });
    //============================================
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
      if (
        this.fullData['specification'] &&
        this.fullData['mainImage'] &&
        this.btn_text === 'add'
      ) {
        this.product.addProduct(formData).subscribe({
          next: () => {
            this.messageService.message = 'Successfully added';
            this.backward();
          },
          error: (err) => {
            console.error(err);
          },
        });
      } else if (this.fullData['specification'] && this.btn_text === 'update') {
        this.product.updateProduct(this.selectedToUpdate, formData).subscribe({
          next: () => {
            this.messageService.message = 'Successfully updated';
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
