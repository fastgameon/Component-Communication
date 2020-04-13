import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    // listFilter: string;
    // showImage: boolean;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    filteredProducts: IProduct[];
    products: IProduct[];

    // ues getter and setter
    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this._listFilter);
    // }
    // if we directly access an element we use viewchild to make it strongly type used type=ElementRef
    // @ViewChild('inputFilter') inputFilterRef: ElementRef;
    // @ViewChild(NgModel) inputFilter: NgModel;
    // listFilter: string;

    parentlistFilter: string;
    includeDetails: boolean = true;
    hitCount: number;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    get showImage(): boolean {
        return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }
    constructor(private productService: ProductService, private productParameterService: ProductParameterService) { }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }
    // initialize view element
    ngAfterViewInit() {
        // console.log(this.inputFilterRef);
        // this.inputFilterRef.nativeElement.focus();
        // this.inputFilter.valueChanges.subscribe(() => {
        //     this.performFilter(this.listFilter);
        // });

        // get child component
        this.parentlistFilter = this.filterComponent.listFilter;
    }
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                // this.performFilter(this.parentlistFilter);
                this.filterComponent.listFilter = this.productParameterService.filterBy;
            },
            (error: any) => this.errorMessage = <any>error
        );
    }
    // use 2 way long binding
    // onFilterChane(filter: string) {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }
    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
