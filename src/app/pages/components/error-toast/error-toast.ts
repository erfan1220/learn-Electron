import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-toast',
  imports: [CommonModule],
  templateUrl: './error-toast.html',
  styleUrl: './error-toast.css',
})
export class ErrorToast {
  @Input() show = false;
  @Input() error_text = '';
  @Input() bg_color = '';
}
