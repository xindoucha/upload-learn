const Koa = require("koa");
const path = require("path");
const static = require("koa-static");
const Router = require("@koa/router");
const Bodyparser = require("koa-bodyparser");
const { writeFile } = require("./util");

const app = new Koa();
const router = new Router();
const bodyparser = new Bodyparser();

const staticPath = "../public";

app.use(static(path.join(__dirname, staticPath)));

app.use(async (ctx, next)=> {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200; 
  } else {
    await next();
  }
});

router.post("/upload1", async (ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = "success";
});

router.post("/upload2", async (ctx, next) => {
  const arr = [];
  ctx.req.on("data", (buffer) => {
    arr.push(buffer);
  });

  ctx.req.on("end", () => {
    const buffer = Buffer.concat(arr);
    const content = buffer.toString();
    writeFile("upload.txt", content);
  });
  ctx.body = "success";
});

app.use(bodyparser);
app.use(router.routes());
app.listen(3000);
console.log("app started at port 3000...");
