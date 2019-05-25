type Data = {
    name: string
};

type ErrorData = {
    name?: string
};

export default class TechnoValidator {

    data: Data;
    errors: ErrorData = {};

    constructor(data: Data) {
        this.data = data;
    }

    validNew(): boolean {
        this.validName();

        return Object.keys(this.errors).length === 0;
    }

    validName() {
        if (this.data.name.length === 0) {
            this.errors.name = "Required"
        }
    }
}