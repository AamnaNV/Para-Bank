import { Locator, Page } from '@playwright/test';

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

    constructor(page: Page) {
        this.page = page;
        this.billPayLink = page.getByRole('link', {name: 'Bill Pay'});
        this.payeeName = page.locator('//input[@name="payee.name"]');
        this.billAddress = page.locator('//input[@name="payee.address.street"]');
        this.billCity = page.locator('//input[@name="payee.address.city"]');
        this.billState = page.locator('//input[@name="payee.address.state"]');
        this.billZipcode = page.locator('//input[@name="payee.address.zipCode"]');
        this.billPhone = page.locator('//input[@name="payee.phoneNumber"]'); //
        this.billAccount = page.locator('//input[@name="payee.accountNumber"]');
        this.verifyBillAccount = page.locator('//input[@name="verifyAccount"]');
        this.billAmount = page.locator('//input[@name="amount"]');
        this.billFromAccount = page.locator('//select[@name="fromAccountId"]');

        this.sendPaymentButton = page.getByRole('button', {name: 'Send Payment'});
        this.billSuccessMsg = page.locator('//h1[text() ="Bill Payment Complete"]');

        this.findTxnLink = page.getByRole('link', {name: 'Find Transactions'});
        this.findTxnAccount = page.locator('//select[@id="accountId"]');
        this.findByAmount = page.locator('//input[@id="amount"]');
        this.findTxnButton = page.locator('//button[@id="findByAmount"]');
        this.txnResultRow = page.locator('//tbody/tr');
    }
}