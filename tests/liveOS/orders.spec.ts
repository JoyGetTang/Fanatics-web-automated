import { getTokens, getUserOrderById, getUseroOrders } from "@/api";
import { checkOrdersAccount } from "@/params/apiParams";
import { defaultShippingAndCard } from "@/params/ordersParams";
import { expect, test } from "@playwright/test";

test.describe("Orders", () => {
  test("Check orders info with account deleted shippingaddress and card", async ({}) => {
    const tokens = await getTokens(checkOrdersAccount);
    const auth = "Bearer " + tokens.login.accessToken;
    const getOrdersRes = await getUseroOrders(auth);
    let ids: string[] = [];
    const edgeslist = getOrdersRes.currentUser.orders.edges;
    edgeslist.map((edge) => ids.push(edge.node.id));
    for (const id of ids) {
      const orderRes = await getUserOrderById(auth, id);
      const paymentMethod =
        orderRes.currentUser.orders.edges[0].node.paymentMethod;
      const shippingAddress =
        orderRes.currentUser.orders.edges[0].node.shippingAddress;
      expect(defaultShippingAndCard).toContainEqual([
        shippingAddress,
        paymentMethod,
      ]);
    }
  });
});
