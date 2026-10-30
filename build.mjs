import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { posts } from './content.js';

const output = new URL('./dist/', import.meta.url);
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'app.js', 'content.js', 'styles.css', 'assets', 'REFERENCE-LICENSE.txt']) {
  cpSync(new URL(file, import.meta.url), new URL(file, output), { recursive: true });
}
writeFileSync(new URL('robots.txt', output), 'User-agent: *\nAllow: /\nSitemap: https://shantanu-patil.com/sitemap.xml\n');
const paths = ['/', '/?page=timeline', '/?page=reading', '/?page=design', '/writing', ...posts.map(post => '/writing/' + post.slug)];
writeFileSync(new URL('sitemap.xml', output), '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + paths.map(path => `  <url><loc>https://shantanu-patil.com${path.replaceAll('&', '&amp;')}</loc></url>`).join('\n') + '\n</urlset>\n');
console.log('Built static website in dist/');
