// Vercel Edge Middleware — password-protects the whole site with HTTP Basic Auth.
// The username/password are read from Vercel Environment Variables, so they are
// NEVER stored in the code: set SITE_USER and SITE_PASSWORD in the Vercel dashboard
// (Project → Settings → Environment Variables). Works on the free (Hobby) plan.

export const config = {
  // run on every request
  matcher: '/:path*',
};

export default function middleware(request) {
  const USER = process.env.SITE_USER || 'jama';
  const PASS = process.env.SITE_PASSWORD || '';

  const header = request.headers.get('authorization');
  if (header && header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(':');
      const user = decoded.slice(0, i);
      const pass = decoded.slice(i + 1);
      if (PASS && user === USER && pass === PASS) {
        return; // authorized — continue to the site
      }
    } catch (e) {
      // fall through to the 401 below
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="JAMA — Private Preview", charset="UTF-8"',
    },
  });
}
