import {
  booleanAttribute,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { ErrorMessage } from '../error-message/error-message';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ErrorToast } from '../error-toast/error-toast';

@Component({
  selector: 'app-image',
  imports: [CommonModule, MatIcon, ErrorToast],
  templateUrl: './image.html',
  styleUrl: './image.css',
})
export class Image {
  @Output() fileChosen = new EventEmitter<File | null>();
  selectedImage: string = '';
  maxSizeKB: number = 30;
  mainImage: File | null = null;
  show_error: boolean = false;
  error_text: string = '';
  onFileSelected(event: Event) {
    const maxSizeBytes = this.maxSizeKB * 1024;
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      if (file.size > maxSizeBytes) {
        this.show_error = true;
        this.error_text = `File "${file.name}" is too large (max ${this.maxSizeKB} KB).`;
        setTimeout(() => {
          this.show_error = false;
        }, 3000);
        // alert(`File "${file.name}" is too large (max ${this.maxSizeKB} KB).`);
        return;
      }
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.selectedImage = e.target?.result);
      reader.readAsDataURL(file);
      this.mainImage = file;
      this.emitImage();
    }
  }

  emitImage() {
    this.fileChosen.emit(this.mainImage);
  }

  removeImage() {
    this.mainImage = null;
    this.selectedImage = '';
    this.emitImage();
  }
}
