import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  applyActionCode,
  confirmPasswordReset,
  signOut,
  fetchSignInMethodsForEmail,
  AuthError,
  ActionCodeSettings
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const actionCodeSettings: ActionCodeSettings = {
  url: window.location.origin + '/verify-email',
  handleCodeInApp: true,
};

// ... rest of the existing code remains the same ...

export const authService = {
  // ... existing methods remain the same ...

  register: async (email: string, password: string) => {
    return withRetry(async () => {
      try {
        const emailExists = await authService.checkEmailExists(email);
        if (emailExists) {
          throw new Error('An account with this email already exists');
        }
        
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        const username = `${email.substring(0, 3).toUpperCase()}${Math.random().toString().substring(2, 8)}`;
        
        // Send verification email immediately after registration
        await sendEmailVerification(user, actionCodeSettings);
        
        await setDoc(doc(db, 'users', user.uid), {
          username,
          email,
          emailVerified: false, // Set to false initially
          createdAt: new Date().toISOString()
        });

        return { user, username };
      } catch (error) {
        console.error('Register error:', error);
        if (error instanceof Error && 'code' in error) {
          throw new Error(handleFirebaseError(error as AuthError));
        }
        throw error;
      }
    });
  },

  login: async (email: string, password: string) => {
    return withRetry(async () => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!user.emailVerified) {
          // Resend verification email if not verified
          await sendEmailVerification(user, actionCodeSettings);
          throw new Error('Please verify your email first. A new verification email has been sent.');
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (!userDoc.exists()) {
          throw new Error('User data not found');
        }

        return { user, userData: userDoc.data() };
      } catch (error) {
        console.error('Login error:', error);
        if (error instanceof Error && 'code' in error) {
          throw new Error(handleFirebaseError(error as AuthError));
        }
        throw error;
      }
    });
  },

  resendVerificationEmail: async () => {
    return withRetry(async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error('No user found');
        }
        await sendEmailVerification(user, actionCodeSettings);
      } catch (error) {
        console.error('Resend verification error:', error);
        if (error instanceof Error && 'code' in error) {
          throw new Error(handleFirebaseError(error as AuthError));
        }
        throw error;
      }
    });
  },

  verifyEmail: async (code: string) => {
    return withRetry(async () => {
      try {
        await applyActionCode(auth, code);
        const user = auth.currentUser;
        if (user) {
          await setDoc(doc(db, 'users', user.uid), { emailVerified: true }, { merge: true });
        }
      } catch (error) {
        console.error('Verify email error:', error);
        if (error instanceof Error && 'code' in error) {
          throw new Error(handleFirebaseError(error as AuthError));
        }
        throw error;
      }
    });
  },

  // ... rest of the existing methods remain the same ...
};