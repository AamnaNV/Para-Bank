import { Page, expect } from '@playwright/test';
import { RegisterLoginPage } from '../page/registrationLoginPage';
import data from "../testdata/paraBank.json";
import { faker } from '@faker-js/faker';

export class RegistrationLoginAction {
    readonly registerLogin: RegisterLoginPage;
    private username: string;  // store generated username here

    constructor(page: Page) {
        this.registerLogin = new RegisterLoginPage(page);
        this.username = '';
    }

    async goToRegistrationPage() {
        await this.registerLogin.registerLink.click();
        await this.registerLogin.page.waitForURL(/register/);
    }

    async registerUser() {
        this.username = faker.internet.username();
        await this.registerLogin.firstName.fill(data.firstName);
        await this.registerLogin.lastName.fill(data.lastName);
        await this.registerLogin.address.fill(data.address);
        await this.registerLogin.city.fill(data.city);
        await this.registerLogin.state.fill(data.state);
        await this.registerLogin.zipcode.fill(data.zipcode);
        await this.registerLogin.phone.fill(data.phone);
        await this.registerLogin.ssn.fill(data.ssn);
        await this.registerLogin.username.fill(this.username);  // use generated
        await this.registerLogin.password.fill(data.password);
        await this.registerLogin.confirmpassword.fill(data.password);
        await this.registerLogin.registerButton.click();
    }

    async verifyRegistration() {
        await expect(this.registerLogin.registrationConfirmationMsg).toBeVisible();
    }

    async logout() {
        await this.registerLogin.logoutLink.click();
    }

    async login() {
        await this.registerLogin.loginUsername.fill(this.username);
        await this.registerLogin.loginPassword.fill(data.password);
        await this.registerLogin.loginButton.click();
    }

    async verifyAccountServicePage() {
        await expect(this.registerLogin.page).toHaveURL(/overview.htm/);
        await expect(this.registerLogin.accountServicesTitle).toBeVisible();
    }

    async verifyUsernameWelcomeMsg() {
        await expect(this.registerLogin.welcomeUsername).toHaveText("Welcome " + data.firstName + " " + data.lastName);
    }

    async invalidLoginValidation() {
        await this.registerLogin.loginButton.click();
    }

    async invalidLoginValidationErrorMsg() {
        await expect(this.registerLogin.loginErrorMsg).toBeVisible();
    }
}