import { Locator, Page } from '@playwright/test';

export class AccountPage {

    readonly page: Page;
    readonly openNewAccountLink: Locator;
    readonly accountDropdown: Locator;
    readonly accountAmount: Locator;
    readonly openNewAccountButton: Locator;
    readonly accountConfirmationMsg: Locator;
    readonly accountsOverviewLink: Locator;
    readonly accountRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openNewAccountLink = page.locator('//a[@href="openaccount.htm"]');
        this.accountDropdown = page.locator('//select[@id="type"]');
        this.accountAmount = page.locator('//select[@id="fromAccountId"]')
        this.openNewAccountButton = page.getByRole('button', {name: "Open New Account"});
        this.accountConfirmationMsg = page.locator('//p[text()="Congratulations, your account is now open."]');
        this.accountsOverviewLink = page.getByRole('link', {name: "Accounts Overview"});
        this.accountRows = page.locator('//tbody/child::tr');
    }
}