import { getDatabase } from './db';

// Database operations for users
const userStore = {
  // Create a new user
  async createUser(userData) {
    try {
      // Get the users database
      const usersDb = await getDatabase('users');
      
      // Check if user with this email already exists
      const existingUser = await this.findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create user document with default role as "user"
      const user = {
        _id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password, // In production, this should be hashed!
        role: userData.role || 'user', // Default role is 'user', admin must be set explicitly
        createdAt: new Date().toISOString(),
        type: 'user' // Behalte 'type' für die Dokumenttyp-Unterscheidung bei
      };
      
      const result = await usersDb.insert(user);
      return { ...user, _rev: result.rev, password: undefined };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  // Find user by email
  async findUserByEmail(email) {
    try {
      const usersDb = await getDatabase('users');
      
      // Query the database by email
      const result = await usersDb.find({
        selector: {
          email: email,
          type: 'user'
        }
      });
      
      return result.docs.length > 0 ? result.docs[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },
  
  // Authenticate user
// Authenticate user
async authenticateUser(email, password) {
  try {
    const user = await this.findUserByEmail(email);

    if (!user) {
      return null;
    }

    // Klartext-Vergleich
    if (user.password === password) {
      // Passwort entfernen vor Rückgabe
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
},

  
  // Check if a user has admin role
  async isAdmin(userId) {
    try {
      const usersDb = await getDatabase('users');
      
      // Get the user by ID
      const user = await usersDb.get(userId).catch(() => null);
      
      // Check if user exists and has admin role
      return user && user.role === 'admin';
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  },
  
  // Get user by ID
  async getUserById(userId) {
    try {
      const usersDb = await getDatabase('users');
      const user = await usersDb.get(userId).catch(() => null);
      
      if (user) {
        // Don't return the password
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }
  }
};

export default userStore;