import { test } from "../src/fixture/fixture";

test("SC-01: New Customer Registration and Login Validation", async ({ appAction }) => {

    await test.step("Step 1: Register a new customer using unique test data.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
    });

    await test.step("Step 2: Verify successful account creation message.", async () => {
        await appAction.registerLogin.verifyRegistration();
    });

    await test.step("Step 3: Logout from the application.", async () => {
        await appAction.registerLogin.logout();
    });

    await test.step("Step 4: Login using the newly created credentials.", async () => {
        await appAction.registerLogin.login();
    });

    await test.step("Step 5: Verify the customer is navigated to the Account Services page.", async () => {
        await appAction.registerLogin.verifyAccountServicePage();
    });

    await test.step("Step 6: Validate that the username/customer welcome message is displayed.", async () => {
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });
});

test("SC-01-Negative: Both username and password blank - Validation displayed", async ({ appAction }) => {

    await test.step("Step 1: Click on the login button without entering username and password.", async () => {
        await appAction.registerLogin.invalidLoginValidation();
    });

    await test.step("Step 2: Validate error message received on clicking login button with blank fields.", async () => {
        await appAction.registerLogin.invalidLoginValidationErrorMsg();
    });
});

test.describe("Scenarios requiring registered user", () => {

    test.beforeEach(async ({ appAction }) => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    test("SC-02: Open New Account and Verify Account Creation", async ({ appAction }) => {

        await test.step("Step 1: Navigate to Open New Account.", async () => {
            await appAction.account.goToOpenNewAccountPage();
        });

        await test.step("Step 2: Create a new Savings Account.", async () => {
            await appAction.account.openNewAccount();
        });

        await test.step("Step 3: Verify account creation success message.", async () => {
            await appAction.account.verifyAccountCreationMsg();
        });

        await test.step("Step 4: Navigate to Accounts Overview.", async () => {
            await appAction.account.navigateToAccountsOverview();
        });

        await test.step("Step 5: Validate that the newly created account number is displayed.", async () => {
            await appAction.account.verifyAccountVisibilty();
        });
    });

    test("SC-03: Fund Transfer Between Accounts", async ({ appAction }) => {

        await test.step("Step 1: Open a new Savings Account and verify creation.", async () => {
            await appAction.account.goToOpenNewAccountPage();
            await appAction.account.openNewAccount();
            await appAction.account.verifyAccountCreationMsg();
        });

        await test.step("Step 2: Navigate to Accounts Overview and capture balance before transfer.", async () => {
            await appAction.funds.navigateToAccountsOverview();
            await appAction.funds.accountBalanceBeforeTransfer();
        });

        await test.step("Step 3: Navigate to Transfer Funds.", async () => {
            await appAction.funds.goToTransferFundsPage();
        });

        await test.step("Step 4: Transfer a valid amount between two different accounts.", async () => {
            await appAction.funds.transferFunds();
        });

        await test.step("Step 5: Verify transfer completion message.", async () => {
            await appAction.funds.verifyTransferSuccessMsg();
        });

        await test.step("Step 6: Validate updated balances in Accounts Overview.", async () => {
            await appAction.funds.accountBalanceAfterTransfer();
            await appAction.funds.verifyBalanceUpdate();
        });
    });

    test("SC-04: Bill Payment and Transaction Verification", async ({ appAction }) => {

        await test.step("Step 1: Navigate to Bill Pay.", async () => {
            await appAction.bills.goToBillPayPage();
        });

        await test.step("Step 2: Enter payee details and payment amount.", async () => {
            await appAction.bills.payBillForm();
        });

        await test.step("Step 3: Submit the payment successfully.", async () => {
            await appAction.bills.sendBillPayment();
        });

        await test.step("Step 4: Verify payment confirmation message.", async () => {
            await appAction.bills.verifyBillSuccessMsg();
        });

        await test.step("Step 5: Navigate to Find Transactions.", async () => {
            await appAction.bills.goToFindTxnPage();
        });

        await test.step("Step 6: Validate the transaction record.", async () => {
            await appAction.bills.findBilltxn();
        });
    });

    test("SC-05: Customer Profile Update and Loan Request", async ({ appAction }) => {

        await test.step("Step 1: Navigate to Update Contact Information.", async () => {
            await appAction.loan.goToUpdateContactInfoPage();
        });

        await test.step("Step 2: Modify customer profile details and save changes.", async () => {
            await appAction.loan.updateContactInfo();
        });

        await test.step("Step 3: Verify profile update success message.", async () => {
            await appAction.loan.verifyUpdateContactSuccessMsg();
        });

        await test.step("Step 4: Navigate to Request Loan.", async () => {
            await appAction.loan.goToRequestLoanPage();
        });

        await test.step("Step 5: Submit a loan request using valid loan amount and down payment values.", async () => {
            await appAction.loan.requestLoan();
        });

        await test.step("Step 6: Verify loan approval/rejection response is displayed correctly.", async () => {
            await appAction.loan.verifyRequestLoanSuccessMsg();
        });
    });

    test("SC-05-Negative: Loan amount with invalid value", async ({ appAction }) => {

        await test.step("Step 1: Navigate to Request Loan.", async () => {
            await appAction.loan.goToRequestLoanPage();
        });

        await test.step("Step 2: Create a loan request with invalid amount.", async () => {
            await appAction.loan.invalidLoanRequest();
        });

        await test.step("Step 3: Validate error message received making an invalid loan request.", async () => {
            await appAction.loan.verifyInvalidLoanRequestErrorMsg();
        });
    });
});