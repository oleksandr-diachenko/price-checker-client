import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../auth/authentication.service';
import {User} from '../../model/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() currentUser: User;
    private router: Router;
    private authenticationService: AuthenticationService;

    constructor(router: Router, authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
        this.router = router;
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
