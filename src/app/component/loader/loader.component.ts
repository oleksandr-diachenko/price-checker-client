import {Component} from '@angular/core';
import {LoaderService} from 'app/service/loader-service/loader.service';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    public color = 'primary';
    public mode = 'indeterminate';
    public value = 50;
    public isLoading: Subject<boolean> = this.loaderService.isLoading;

    constructor(private loaderService: LoaderService) {
    }
}
