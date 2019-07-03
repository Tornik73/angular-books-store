import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {

    constructor(private toastrService: ToastrService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse)=>{
                let errorMessage = '';
                if(error.error instanceof ErrorEvent)
                    errorMessage = `Error: ${error.error.message}`;
                else
                    errorMessage = `Error Code: ${error.status}`;
                this.toastrService.error(errorMessage);
                return throwError(errorMessage);
            })
        );
    }
}