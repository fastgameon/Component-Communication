import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable()
export class ProductService {
    private productsUrl = 'api/products';
    private product: IProduct[];
    currentProduct: IProduct | null;
    constructor(private http: HttpClient) { }

    getProducts(): Observable<IProduct[]> {
        // TODO: ADD a experiation logic
        if (this.product) {
            return of(this.product);
        }
        return this.http.get<IProduct[]>(this.productsUrl)
            .pipe(
                tap(data => console.log(JSON.stringify(data))),
                // initialize the product array
                tap(data => this.product = data),
                catchError(this.handleError)
            );
    }

    getProduct(id: number): Observable<IProduct> {
        if (id === 0) {
            return of(this.initializeProduct());
        }
        // TODO: First check if product list available=>then filter item=>if found then show=>otherwise goto server
        if (this.product) {
            const findItem = this.product.find(item => item.id === id);
            if (findItem) {
                return of(findItem);
            }
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<IProduct>(url)
            .pipe(
                tap(data => console.log('Data: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    saveProduct(product: IProduct): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        if (product.id === 0) {
            return this.createProduct(product, headers);
        }
        return this.updateProduct(product, headers);
    }

    deleteProduct(id: number): Observable<IProduct> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<IProduct>(url, { headers: headers })
            .pipe(
                tap(data => console.log('deleteProduct: ' + id)),
                // after removing a product product from server then it should be removed from product list
                tap(data => {
                    const foundIndex = this.product.findIndex(item => item.id === id);
                    if (foundIndex > -1) {
                        this.product.splice(foundIndex, 1);
                        this.currentProduct = null;
                    }
                }),
                catchError(this.handleError)
            );
    }

    private createProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        product.id = null;
        return this.http.post<IProduct>(this.productsUrl, product, { headers: headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                // add the newly created product to product array
                tap(data => {
                    this.product.push(data);
                    // after crreating a new product it is autometically set to current product
                    this.currentProduct = data;
                }),
                catchError(this.handleError)
            );
    }

    private updateProduct(product: IProduct, headers: HttpHeaders): Observable<IProduct> {
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<IProduct>(url, product, { headers: headers })
            .pipe(
                tap(data => console.log('updateProduct: ' + product.id)),
                catchError(this.handleError)
            );
    }

    private initializeProduct(): IProduct {
        // Return an initialized object
        return {
            'id': 0,
            productName: '',
            productCode: '',
            category: '',
            tags: [],
            releaseDate: '',
            price: 0,
            description: '',
            starRating: 0,
            imageUrl: ''
        };
    }

    private handleError(err: HttpErrorResponse): ErrorObservable {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage: string;
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        console.error(err);
        return new ErrorObservable(errorMessage);
    }

}
