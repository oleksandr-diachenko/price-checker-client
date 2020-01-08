import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class LoaderService {

    private loading = new Subject<boolean>();

    public show() {
        this.loading.next(true);
    }

    public hide() {
        this.loading.next(false);
    }

    public get isLoading(): Subject<boolean> {
        return this.loading;
    }
}
