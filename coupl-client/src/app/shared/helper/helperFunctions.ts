import { throwError } from 'rxjs';

export function handleErrorPipe(error: any) {
  let errorMessage = '';
  if (error.error instanceof ErrorEvent) {
    // client-side error
    errorMessage = `Error: ${error.error.message}`;
  } else {
    // server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  return throwError(() => errorMessage);
}

export function getUserNameFromLocalHost() {
  const userObject = JSON.parse(localStorage.getItem('userObject') || '{}');
  return userObject['email_address'];
}
