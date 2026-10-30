import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.woff2':'font/woff2','.mp4':'video/mp4','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
const server = http.createServer((req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const isPage = pathname === '/' || /^\/writing(?:\/[^/.]+)?\/?$/.test(pathname);
    const file = isPage ? path.join(root,'index.html') : path.resolve(root, '.' + pathname);
    if (!file.startsWith(root) || !['GET','HEAD'].includes(req.method)) { res.writeHead(403); return res.end('Forbidden'); }
    const stat = statSync(file);
    if (!stat.isFile() || !mime[path.extname(file)]) { res.writeHead(404); return res.end('Not found'); }
    const headers = {'Content-Type':mime[path.extname(file)],'Cache-Control':'no-cache','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
    let start=0, end=stat.size-1, status=200;
    if(req.headers.range) {
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match) {res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      start=match[1]?Number(match[1]):Math.max(0,stat.size-Number(match[2]));
      end=match[1]&&match[2]?Math.min(Number(match[2]),end):end;
      if(start>end || start>=stat.size) {res.writeHead(416,{'Content-Range':`bytes */${stat.size}`});return res.end();}
      status=206;headers['Content-Range']=`bytes ${start}-${end}/${stat.size}`;
    }
    headers['Content-Length']=end-start+1;res.writeHead(status,headers);
    if(req.method==='HEAD') return res.end();
    createReadStream(file,{start,end}).pipe(res);
  } catch {res.writeHead(404);res.end('Not found');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Local preview: http://localhost:${port}\nPress Ctrl+C to stop.`));
server.on('error',e=>{console.error(e.code==='EADDRINUSE'?`Port ${port} is busy. Try PORT=4174 npm run dev.`:e.message);process.exitCode=1;});
