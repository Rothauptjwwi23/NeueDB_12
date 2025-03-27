const { getDatabase } = require('./db');

const userStore = {
  async createUser(userData) {
    try {
      const usersDb = await getDatabase('users');
      
      // Check if user already exists
      const existingUser = await this.findUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      const user = {
        _id: `user_${Date.now()}`,
        name: userData.name,
        email: userData.email,
        password: userData.password, // Plain text password (not recommended for production)
        createdAt: new Date().toISOString(),
        role: 'user' // Always set to 'user' during registration
      };
      
      const result = await usersDb.insert(user);
      
      // Remove password before returning user object
      const { password, ...userWithoutPassword } = user;
      return { 
        ...userWithoutPassword, 
        _rev: result.rev 
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },
  
  async findUserByEmail(email) {
    try {
      const usersDb = await getDatabase('users');
      
      const result = await usersDb.find({
        selector: {
          email: email
        }
      });
      
      return result.docs.length > 0 ? result.docs[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  },

  async authenticateUser(email, password) {
    try {
      const user = await this.findUserByEmail(email);
      
      if (!user) {
        return null;
      }
      
      // Simple password comparison (VERY INSECURE - only for development!)
      if (user.password === password) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
      
      return null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  },

  // Method to update user role (for admin purposes)
  async updateUserRole(userId, newRole) {
    try {
      const usersDb = await getDatabase('users');
      
      // Fetch the current user document
      const user = await usersDb.get(userId);
      
      // Update only the role
      const updatedUser = {
        ...user,
        role: newRole
      };
      
      // Save the updated document
      const result = await usersDb.insert(updatedUser);
      
      return {
        _id: userId,
        role: newRole,
        _rev: result.rev
      };
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  }
};

module.exports = userStore;