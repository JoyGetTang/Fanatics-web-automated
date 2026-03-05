import { test as setup } from "@playwright/test";
import Steps from "@/steps/liveOS";
import ClientSteps from "@/steps/webClient";
import { authFile, clientAuthFile } from "@/params/loginParams";

setup("liveos authenticate", async ({ page }) => {
  const steps = new Steps(page);
  await steps.loginSteps.basicLoginSteps();
  await page.context().storageState({ path: authFile });
  await page.close();
});

// setup("client authenticate", async ({ page }) => {
//   const steps = new ClientSteps(page);
//   await steps.loginSteps.clientLoginSteps();
//   await page.context().storageState({ path: clientAuthFile });
//   await page.close();
// });
