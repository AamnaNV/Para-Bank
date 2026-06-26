import { Locator, Page } from '@playwright/test';

export class FundsPage {
    readonly page: Page;
    readonly openNewAccountLink: Locator;
    readonly accountDropdown: Locator;
    readonly accountAmount: Locator;
    readonly openNewAccountButton: Locator;
    readonly accountConfirmationMsg: Locator;
    readonly accountsOverviewLink: Locator;
    readonly accountRows: Locator;

    readonly transferFundsLink: Locator;
    readonly transferAmount: Locator;
    readonly fromAccount: Locator;
    readonly toAccount: Locator;
    readonly transferButton: Locator;
    readonly transferSuccessMsg: Locator;
    readonly secondAccountBalance: Locator;

    constructor(page: Page) {
        this.page = page;
        this.openNewAccountLink = page.locator('//a[@href="openaccount.htm"]');
        this.accountDropdown = page.locator('//select[@id="type"]');
        this.accountAmount = page.locator('//select[@id="fromAccountId"]')
        this.openNewAccountButton = page.getByRole('button', {name: "Open New Account"});
        this.accountConfirmationMsg = page.locator('//p[text()="Congratulations, your account is now open."]');
        this.accountsOverviewLink = page.getByRole('link', {name: "Accounts Overview"});
        this.accountRows = page.locator('//tbody/child::tr');

        this.transferFundsLink = page.getByRole('link', {name: "Transfer Funds"});
        this.transferAmount = page.locator('//input[@id="amount"]');
        this.fromAccount = page.locator('//select[@id="fromAccountId"]');
        this.toAccount = page.locator('//select[@id="toAccountId"]');
        this.transferButton = page.getByRole('button', {name: "Transfer"});
        this.transferSuccessMsg = page.locator('//p[text()=" has been transferred from account #"]');
        this.secondAccountBalance = page.locator('//td');
    }
}