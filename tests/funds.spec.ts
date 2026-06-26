import { test } from "../src/fixture/fixture";

test("SC-03: Fund Transfer Between Accounts", async ({ appAction }) => {

    await test.step("Step 1: Register a new user and verify registration.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
        await appAction.registerLogin.verifyRegistration();
        await appAction.registerLogin.verifyUsernameWelcomeMsg();
    });

    await test.step("Step 2: Open a new Savings Account and verify creation.", async () => {
        await appAction.account.goToOpenNewAccountPage();
        await appAction.account.openNewAccount();
        await appAction.account.verifyAccountCreationMsg();
    });

    await test.step("Step 3: Navigate to Accounts Overview and capture balance before transfer.", async () => {
        await appAction.funds.navigateToAccountsOverview();
        await appAction.funds.accountBalanceBeforeTransfer();
    });

    await test.step("Step 4: Navigate to Transfer Funds.", async () => {
        await appAction.funds.goToTransferFundsPage();
    });

    await test.step("Step 5: Transfer a valid amount between two different accounts.", async () => {
        await appAction.funds.transferFunds();
    });

    await test.step("Step 6: Verify transfer completion message.", async () => {
        await appAction.funds.verifyTransferSuccessMsg();
    });

    await test.step("Step 7: Validate updated balances in Accounts Overview.", async () => {
        await appAction.funds.accountBalanceAfterTransfer();
        await appAction.funds.verifyBalanceUpdate();
    });
});