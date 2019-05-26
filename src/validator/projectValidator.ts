type Data = {
    title: string
};

type ErrorData = {
    title?: string
};

export default class ProjectValidator {

    data: Data;
    errors: ErrorData;

    constructor(data: Data) {
        this.data = data;
        this.errors = {};
    }

    validCreate(): boolean {
        this.validTitle();

        return Object.keys(this.errors).length === 0;
    }

    validTitle() {
        if (this.data.title.length === 0) {
            this.errors.title = "Required";
        }
    }
}