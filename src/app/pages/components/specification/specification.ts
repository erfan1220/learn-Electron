import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-specification',
  imports: [CommonModule, FormsModule],
  templateUrl: './specification.html',
  styleUrl: './specification.css',
})
export class Specification {
  @Input() specifications: {
    name: string;
    value: string;
  }[] = [];
  @Input() inspecs:
    | {
        name: string;
        value: string;
      }[]
    | null = null;
  @Output() specs = new EventEmitter<
    {
      name: string;
      value: string;
    }[]
  >();
  show_error: boolean = false;
  error_text: string = '';

  ngOnChanges() {
    if (this.inspecs) {
      this.specifications = this.inspecs;
    }
    this.emitData()
  }

  addSpecification() {
    this.specifications.push({
      name: '',
      value: '',
    });
  }

  onValueChange(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.specifications[index].value = value;
    this.emitData();
  }

  onNameChange(index: number, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.specifications[index].name = value;
    this.emitData();
  }

  emitData() {
    const cleaned = this.specifications
      .filter((s) => s.name && s.value)
      .map((s) => ({
        name: s.name,
        value: s.value,
      }));
    if (cleaned.length >= 3) {
      this.specs.emit(cleaned);
    }
  }
}
