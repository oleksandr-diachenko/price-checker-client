import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'app/service/loader-service/loader.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

    color = 'primary';
    mode = 'indeterminate';
    value = 50;

    constructor(private loaderService: LoaderService){}

    isLoading: Subject<boolean> = this.loaderService.isLoading;
}
