export default async function handler(req, res) {
  // تنظیم CORS برای دسترسی صفحات
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  const dbPath = path ? path : '';
  const firebaseUrl = `https://proforosh-default-rtdb.firebaseio.com/${dbPath}.json`;

  try {
    if (req.method === 'GET') {
      const response = await fetch(firebaseUrl);
      const data = await response.json();
      return res.status(200).json(data);
    } else if (req.method === 'POST' || req.method === 'PUT') {
      const response = await fetch(firebaseUrl, {
        method: req.method,
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
