import Router from "router";
import account from "./account.ts";

const router = new Router();

router.use("/account", account.allowedMethods(), account.routes());

export default router;
