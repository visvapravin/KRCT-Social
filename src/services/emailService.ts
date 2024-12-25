import { auth } from '../lib/firebase';
import { 
  sendEmailVerification as sendFirebaseEmailVerification,
  sendPasswordResetEmail
} from 'firebase/auth';

export const emailService = {
  sendVerificationEmail: async () => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user found');
    
    try {
      await sendFirebaseEmailVerification(user, {
        url: `${window.location.origin}/verify-email`,
        handleCodeInApp: true,
      });
    } catch (error) {
      throw new Error('Failed to send verification email');
    }
  },

  sendPasswordResetEmail: async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
      });
    } catch (error) {
      throw new Error('Failed to send password reset email');
    }
  },

  verifyEmail: async (code: string) => {
    const user = auth.currentUser;
    if (!user) throw new Error('No user found');

    try {
      // Apply the verification code
      await auth.applyActionCode(code);
      // Reload the user to get updated email verification status
      await user.reload();
      return user.emailVerified;
    } catch (error) {
      throw new Error('Invalid or expired verification code');
    }
  }
};