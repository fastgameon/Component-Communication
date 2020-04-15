import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { IProduct } from '../product';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'pm-product-shell-detail',
    templateUrl: './product-shell-detail.component.html'
})
export class ProductShellDetailComponent implements OnInit, OnDestroy {
    pageTitle: string = 'Product Detail';
    // this will not work for change detection
    // product=this.productService.currentProduct;
    // For change detection we use getter to get current value
    // get product(): IProduct | null {
    //     return this.productService.currentProduct;
    // }
    product: IProduct | null;
    sub: Subscription;
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChaange$.subscribe(selectedProduct => {
            this.product = selectedProduct;
        });
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
