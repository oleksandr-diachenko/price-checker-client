import {User} from '../../model/user';
import {AuthenticationService} from '../../auth/authentication.service';
import {Component} from '@angular/core';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent {

    currentUser: User;

    constructor(private authenticationService: AuthenticationService,) {
        this.currentUser = this.authenticationService.currentUserValue;
    }
}
