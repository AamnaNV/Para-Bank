import { Page, expect } from '@playwright/test';
import { FundsPage } from '../page/fundsPage.ts';
import data from "../testdata/paraBank.json";

export class fundsAction {
    readonly funds: FundsPage;
    private balanceBefore: number = 0;
    private balanceAfter: number = 0;

    constructor(page: Page) {
        this.funds = new FundsPage(page);
    }

    //S2
    async goToOpenNewAccountPage() {
        await this.funds.openNewAccountLink.click();
        await this.funds.page.waitForURL(/openaccount.htm/);
    }

    async openNewAccount() {
        await this.funds.accountDropdown.selectOption(data.accountType);
        await this.funds.page.waitForLoadState('networkidle');
        await expect(this.funds.accountAmount).toBeVisible();
        await this.funds.accountAmount.selectOption({ index: 0 });
        await this.funds.openNewAccountButton.click();
    }

    async verifyAccountCreationMsg() {
        await expect(this.funds.accountConfirmationMsg).toBeVisible();
    }

    async navigateToAccountsOverview() {
        await this.funds.accountsOverviewLink.click();
        await this.funds.page.waitForURL(/overview.htm/);
    }

    async verifyAccountVisibilty() {
        await expect(this.funds.accountRows.first()).toBeVisible();
        const numberOfRows = await this.funds.accountRows.count();
        await expect(numberOfRows).toBeGreaterThan(2);
    }

    //S3 - Transfer
    async accountBalanceBeforeTransfer(): Promise<number> {
        await this.funds.page.waitForLoadState('networkidle');
        const balanceText = await this.funds.secondAccountBalance.nth(4).innerText();
        const cleaned = balanceText.replace(/[$,\s]/g, '').trim();
        this.balanceBefore = parseFloat(cleaned);
        console.log(`Balance before transfer: ${this.balanceBefore}`);
        return this.balanceBefore;
    }

    async goToTransferFundsPage() {
        await this.funds.transferFundsLink.click();
        await this.funds.page.waitForURL(/transfer.htm/);
    }

    async transferFunds() {
        await this.funds.fromAccount.waitFor({ state: 'visible' });
        await this.funds.toAccount.waitFor({ state: 'visible' });
        await this.funds.transferAmount.fill("100");
        await this.funds.fromAccount.selectOption({ index: 0 });
        await this.funds.toAccount.selectOption({ index: 1 });
        await this.funds.transferButton.click();
    }

    async verifyTransferSuccessMsg() {
        await expect(this.funds.transferSuccessMsg).toBeVisible();
    }

    async accountBalanceAfterTransfer(): Promise<number> {
        await this.navigateToAccountsOverview();
        await this.funds.page.waitForLoadState('networkidle');
        const balanceText = await this.funds.secondAccountBalance.nth(4).innerText();
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