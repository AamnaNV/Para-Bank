import { Page, expect } from '@playwright/test';
import data from "../testdata/paraBank.json";
import { LoanPage } from '../page/loanPage.ts';

export class LoanAction {
    readonly loan: LoanPage;

    constructor(page: Page) {
        this.loan = new LoanPage(page);
    }

    //S5 - Update Profile/loan
    async goToUpdateContactInfoPage() {
        await this.loan.updateContactInfoLink.click();
        await this.loan.page.waitForURL(/updateprofile.htm/);
        await this.loan.page.waitForLoadState('networkidle');
    }

    async updateContactInfo() {
        await this.loan.updatePhone.fill(data.updatedPhone);
        await this.loan.updateProfileButton.click();
    }

    async verifyUpdateContactSuccessMsg() {
        await expect(this.loan.updateProfileSuccessMsg).toBeVisible();
    }

    async goToRequestLoanPage() {
        await this.loan.requestLoanLink.click();
        await this.loan.page.waitForURL(/requestloan.htm/);
    }

    async requestLoan() {
        await this.loan.loanAmount.fill(data.loanAmount);
        await this.loan.downPayment.fill(data.downPayment);
        await this.loan.loanApplyNowButton.click();
    }

    async verifyRequestLoanSuccessMsg() {
        await expect(this.loan.loanSuccessMessage).toBeVisible();
    }

    async invalidLoanRequest() {
        await this.loan.loanAmount.fill(data.invalidLoanAmount);
        await this.loan.downPayment.fill(data.downPayment);
        await this.loan.loanApplyNowButton.click();    
    }

    async verifyInvalidLoanRequestErrorMsg() {
        await expect(this.loan.invalidLoanErrorMsg).toBeVisible();
    }
}