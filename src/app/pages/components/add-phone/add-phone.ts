import { Component, inject } from '@angular/core';
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
import { min } from 'rxjs';

@Component({
  selector: 'app-add-phone',
  imports: [
    MatIcon,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdvInfo,
    BasicInfo,
  ],
  templateUrl: './add-phone.html',
  styleUrl: './add-phone.css',
})
export class AddPhone {
  private router: Router = inject(Router);
  private formBuilder: FormBuilder = inject(FormBuilder);
  error_text: string = '';
  show_error: boolean = false;

  NewPhoneForm: FormGroup = new FormGroup({});
  ngOnInit() {
    this.NewPhoneForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      Description: ['', [Validators.required, Validators.minLength(10)]],
      image: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/),
        ],
      ],
      Price: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      Stock: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      Discount: ['', [Validators.min(0), Validators.max(100)]],
    });
  }
  backward() {
    this.router.navigate(['/pages/main-page']);
  }
  onSubmit() {
    if (this.NewPhoneForm.valid) {
      console.log('yes');
    } else {
      // this.error_text ="" 
      // this.show_error = true;
      // setTimeout(() => {
      //   this.show_error = false;
      // }, 5000);
      // console.log('no');
    }
  }
}
