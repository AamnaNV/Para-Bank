import { test } from "../src/fixture/fixture";

test("SC-04: Bill Payment and Transaction Verification", async ({ appAction }) => {

    await test.step("Step 1: Register a new user and verify registration.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    await test.step("Step 2: Navigate to Bill Pay.", async () => {
        await appAction.bills.goToBillPayPage();
    });

    await test.step("Step 3: Enter payee details and payment amount.", async () => {
        await appAction.bills.payBillForm();
    });

    await test.step("Step 4: Submit the payment successfully.", async () => {
        await appAction.bills.sendBillPayment();
    });

    await test.step("Step 5: Verify payment confirmation message.", async () => {
        await appAction.bills.verifyBillSuccessMsg();
    });

    await test.step("Step 6: Navigate to Find Transactions.", async () => {
        await appAction.bills.goToFindTxnPage();
    });

    await test.step("Step 7: Validate the transaction record.", async () => {
        await appAction.bills.findBilltxn();
    });
});