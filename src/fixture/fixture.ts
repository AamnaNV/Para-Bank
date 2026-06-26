import { test as base } from "@playwright/test";
import data from "../testdata/paraBank.json";
import { RegisterLoginPage } from "../POM/registrationLoginPage";
import { AccountPage } from "../POM/accountPage";
import { FundsPage } from "../POM/fundsPage";
import { LoanPage } from "../POM/loanPage";
import { BillsPage } from "../POM/billsPage";

type AppActions = {
  registerLogin: RegisterLoginPage;
  account: AccountPage;
  funds: FundsPage;
  bills: BillsPage;
  loan: LoanPage;
};

type Fixtures = {
  gotoBaseUrl: void;
  appAction: AppActions;
}

export const test = base.extend<Fixtures>({
  gotoBaseUrl: [
      async ({ page }, use) => {
          await page.goto(data.baseUrl, { timeout: 60000 });
          await use();
      },
      { auto: true },
  ],

  appAction: async ({ page }, use) => {
    const appAction: AppActions = {
      registerLogin: new RegisterLoginPage(page),
      account: new AccountPage(page),
      funds: new FundsPage(page),
      bills: new BillsPage(page),
      loan: new LoanPage(page)
    };
    await use(appAction);
  },
});

export { expect } from "@playwright/test";