import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

    constructor(private toastrService: ToastrService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // add authorization header with jwt token if available
        let currentUser = localStorage.currentUser;
        let currentToken = localStorage.currentUserToken;
        
        if (currentUser && currentToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)=>{
                let errorMessage = '';
                if(error.error instanceof ErrorEvent){
                    errorMessage = `Error: ${error.error.message}`;
                }

                else
                    errorMessage = `Error Code: ${error.status}`;
                this.toastrService.error(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}