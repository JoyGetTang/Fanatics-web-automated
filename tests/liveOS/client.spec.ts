import { test } from "@fixtures";
import { authFile, clientAuthFile } from "@/params/loginParams";
import ClientSteps from "@/steps/webClient";
import Steps from "@/steps/liveOS";

test.describe("Authenticate", () => {
  test.skip();
  // test("client authenticate", async ({ browser }) => {
  //   try {
  //     const clientContext = await browser.newPage({
  //       storageState: undefined,
  //     });
  //     const steps = new ClientSteps(clientContext);
  //     await steps.loginSteps.clientLoginSteps();
  //     await clientContext.context().storageState({ path: clientAuthFile });
  //     await clientContext.close();
  //   } catch (error) {}
  // });

  test("live authenticate", async ({ browser }) => {
    try {
      const liveContext = await browser.newPage({
        storageState: undefined,
      });
      const steps = new Steps(liveContext);
      await steps.loginSteps.basicLoginSteps();
      await liveContext.context().storageState({ path: authFile });
      await liveContext.close();
    } catch (error) {}
  });
});
