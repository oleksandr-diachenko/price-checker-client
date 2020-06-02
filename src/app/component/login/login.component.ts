import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../../auth/authentication.service';
import {AlertService} from '../../service/alert.service';

@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    private formBuilder: FormBuilder;
    private route: ActivatedRoute;
    private authenticationService: AuthenticationService;
    private alertService: AlertService;

    constructor(formBuilder: FormBuilder, route: ActivatedRoute, private router: Router,
                authenticationService: AuthenticationService, alertService: AlertService) {
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.route = route;
        this.formBuilder = formBuilder;

        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get f() {
        return this.loginForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        this.alertService.clear();

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
