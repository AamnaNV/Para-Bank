import { Locator, Page } from '@playwright/test';

export class LoanPage {
    readonly page: Page;

    readonly updateContactInfoLink: Locator;
    readonly updatePhone: Locator;
    readonly updateProfileButton: Locator;
    readonly updateProfileSuccessMsg: Locator;

    readonly requestLoanLink: Locator;
    readonly loanAmount: Locator;
    readonly downPayment: Locator;
    readonly loanApplyNowButton: Locator;
    readonly loanSuccessMessage: Locator;

    readonly invalidLoanErrorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updateContactInfoLink = page.locator('//a[@href="updateprofile.htm"]');
        this.updatePhone = page.locator('//input[@id="customer.phoneNumber"]');
        this.updateProfileButton = page.getByRole('button', {name: 'Update Profile'});
        this.updateProfileSuccessMsg = page.locator('//h1[text()="Profile Updated"]');

        this.requestLoanLink = page.locator('//a[@href="requestloan.htm"]');
        this.loanAmount = page.locator('//input[@id="amount"]');
        this.downPayment = page.locator('//input[@id="downPayment"]');
        this.loanApplyNowButton = page.getByRole('button', {name: 'Apply Now'});
        this.loanSuccessMessage = page.locator('//p[text()="Congratulations, your loan has been approved."]');
        this.invalidLoanErrorMsg = page.locator('//p[text()="We cannot grant a loan in that amount with your available funds."]');
    }
}