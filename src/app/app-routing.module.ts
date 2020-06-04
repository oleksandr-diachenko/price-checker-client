import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './component/form/form.component';
import {StatusComponent} from './component/status/status.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: '', component: FormComponent, canActivate: [AuthGuard]},
    {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'statuses', component: StatusComponent, canActivate: [AuthGuard]},
    {path: '**', component: FormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
