import { Locator, Page, expect } from '@playwright/test';
import data from "../testdata/paraBank.json";

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
        this.accountAmount = page.locator('//select[@id="fromAccountId"]');
        this.openNewAccountButton = page.getByRole('button', { name: "Open New Account" });
        this.accountConfirmationMsg = page.locator('//p[text()="Congratulations, your account is now open."]');
        this.accountsOverviewLink = page.getByRole('link', { name: "Accounts Overview" });
        this.accountRows = page.locator('//tbody/child::tr');
    }

    async goToOpenNewAccountPage() {
        await this.openNewAccountLink.click();
        await this.page.waitForURL(/openaccount.htm/);
    }

    async openNewAccount() {
        await this.accountDropdown.selectOption(data.accountType);
        await this.page.waitForLoadState('networkidle');
        await expect(this.accountAmount).toBeVisible();
        await this.accountAmount.selectOption({ index: 0 });
        await this.openNewAccountButton.click();
    }

    async verifyAccountCreationMsg() {
        await expect(this.accountConfirmationMsg).toBeVisible();
    }

    async navigateToAccountsOverview() {
        await this.accountsOverviewLink.click();
        await this.page.waitForURL(/overview.htm/);
    }

    async verifyAccountVisibilty() {
        await expect(this.accountRows.first()).toBeVisible();
        const numberOfRows = await this.accountRows.count();
        await expect(numberOfRows).toBeGreaterThan(2);
    }
}