import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from './component/form/form.component';
import {StatusComponent} from './component/status/status.component';

const routes: Routes = [
    {path: '', component: FormComponent},
    {path: 'statuses', component: StatusComponent},
    {path: '**', component: FormComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
