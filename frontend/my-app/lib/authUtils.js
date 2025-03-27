// lib/authUtils.js

/**
 * Prüft, ob der aktuelle Benutzer Admin-Rechte hat
 * @returns {boolean} True, wenn der Benutzer Admin ist, sonst false
 */
export function isAdmin() {
    // Versuche Benutzer aus localStorage zu holen (Client-side only)
    if (typeof window !== 'undefined') {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          return user && user.role === 'admin';
        }
      } catch (error) {
        console.error('Fehler beim Prüfen der Admin-Rechte:', error);
        return false;
      }
    }
    return false;
  }
  
  /**
   * Prüft, ob der Benutzer eingeloggt ist
   * @returns {boolean} True, wenn der Benutzer eingeloggt ist, sonst false
   */
  export function isAuthenticated() {
    if (typeof window !== 'undefined') {
      try {
        const userJson = localStorage.getItem('user');
        return !!userJson; // Konvertiert zu boolean (true wenn vorhanden)
      } catch (error) {
        console.error('Fehler beim Prüfen der Authentifizierung:', error);
        return false;
      }
    }
    return false;
  }
  
  /**
   * Prüft, ob der Benutzer die angegebene Rolle hat
   * @param {string} role - Die zu prüfende Rolle
   * @returns {boolean} True, wenn der Benutzer die Rolle hat, sonst false
   */
  export function hasRole(role) {
    if (typeof window !== 'undefined') {
      try {
        const userJson = localStorage.getItem('user');
        if (userJson) {
          const user = JSON.parse(userJson);
          return user && user.role === role;
        }
      } catch (error) {
        console.error(`Fehler beim Prüfen der Rolle ${role}:`, error);
        return false;
      }
    }
    return false;
  }
  
  /**
   * Holt den aktuellen Benutzer aus dem lokalen Speicher
   * @returns {Object|null} Benutzerobjekt oder null, wenn nicht eingeloggt
   */
  export function getCurrentUser() {
    if (typeof window !== 'undefined') {
      try {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
      } catch (error) {
        console.error('Fehler beim Holen des Benutzers:', error);
        return null;
      }
    }
    return null;
  }