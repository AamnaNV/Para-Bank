import { Locator, Page } from '@playwright/test';

export class RegisterLoginPage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly address: Locator;
    readonly city: Locator;
    readonly state: Locator;
    readonly zipcode: Locator;
    readonly phone: Locator;
    readonly ssn: Locator;
    readonly username: Locator;
    readonly password: Locator;
    readonly confirmpassword: Locator;
    readonly registerButton: Locator;
    readonly registrationConfirmationMsg: Locator;
    readonly logoutLink: Locator;
    readonly loginUsername: Locator;
    readonly loginPassword: Locator;
    readonly loginButton: Locator;
    readonly accountServicesTitle: Locator;
    readonly welcomeUsername: Locator;
    readonly loginErrorMsg: Locator;

        constructor(page: Page) {
        this.page = page;
        this.registerLink = page.getByRole('link', {name: 'Register'});
        this.firstName = page.locator('//input[@id="customer.firstName"]');
        this.lastName = page.locator('//input[@id="customer.lastName"]');
        this.address = page.locator('//input[@id="customer.address.street"]');
        this.city = page.locator('//input[@id="customer.address.city"]');
        this.state = page.locator('//input[@id="customer.address.state"]');
        this.zipcode = page.locator('//input[@id="customer.address.zipCode"]');
        this.phone = page.locator('//input[@id="customer.phoneNumber"]');
        this.ssn = page.locator('//input[@id="customer.ssn"]');
        this.username = page.locator('//input[@id="customer.username"]');
        this.password = page.locator('//input[@id="customer.password"]');
        this.confirmpassword = page.locator('//input[@id="repeatedPassword"]');
        this.registerButton = page.getByRole('button', {name: 'Register'});
        this.registrationConfirmationMsg = page.locator('//p[text()="Your account was created successfully. You are now logged in."]');
        this.logoutLink = page.locator('//a[@href="logout.htm"]');
        this.loginUsername = page.locator('//input[@name="username"]');
        this.loginPassword = page.locator('//input[@name="password"]');
        this.loginButton = page.getByRole('button', {name: "Log In"});
        this.accountServicesTitle = page.locator('//h2[text()="Account Services"]');
        this.welcomeUsername = page.locator('//p[@class="smallText"]');
        this.loginErrorMsg = page.locator('//p[text()="Please enter a username and password."]');

        }}