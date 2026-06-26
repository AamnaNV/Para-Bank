import { Page, expect } from '@playwright/test';
import { BillsPage } from '../page/billsPage.ts';
import data from "../testdata/paraBank.json";

export class BillsAction {
    readonly bills: BillsPage;
    private selectedAccount: string = '';

    constructor(page: Page) {
        this.bills = new BillsPage(page);
    }

    //S4 - Bill
    async goToBillPayPage() {
        await this.bills.billPayLink.click();
        await this.bills.page.waitForURL(/billpay.htm/);
    }

    async payBillForm() {
        await this.bills.payeeName.fill(data.firstName);
        await this.bills.billAddress.fill(data.address);
        await this.bills.billCity.fill(data.city);
        await this.bills.billState.fill(data.state);
        await this.bills.billZipcode.fill(data.zipcode);
        await this.bills.billPhone.fill(data.phone);
        await this.bills.billAccount.fill(data.billAccountNumber);
        await this.bills.verifyBillAccount.fill(data.billAccountNumber);
        await this.bills.billAmount.fill(data.billAmount);

        this.selectedAccount = (await this.bills.billFromAccount.locator('option').nth(0).innerText()).trim();
        console.log(`Selected account: ${this.selectedAccount}`);

        await this.bills.billFromAccount.selectOption({ index: 0 });
    }

    async sendBillPayment() {
        await this.bills.sendPaymentButton.click();
    }

    async verifyBillSuccessMsg() {
        await expect(this.bills.billSuccessMsg).toBeVisible();
    }

    async goToFindTxnPage() {
        await this.bills.findTxnLink.click();
        await this.bills.page.waitForURL(/findtrans.htm/);
    }

    async findBilltxn() {
        await this.bills.findTxnAccount.selectOption({ value: this.selectedAccount });
        await this.bills.findByAmount.fill(data.billAmount);
        await this.bills.findTxnButton.click();
        await this.bills.page.waitForLoadState('domcontentloaded');
        await expect(this.bills.txnResultRow.first()).toBeVisible();
    }
}