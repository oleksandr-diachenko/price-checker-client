import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './component/form/form.component';
import {StatusComponent} from './component/status/status.component';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {HomeComponent} from './component/home/home.component';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'form', component: FormComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'statuses', component: StatusComponent, canActivate: [AuthGuard]},
    {path: '**', component: HomeComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
