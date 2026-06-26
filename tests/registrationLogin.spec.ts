import { test } from "../src/fixture/fixture";

test("SC-01: New Customer Registration and Login Validation ", async ({ appAction }) => {

    await test.step("Step 1: Register a new customer using unique test data.", async () => {
        await appAction.registerLogin.goToRegistrationPage();
        await appAction.registerLogin.registerUser();
    })

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
})

test("SC-01-Negative: Both username and password blank-Validation displayed", async ({ appAction }) => {

    await test.step("Step 1: Click on the login button without entering username and password", async () => {
        await appAction.registerLogin.invalidLoginValidation();
    });

    await test.step("Step 2: Validate error message received on clicking login button with blank fields", async () => {
        await appAction.registerLogin.invalidLoginValidationErrorMsg();
    });
})