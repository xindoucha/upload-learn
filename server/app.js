const Koa = require('koa');
const path = require('path');
const static = require('koa-static');

const app = new Koa();

const staticPath = '../public'

app.use(static(
  path.join( __dirname,  staticPath)
))

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
});

app.listen(3000);
console.log('app started at port 3000...');