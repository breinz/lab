import User, { UserModel } from "../model/userModel";

type Data = {
    name?: string,
    email?: string,
    password?: string,
    password_repeat?: string
}

export default class UserValidator {

    public errors: any;

    private user: Data;

    private email_regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(user: Data) {
        this.user = user;
        this.errors = {};
    }

    /**
     * Is the user valid to get logged in
     */
    public async isValidForLogin(): Promise<boolean> {
        this.validateEmail(false);
        this.validatePassword();
        await this.validateLogin();

        return Object.keys(this.errors).length === 0;
    }
    /**
     * Is the user valid to get signed in
     */
    public async isValidForSignin(): Promise<boolean> {
        this.validateName();
        await this.validateEmail(true);
        this.validatePassword();
        this.validatePasswordRepeat();

        return Object.keys(this.errors).length === 0;
    }

    /**
     * Validate the name
     * - required
     */
    validateName() {

        if (!this.user.name || !this.user.name.length) {
            return this.errors.name = "required"
        }

    }

    /**
     * Validate email
     * -required
     * -valid email
     * -not taken
     */
    async validateEmail(checkTaken: boolean) {
        // Required
        if (!this.user.email || !this.user.email.length) {
            return this.errors.email = "required"
        }

        // Valid
        if (!this.email_regex.test(this.user.email)) {
            return this.errors.email = "invalid"
        }

        if (checkTaken) {

            // Not taken
            const count_user = await User.countDocuments({ email: this.user.email });

            if (count_user > 0) {
                return this.errors.email = "taken"
            }
        }
    }

    validatePassword() {
        if (!this.user.password || !this.user.password.length) {
            return this.errors.password = "required";
        }
    }

    validatePasswordRepeat() {
        if (!this.user.password_repeat || !this.user.password_repeat.length || this.user.password != this.user.password_repeat) {
            return this.errors.password = "dont_match";
        }
    }

    async validateLogin() {
        const user = await User.findOne({ email: this.user.email }) as UserModel;

        if (!user) {
            return this.errors.login = "invalid";
        }

        if (!await user.validatePassword(this.user.password || "")) {
            return this.errors.login = "invalid";
        }
    }
}