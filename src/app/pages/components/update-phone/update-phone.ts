import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/services/data';
import { AddPhone } from '../add-phone/add-phone';

@Component({
  selector: 'app-update-phone',
  imports: [AddPhone],
  templateUrl: './update-phone.html',
  styleUrl: './update-phone.css',
})
export class UpdatePhone {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private data: DataService = inject(DataService);
  adv: object = {};
  basic: object = {};
  specs: object = {};

  backward() {
    this.router.navigate(['/pages/main-page']);
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const phoneId = params['id'];
      if (phoneId) {
        const model = { phoneId };
        this.data.getDetails(model).subscribe({
          next: (details) => {
            const formatted = details.map((item: any) => {
              return {
                advInfo: {
                  name: String(item.name),
                  image_url: String(item.image_url),
                  description: String(item.description),
                },
                specifications: item.specifications,
                basicInfo: {
                  price: String(item.price),
                  stock: String(item.stock),
                  freeShipping: String(item.free_shipping),
                  discount: String(item.discount),
                  brand: String(item.brand_id),
                  seller: String(item.seller_id),
                },
              };
            });
            this.adv = formatted[0].advInfo;
            this.basic = formatted[0].basicInfo;
            this.specs = formatted[0].specifications;
          },
          error: (err) => {
            console.error('Error fetching details', err);
          },
        });
      }
    });
  }
}
