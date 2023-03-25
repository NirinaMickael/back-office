import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/shared/snackbar/snackbar.component';
import { snackbarSUCCESS, snackbarERROR, snackbarWARN } from '../../schemas/snackbar.schema';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private matSnackBar: MatSnackBar) { }

  openSnackBarAlert(type: string, message: string) {
    let config;
    switch (type) {
      case 'success':
        config = {
          static: snackbarSUCCESS,
          data: {
            message,
            icon: 'done'
          }
        }
        break;

      case 'error':
        config = {
          static: snackbarERROR,
          data: {
            message,
            icon: 'error'
          }
        }
        break;

      case 'warn':
        config = {
          static: snackbarWARN,
          data: {
            message,
            icon: 'warning'
          }
        }
        break;

    }
    this.matSnackBar.openFromComponent(SnackbarComponent, {
      verticalPosition: config.static.verticalPosition,
      horizontalPosition: config.static.horizontalPosition,
      panelClass: config.static.panelClass,
      data: config.data,
      duration: 4000
    })
  }

  closeSnackbar() {
    this.matSnackBar.dismiss()
  }
}
