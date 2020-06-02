import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class SnackBarService {

    constructor(private snackBar: MatSnackBar) {
    }

    openGreenSnackBar(component: string) {
        this.snackBar.open(component, 'X', {
            duration: 2000,
            panelClass: ['mat-toolbar', 'mat-primary']
        });
    }

    openRedSnackBar(component: string) {
        return this.snackBar.open(component, 'X', {
            duration: 10000,
            panelClass: ['mat-toolbar', 'mat-warn']
        });
    }

    dismiss() {
        this.snackBar.dismiss();
    }
}
