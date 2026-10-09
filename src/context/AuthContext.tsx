import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import {
  initAuth,
  googleSignIn,
  emailSignIn,
  emailSignUp,
  logout,
  getAccessToken,
  syncUserProfile,
  ADMIN_EMAIL
} from '../services/auth';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  token: string | null;
  studentPasscode: string;
  setStudentPasscode: (code: string) => void;
  signInWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string) => Promise<void>;
  loginWithStudentCode: (code: string, studentName?: string) => Promise<boolean>;
  loginAsTeacherAdmin: () => Promise<void>;
  logoutUser: () => Promise<void>;
  canAccessLesson: (lessonId: string, isTrialFree?: boolean) => boolean;
  canAccessBook: (bookId: string) => boolean;
  canDownloadBook: (bookId: string) => boolean;
  canAccessLiveClasses: () => boolean;
  activateTrial: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateUserPermissions: (userId: string, data: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [studentPasscode, setStudentPasscodeState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('alnabeel_student_passcode') || '12345';
    }
    return '12345';
  });

  const setStudentPasscode = (code: string) => {
    setStudentPasscodeState(code);
    if (typeof window !== 'undefined') {
      localStorage.setItem('alnabeel_student_passcode', code);
    }
  };

  const fetchProfile = async (firebaseUser: User) => {
    try {
      const p = await syncUserProfile(firebaseUser);
      setProfile(p);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = initAuth(
      async (authenticatedUser, accessToken) => {
        setUser(authenticatedUser);
        setToken(accessToken);
        await fetchProfile(authenticatedUser);
        setLoading(false);
      },
      () => {
        if (typeof window !== 'undefined') {
          const studentSession = localStorage.getItem('alnabeel_student_session');
          if (studentSession) {
            try {
              const parsed = JSON.parse(studentSession);
              setProfile(parsed);
              setLoading(false);
              return;
            } catch (e) {
              localStorage.removeItem('alnabeel_student_session');
            }
          }
        }
        const storedAdminPref = typeof window !== 'undefined' ? localStorage.getItem('alnabeel_admin_session') : null;
        // Default to active Teacher Admin (ae8860971@gmail.com) unless explicitly signed out with 'false'
        if (storedAdminPref !== 'false') {
          // Restore or activate Teacher Admin Ahmed Nabil Al-Nahrawy session
          setProfile({
            uid: 'admin-ae8860971',
            email: ADMIN_EMAIL,
            displayName: 'المعلم أحمد نبيل النحراوي (المشرف العام)',
            photoURL: '',
            role: 'admin',
            membershipPlan: 'Teacher & Admin Full Access',
            membershipStatus: 'active',
            allowedLessons: ['ch1-unit1', 'ch1-unit2', 'ch1-unit3', 'ch2-unit1', 'ch2-unit2', 'ch2-unit3', 'ch3-unit1', 'ch3-unit2', 'ch3-unit3', 'ch4-unit1', 'ch4-unit2', 'ch4-unit3', 'ch5-unit1', 'ch5-unit2', 'ch5-unit3', 'ch6-unit1', 'ch6-unit2', 'ch6-unit3', 'ch7-unit1', 'ch7-unit2', 'ch7-unit3', 'ch8-unit1', 'ch8-unit2', 'ch8-unit3', 'ch9-unit1', 'ch9-unit2', 'ch9-unit3', 'ch10-unit1', 'ch10-unit2', 'ch10-unit3'],
            allowedBooks: ['book-intro-arabic-1'],
            createdAt: '2026-09-01T00:00:00Z',
            lastLoginAt: new Date().toISOString()
          });
          if (typeof window !== 'undefined') {
            localStorage.setItem('alnabeel_admin_session', 'true');
          }
        } else {
          setUser(null);
          setProfile(null);
          setToken(null);
        }
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const loginAsTeacherAdmin = async () => {
    setLoading(true);
    try {
      const adminProfile: UserProfile = {
        uid: 'admin-ae8860971',
        email: ADMIN_EMAIL,
        displayName: 'المعلم أحمد نبيل النحراوي (المشرف العام)',
        photoURL: '',
        role: 'admin',
        membershipPlan: 'Teacher & Admin Full Access',
        membershipStatus: 'active',
        allowedLessons: ['ch1-unit1', 'ch1-unit2', 'ch1-unit3', 'ch2-unit1', 'ch2-unit2', 'ch2-unit3', 'ch3-unit1', 'ch3-unit2', 'ch3-unit3', 'ch4-unit1', 'ch4-unit2', 'ch4-unit3', 'ch5-unit1', 'ch5-unit2', 'ch5-unit3', 'ch6-unit1', 'ch6-unit2', 'ch6-unit3', 'ch7-unit1', 'ch7-unit2', 'ch7-unit3', 'ch8-unit1', 'ch8-unit2', 'ch8-unit3', 'ch9-unit1', 'ch9-unit2', 'ch9-unit3', 'ch10-unit1', 'ch10-unit2', 'ch10-unit3'],
        allowedBooks: ['book-intro-arabic-1'],
        createdAt: '2026-09-01T00:00:00Z',
        lastLoginAt: new Date().toISOString()
      };
      setProfile(adminProfile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('alnabeel_admin_session', 'true');
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const res = await googleSignIn();
      setUser(res.user);
      setToken(res.accessToken);
      setProfile(res.profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setLoading(true);
    try {
      const res = await emailSignIn(email, pass);
      setUser(res.user);
      setProfile(res.profile);
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, pass: string, name: string) => {
    setLoading(true);
    try {
      const res = await emailSignUp(email, pass, name);
      setUser(res.user);
      setProfile(res.profile);
    } finally {
      setLoading(false);
    }
  };

  const loginWithStudentCode = async (code: string, studentName?: string): Promise<boolean> => {
    setLoading(true);
    try {
      if (code.trim() !== studentPasscode.trim()) {
        throw new Error(`رمز الدخول غير صحيح. يرجى إدخال الرقم المتفق عليه مع المعلم (مثل: ${studentPasscode})`);
      }
      const cleanName = studentName?.trim() || 'طالب منصة النبيل';
      const studentProfile: UserProfile = {
        uid: `student-passcode-${Date.now()}`,
        email: `${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '') || 'student'}@alnabeel.edu`,
        displayName: cleanName,
        photoURL: '',
        role: 'student',
        membershipPlan: `كود وصول الطالب (${studentPasscode})`,
        membershipStatus: 'active',
        allowedLessons: [
          'ch1-unit1', 'ch1-unit2', 'ch1-unit3',
          'ch2-unit1', 'ch2-unit2', 'ch2-unit3',
          'ch3-unit1', 'ch3-unit2', 'ch3-unit3',
          'ch4-unit1', 'ch4-unit2', 'ch4-unit3',
          'ch5-unit1', 'ch5-unit2', 'ch5-unit3',
          'ch6-unit1', 'ch6-unit2', 'ch6-unit3',
          'ch7-unit1', 'ch7-unit2', 'ch7-unit3',
          'ch8-unit1', 'ch8-unit2', 'ch8-unit3',
          'ch9-unit1', 'ch9-unit2', 'ch9-unit3',
          'ch10-unit1', 'ch10-unit2', 'ch10-unit3'
        ],
        allowedBooks: ['book-intro-arabic-1'],
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };
      setProfile(studentProfile);
      if (typeof window !== 'undefined') {
        localStorage.setItem('alnabeel_student_session', JSON.stringify(studentProfile));
        localStorage.setItem('alnabeel_admin_session', 'false');
      }
      return true;
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('alnabeel_admin_session', 'false');
      localStorage.removeItem('alnabeel_student_session');
    }
    await logout();
    setUser(null);
    setProfile(null);
    setToken(null);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

  const isAdmin = Boolean(
    profile?.role === 'admin' ||
    user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  /**
   * Granular Lesson Access Control
   * 1. Admin always has full access.
   * 2. Active memberships have full access.
   * 3. Valid Trial users have access to free trial lessons (or custom allowed lessons).
   * 4. Users with explicit manual admin permission grants.
   * 5. Unauthenticated visitors can only view trial-free lessons.
   */
  const canAccessLesson = (lessonId: string, isTrialFree: boolean = false): boolean => {
    if (isAdmin) return true;

    // Check active paid membership
    if (profile?.membershipStatus === 'active') return true;

    // Check manual override permissions
    if (profile?.allowedLessons?.includes(lessonId)) return true;

    // Check active trial
    if (profile?.membershipStatus === 'trial') {
      const now = new Date();
      const trialValid = profile.trialEndDate ? new Date(profile.trialEndDate) > now : true;
      if (trialValid && (isTrialFree || profile.allowedLessons?.includes(lessonId))) {
        return true;
      }
    }

    // Default: only public trial preview lessons are visible
    return isTrialFree;
  };

  const canAccessBook = (bookId: string): boolean => {
    if (isAdmin) return true;
    if (profile?.membershipStatus === 'active') return true;
    if (profile?.allowedBooks?.includes(bookId)) return true;
    return false;
  };

  const canDownloadBook = (bookId: string): boolean => {
    if (isAdmin) return true;
    if (profile?.membershipStatus === 'active' && profile.membershipPlan?.toLowerCase().includes('premium')) return true;
    if (profile?.membershipStatus === 'active' && profile.membershipPlan?.toLowerCase().includes('vip')) return true;
    if (profile?.allowedBooks?.includes(bookId)) return true;
    return false;
  };

  const canAccessLiveClasses = (): boolean => {
    if (isAdmin) return true;
    if (profile?.membershipStatus === 'active') return true;
    return false;
  };

  const activateTrial = async () => {
    if (!user || !profile) return;
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    const userRef = doc(db, 'users', user.uid);
    await updateDoc(userRef, {
      membershipStatus: 'trial',
      trialStartDate: now.toISOString(),
      trialEndDate: trialEnd.toISOString()
    });
    await refreshProfile();
  };

  const updateUserPermissions = async (userId: string, data: Partial<UserProfile>) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
    if (user?.uid === userId) {
      await refreshProfile();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        token,
        studentPasscode,
        setStudentPasscode,
        signInWithGoogle,
        loginWithEmail,
        registerWithEmail,
        loginWithStudentCode,
        loginAsTeacherAdmin,
        logoutUser,
        canAccessLesson,
        canAccessBook,
        canDownloadBook,
        canAccessLiveClasses,
        activateTrial,
        refreshProfile,
        updateUserPermissions
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
