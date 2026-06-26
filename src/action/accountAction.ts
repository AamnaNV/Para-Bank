import { Page, expect } from '@playwright/test';
import { AccountPage } from '../page/accountPage.ts';
import data from "../testdata/paraBank.json";

export class AccountAction {
    readonly account: AccountPage;

    constructor(page: Page) {
        this.account = new AccountPage(page);
    }

    //S2
    async goToOpenNewAccountPage() {
        await this.account.openNewAccountLink.click();
        await this.account.page.waitForURL(/openaccount.htm/);
    }

    async openNewAccount() {
        await this.account.accountDropdown.selectOption(data.accountType);
        await this.account.page.waitForLoadState('networkidle');
        await expect(this.account.accountAmount).toBeVisible();
        await this.account.accountAmount.selectOption({ index: 0 });
        await this.account.openNewAccountButton.click();
    }

    async verifyAccountCreationMsg() {
        await expect(this.account.accountConfirmationMsg).toBeVisible();
    }

    async navigateToAccountsOverview() {
        await this.account.accountsOverviewLink.click();
        await this.account.page.waitForURL(/overview.htm/);
    }

    async verifyAccountVisibilty() {
        await expect(this.account.accountRows.first()).toBeVisible();
        const numberOfRows = await this.account.accountRows.count();
        await expect(numberOfRows).toBeGreaterThan(2);
    }
}