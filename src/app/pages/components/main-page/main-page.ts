import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, MatIcon],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  products = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  hoveredIndex: number = -1;

  private router: Router = inject(Router);
  add_phone() {
    console.log('object');
    this.router.navigate(['/pages/add-phone']);
  }
}
