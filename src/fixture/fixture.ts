import { test as base } from "@playwright/test";
import data from "../testdata/paraBank.json";
import { RegistrationLoginAction } from "../action/registrationLoginAction";
import { AccountAction } from "../action/accountAction";
import { fundsAction } from "../action/fundsAction";
import { BillsAction } from "../action/billsAction";
import { LoanAction } from "../action/loanAction";

type AppActions = {
  registerLogin: RegistrationLoginAction;
  account: AccountAction;
  funds: fundsAction;
  bills: BillsAction;
  loan: LoanAction;
};

type Fixtures = {
  gotoBaseUrl: void;
  appAction: AppActions;
}

export const test = base.extend<Fixtures>({
  gotoBaseUrl: [
    async ({ page }, use) => {
      await page.goto(data.baseUrl);
      await use();
    },
    { auto: true },
  ],

  appAction: async ({ page }, use) => {
    const appAction: AppActions = {
      registerLogin: new RegistrationLoginAction(page),
      account: new AccountAction(page),
      funds: new fundsAction(page),
      bills: new BillsAction(page),
      loan: new LoanAction(page)
    };
    await use(appAction);
  },
});

export { expect } from "@playwright/test";