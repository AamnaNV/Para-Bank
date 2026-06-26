import { Locator, Page, expect } from '@playwright/test';
import data from "../testdata/paraBank.json";

export class BillsPage {
    readonly page: Page;
    readonly billPayLink: Locator;
    readonly payeeName: Locator;
    readonly billAddress: Locator;
    readonly billCity: Locator;
    readonly billState: Locator;
    readonly billZipcode: Locator;
    readonly billPhone: Locator;
    readonly billAccount: Locator;
    readonly verifyBillAccount: Locator;
    readonly billAmount: Locator;
    readonly billFromAccount: Locator;
    readonly sendPaymentButton: Locator;
    readonly billSuccessMsg: Locator;
    readonly findTxnLink: Locator;
    readonly findTxnAccount: Locator;
    readonly findByAmount: Locator;
    readonly findTxnButton: Locator;
    readonly txnResultRow: Locator;

    private selectedAccount: string = '';

    constructor(page: Page) {
        this.page = page;
        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
        this.payeeName = page.locator('//input[@name="payee.name"]');
        this.billAddress = page.locator('//input[@name="payee.address.street"]');
        this.billCity = page.locator('//input[@name="payee.address.city"]');
        this.billState = page.locator('//input[@name="payee.address.state"]');
        this.billZipcode = page.locator('//input[@name="payee.address.zipCode"]');
        this.billPhone = page.locator('//input[@name="payee.phoneNumber"]');
        this.billAccount = page.locator('//input[@name="payee.accountNumber"]');
        this.verifyBillAccount = page.locator('//input[@name="verifyAccount"]');
        this.billAmount = page.locator('//input[@name="amount"]');
        this.billFromAccount = page.locator('//select[@name="fromAccountId"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.billSuccessMsg = page.locator('//h1[text() ="Bill Payment Complete"]');
        this.findTxnLink = page.getByRole('link', { name: 'Find Transactions' });
        this.findTxnAccount = page.locator('//select[@id="accountId"]');
        this.findByAmount = page.locator('//input[@id="amount"]');
        this.findTxnButton = page.locator('//button[@id="findByAmount"]');
        this.txnResultRow = page.locator('//tbody/tr');
    }

    async goToBillPayPage() {
        await this.billPayLink.click();
        await this.page.waitForURL(/billpay.htm/);
    }

    async payBillForm() {
        await this.payeeName.fill(data.firstName);
        await this.billAddress.fill(data.address);
        await this.billCity.fill(data.city);
        await this.billState.fill(data.state);
        await this.billZipcode.fill(data.zipcode);
        await this.billPhone.fill(data.phone);
        await this.billAccount.fill(data.billAccountNumber);
        await this.verifyBillAccount.fill(data.billAccountNumber);
        await this.billAmount.fill(data.billAmount);

        this.selectedAccount = (await this.billFromAccount.locator('option').nth(0).innerText()).trim();
        console.log(`Selected account: ${this.selectedAccount}`);

        await this.billFromAccount.selectOption({ index: 0 });
    }

    async sendBillPayment() {
        await this.sendPaymentButton.click();
    }

    async verifyBillSuccessMsg() {
        await expect(this.billSuccessMsg).toBeVisible();
    }

    async goToFindTxnPage() {
        await this.findTxnLink.click();
        await this.page.waitForURL(/findtrans.htm/);
    }

    async findBilltxn() {
        await this.findTxnAccount.selectOption({ value: this.selectedAccount });
        await this.findByAmount.fill(data.billAmount);
        await this.findTxnButton.click();
        await this.page.waitForLoadState('domcontentloaded');
        await expect(this.txnResultRow.first()).toBeVisible();
    }
}