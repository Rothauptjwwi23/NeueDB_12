import userStore from '@/lib/userStore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, password } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Create user with explicit role (always 'user' for registration)
    const user = await userStore.createUser({ 
      name, 
      email, 
      password,
      role: 'user' // Explicitly set
    });
    
    return res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // Add role in the response
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message === 'User with this email already exists') {
      return res.status(409).json({ message: error.message });
    }
    
    return res.status(500).json({ message: 'Internal server error' });
  }
}