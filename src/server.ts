import "dotenv";
import { Application } from "oak";
import type { BGSState } from "./types.d.ts";
import routes from "./routes/index.ts";

const app = new Application<BGSState>({ proxy: true });

app.use(async (ctx, next) => {
  if (ctx.request.hasBody && ctx.request.body().type === "json") {
    ctx.state.body = await ctx.request.body({ type: "json" }).value;
  }
  await next();
});

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

app.use(routes.routes());
app.use(routes.allowedMethods());

await app.listen({ port: 8080 });
