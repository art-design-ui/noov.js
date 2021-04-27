import ssrMiddleware from '../middlewares/ssr';
import Koa from 'koa';
import koaStatic from 'koa-static';
import proConfig from '../../common/pro-config.js';

const port = proConfig.nodeServerPort || process.env.PORT;

const app = new Koa();


// 设置可访问的静态资源
// TODO 生产时打开
// app.use(koaStatic('./dist/static'));


//ssr 中间件
app.use(ssrMiddleware);

//启动服务
app.listen(port);

console.log('server is start .',`http://localhost:${port}`);
