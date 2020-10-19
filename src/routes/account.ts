import Router from "router";

const router = new Router();

router.post("/signup", (ctx) => {
  console.log(ctx.state.body!.email);
  console.log(ctx.state.body!.password);

  ctx.response.body = "We received your credentials";
});

export default router;
