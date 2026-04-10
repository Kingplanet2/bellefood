// ─────────────────────────────────────────────
// ADMIN AUTH MIDDLEWARE
// Simple password-based protection for admin routes
// ─────────────────────────────────────────────

function verifyAdmin(req, res, next) {
  const adminPassword = req.headers['x-admin-password'];

  if (!adminPassword) {
    return res.status(401).json({ error: 'Admin password required' });
  }

  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Invalid admin password' });
  }

  next();
}

module.exports = { verifyAdmin };