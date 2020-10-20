import { throwError } from 'rxjs-operators';

export default function handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); 
    return throwError(errMsg);
}