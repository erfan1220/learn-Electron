import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  output,
} from '@angular/core';
import {
  ControlContainer,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ErrorMessage } from '../error-message/error-message';
import { CommonModule } from '@angular/common';
import { Image } from '../image/image';

@Component({
  selector: 'app-adv-info',
  imports: [ReactiveFormsModule, ErrorMessage, CommonModule, Image],
  templateUrl: './adv-info.html',
  styleUrl: './adv-info.css',
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})
export class AdvInfo {
  @Output() adv = new EventEmitter<{ [key: string]: string | File | null }>();
  @Input() advDetails:
    | { name: string; image: string; description: string }[]
    | null = null;

  advInfo: { [key: string]: string | File | null } = {};

  ngOnChanges() {
    if (this.advDetails) {
      this.advInfo['name'] = this.advDetails[0].name;
      this.advInfo['Description'] = this.advDetails[0].description;
      this.emitData();
    }
  }

  public parent: FormGroupDirective = inject(FormGroupDirective);

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.advInfo['name'] = value;
    this.emitData();
  }
  onTextarea(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    this.advInfo['Description'] = value;
    this.emitData();
  }
  reciveImage(file: File | null) {
    this.advInfo['mainImage'] = file;
    this.emitData();
  }

  emitData() {
    this.adv.emit(this.advInfo);
  }
}
