export const validatePassword = (password: string): string | null => {
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null; // Password is valid
  };