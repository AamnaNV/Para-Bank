import { test } from "../src/fixture/fixture";

test("SC-02: Open New Account and Verify Account Creation", async ({ appAction }) => {

    await test.step("Step 1: Register a new user and verify registration.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    await test.step("Step 2: Navigate to Open New Account.", async () => {
        await appAction.account.goToOpenNewAccountPage();
    });

    await test.step("Step 3: Create a new Savings Account.", async () => {
        await appAction.account.openNewAccount();
    });

    await test.step("Step 4: Verify account creation success message.", async () => {
        await appAction.account.verifyAccountCreationMsg();
    });

    await test.step("Step 5: Navigate to Accounts Overview.", async () => {
        await appAction.account.navigateToAccountsOverview();
    });

    await test.step("Step 6: Validate that the newly created account number is displayed.", async () => {
        await appAction.account.verifyAccountVisibilty();
    });
});