import { test } from "../src/fixture/fixture";

test("SC-05: Customer Profile Update and Loan Request", async ({ appAction }) => {

    await test.step("Step 1: Register a new user and verify registration.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    await test.step("Step 2: Navigate to Update Contact Information.", async () => {
        await appAction.loan.goToUpdateContactInfoPage();
    });

    await test.step("Step 3: Modify customer profile details and save changes.", async () => {
        await appAction.loan.updateContactInfo();
    });

    await test.step("Step 4: Verify profile update success message.", async () => {
        await appAction.loan.verifyUpdateContactSuccessMsg();
    });

    await test.step("Step 5: Navigate to Request Loan.", async () => {
        await appAction.loan.goToRequestLoanPage();
    });

    await test.step("Step 6: Submit a loan request using valid loan amount and down payment values.", async () => {
        await appAction.loan.requestLoan();
    });

    await test.step("Step 7: Verify loan approval/rejection response is displayed correctly.", async () => {
        await appAction.loan.verifyRequestLoanSuccessMsg();
    });
});

test("SC-05-Negative: Loan amount with invalid value", async ({ appAction }) => {

    await test.step("Step 1: Register a new user and verify registration.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    await test.step("Step 2: Navigate to Request Loan.", async () => {
        await appAction.loan.goToRequestLoanPage();
    });

    await test.step("Step 3: Create a loan request with invalid amount.", async () => {
        await appAction.loan.invalidLoanRequest();
    });

    await test.step("Step 4: Validate error message received making an invalid loan request.", async () => {
        await appAction.loan.verifyInvalidLoanRequestErrorMsg();
    });
});