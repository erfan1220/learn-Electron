import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MessageService } from '../../shared/services/message-service';
import { Modal } from '../modal/modal';
import { ErrorToast } from '../error-toast/error-toast';
import { DataService } from '../../shared/services/data';
import { Product } from '../../shared/types/product';
import { Loading } from '../loading/loading';
import { ProductService } from '../../shared/services/product';

@Component({
  selector: 'app-main-page',
  imports: [CommonModule, MatIcon, Modal, ErrorToast, Loading],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage {
  products: Product[] = [];
  hoveredIndex: number = -1;
  show_error: boolean = false;
  error_text: string = '';
  error_color: string = '';
  selectedProductToDelete: number | null = null;
  modal_open = false;
  loading: boolean = true;

  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private data: DataService = inject(DataService);
  private ps: ProductService = inject(ProductService);

  add_phone() {
    this.router.navigate(['/pages/add-phone']);
  }
  loadProducts() {
    this.data.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.products.forEach((p) => {
          if (p.image_url) {
            p.image_url = `http://localhost:5000/uploads/${p.image_url}`;
            p.newPrice = String(
              (
                Number(p.price) -
                Number(p.price) * (Number(p.discount) / 100)
              ).toFixed(2)
            );
          }
        });
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit() {
    this.loadProducts();
    if (this.messageService.message) {
      this.show_error = true;
      this.error_color = '#33CB56';
      this.error_text = this.messageService.message;
      setTimeout(() => {
        this.show_error = false;
        this.messageService.message = null;
      }, 3000);
    }
  }

  onDelete() {
    this.ps.deleteProduct(this.selectedProductToDelete).subscribe({
      next: () => {
        this.closeModal();
        this.products = [];
        this.loadProducts();
        this.show_error = true;
        this.error_color = '#33CB56';
        this.error_text = 'Product has been successfully deleted';
        setTimeout(() => {
          this.show_error = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Could not delete product', err);
      },
    });
  }

  closeModal() {
    this.selectedProductToDelete = null;
    this.modal_open = false;
  }

  confirmDeleteProduct(id: number) {
    this.modal_open = true;
    this.selectedProductToDelete = id;
  }

  update(id: number) {
    this.router.navigate(['/pages/update'], { queryParams: { id: id } });
  }
}
