export default function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    
    // In a real application with server-side sessions, you would invalidate the session here
    
    return res.status(200).json({ message: 'Logged out successfully' });
  }