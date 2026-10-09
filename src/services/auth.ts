import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { UserProfile } from '../types';

export const ADMIN_EMAIL = 'ae8860971@gmail.com';

const provider = new GoogleAuthProvider();
// Scopes for Google Calendar, Meet, and Gmail
provider.addScope('https://www.googleapis.com/auth/calendar.events');
provider.addScope('https://www.googleapis.com/auth/meetings.space.created');
provider.addScope('https://www.googleapis.com/auth/gmail.send');

// In-memory token cache (strictly not stored in localStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const initAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string | null; profile: UserProfile }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;

    const profile = await syncUserProfile(result.user);
    return { user: result.user, accessToken: cachedAccessToken, profile };
  } catch (error: any) {
    console.error('Google Sign In error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const emailSignIn = async (email: string, pass: string): Promise<{ user: User; profile: UserProfile }> => {
  const result = await signInWithEmailAndPassword(auth, email, pass);
  const profile = await syncUserProfile(result.user);
  return { user: result.user, profile };
};

export const emailSignUp = async (email: string, pass: string, name: string): Promise<{ user: User; profile: UserProfile }> => {
  const result = await createUserWithEmailAndPassword(auth, email, pass);
  const profile = await syncUserProfile(result.user, name);
  return { user: result.user, profile };
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export async function syncUserProfile(user: User, customName?: string): Promise<UserProfile> {
  const userRef = doc(db, 'users', user.uid);
  const userSnap = await getDoc(userRef);

  const now = new Date();
  const isAdmin = user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (userSnap.exists()) {
    const existing = userSnap.data() as UserProfile;
    // Auto-elevate admin email to admin role
    const updatedRole = isAdmin ? 'admin' : existing.role || 'student';
    
    // Check trial expiration
    let updatedMembershipStatus = existing.membershipStatus;
    if (existing.membershipStatus === 'trial' && existing.trialEndDate) {
      if (new Date(existing.trialEndDate) < now) {
        updatedMembershipStatus = 'expired';
      }
    }

    const updatedProfile: UserProfile = {
      ...existing,
      email: user.email || existing.email,
      displayName: user.displayName || customName || existing.displayName || 'Student',
      photoURL: user.photoURL || existing.photoURL || '',
      role: updatedRole,
      membershipStatus: updatedMembershipStatus,
      lastLoginAt: now.toISOString()
    };

    await updateDoc(userRef, {
      role: updatedRole,
      membershipStatus: updatedMembershipStatus,
      lastLoginAt: now.toISOString(),
      displayName: updatedProfile.displayName
    });

    return updatedProfile;
  } else {
    // New user initial setup: 3-day trial
    const trialEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const newProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || customName || (isAdmin ? 'Admin Ahmed Nabil' : 'Arabic Learner'),
      photoURL: user.photoURL || '',
      role: isAdmin ? 'admin' : 'student',
      membershipPlan: 'Trial Access',
      membershipStatus: 'trial',
      trialStartDate: now.toISOString(),
      trialEndDate: trialEnd.toISOString(),
      allowedLessons: ['ch1-unit1', 'ch1-unit2'], // Free starter units
      allowedBooks: ['book-intro-arabic-1'],
      createdAt: now.toISOString(),
      lastLoginAt: now.toISOString()
    };

    await setDoc(userRef, newProfile);
    return newProfile;
  }
}
