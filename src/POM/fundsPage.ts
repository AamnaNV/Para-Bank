import { Locator, Page, expect } from '@playwright/test';
import data from "../testdata/paraBank.json";

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

    private balanceBefore: number = 0;
    private balanceAfter: number = 0;

    constructor(page: Page) {
        this.page = page;
        this.openNewAccountLink = page.locator('//a[@href="openaccount.htm"]');
        this.accountDropdown = page.locator('//select[@id="type"]');
        this.accountAmount = page.locator('//select[@id="fromAccountId"]');
        this.openNewAccountButton = page.getByRole('button', { name: "Open New Account" });
        this.accountConfirmationMsg = page.locator('//p[text()="Congratulations, your account is now open."]');
        this.accountsOverviewLink = page.getByRole('link', { name: "Accounts Overview" });
        this.accountRows = page.locator('//tbody/child::tr');
        this.transferFundsLink = page.getByRole('link', { name: "Transfer Funds" });
        this.transferAmount = page.locator('//input[@id="amount"]');
        this.fromAccount = page.locator('//select[@id="fromAccountId"]');
        this.toAccount = page.locator('//select[@id="toAccountId"]');
        this.transferButton = page.getByRole('button', { name: "Transfer" });
        this.transferSuccessMsg = page.locator('//p[text()=" has been transferred from account #"]');
        this.secondAccountBalance = page.locator('//td');
    }

    async navigateToAccountsOverview() {
        await this.accountsOverviewLink.click();
        await this.page.waitForURL(/overview.htm/);
    }

    async accountBalanceBeforeTransfer(): Promise<number> {
        await this.page.waitForLoadState('networkidle');
        const balanceText = await this.secondAccountBalance.nth(4).innerText();
        const cleaned = balanceText.replace(/[$,\s]/g, '').trim();
        this.balanceBefore = parseFloat(cleaned);
        console.log(`Balance before transfer: ${this.balanceBefore}`);
        return this.balanceBefore;
    }

    async goToTransferFundsPage() {
        await this.transferFundsLink.click();
        await this.page.waitForURL(/transfer.htm/);
    }

    async transferFunds() {
        await this.fromAccount.waitFor({ state: 'visible' });
        await this.toAccount.waitFor({ state: 'visible' });
        await this.transferAmount.fill("100");
        await this.fromAccount.selectOption({ index: 0 });
        await this.toAccount.selectOption({ index: 1 });
        await this.transferButton.click();
    }

    async verifyTransferSuccessMsg() {
        await expect(this.transferSuccessMsg).toBeVisible();
    }

    async accountBalanceAfterTransfer(): Promise<number> {
        await this.navigateToAccountsOverview();
        await this.page.waitForLoadState('networkidle');
        const balanceText = await this.secondAccountBalance.nth(4).innerText();
        const cleaned = balanceText.replace(/[$,\s]/g, '').trim();
        this.balanceAfter = parseFloat(cleaned);
        console.log(`Balance after transfer: ${this.balanceAfter}`);
        return this.balanceAfter;
    }

    async verifyBalanceUpdate() {
        console.log(`Before: ${this.balanceBefore} | After: ${this.balanceAfter}`);
        expect(this.balanceAfter).toBeGreaterThan(this.balanceBefore);
    }
}