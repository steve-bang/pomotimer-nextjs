export default function handler(req, res) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /

Sitemap: https://pomodorostime.com/sitemap.xml`);
  res.end();
}
// change this lines to real host. Samuel.
