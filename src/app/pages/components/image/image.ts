import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { ErrorToast } from '../error-toast/error-toast';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image',
  imports: [CommonModule, MatIcon, ErrorToast,FormsModule],
  templateUrl: './image.html',
  styleUrl: './image.css',
})
export class Image {
  @Output() fileChosen = new EventEmitter<File | null>();
  @Input() image_src: string | null = null;
  selectedImage: string = '';
  maxSizeKB: number = 30;
  mainImage: File | null = null;
  show_error: boolean = false;
  error_text: string = '';

  ngOnChanges() {
    if (this.image_src) {
      this.selectedImage = `http://localhost:5000/uploads/${this.image_src}`;
    }
    this.emitImage()
  }

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
