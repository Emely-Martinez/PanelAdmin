import { useState, useEffect } from 'react';
import { pb } from './admin/pocketbase';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(pb.authStore.isValid);

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange(() => {
      setIsLoggedIn(pb.authStore.isValid);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return <AdminDashboard onLogout={() => setIsLoggedIn(false)} />;
}