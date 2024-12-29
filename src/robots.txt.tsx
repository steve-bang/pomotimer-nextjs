import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req : NextApiRequest, res : NextApiResponse) {
  res.setHeader("Content-Type", "text/plain");
  res.write(`User-agent: *
Allow: /

Sitemap: https://pomotimer-nextjs.vercel.app/sitemap.xml`);
  res.end();
}
// change this lines to real host. Samuel.
