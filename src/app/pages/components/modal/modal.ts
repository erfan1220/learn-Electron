import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, MatIcon],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  @Input() open = false;
  @Input() title = '';
  @Input() width = '';
  @Input() height = '';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();
}
