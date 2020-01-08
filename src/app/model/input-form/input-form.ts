export class InputForm {

    public file: File;
    public urlColumn: number;
    public insertColumn: number;

    constructor(file: File, urlColumn: number, insertColumn: number) {
        this.insertColumn = insertColumn;
        this.urlColumn = urlColumn;
        this.file = file;
    }
}
