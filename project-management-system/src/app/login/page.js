"use client"
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseConfig';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const res=   await signInWithEmailAndPassword(auth, email, password);
        console.log(res)
        localStorage.setItem('tokenid',JSON.stringify(res._tokenResponse.idToken))
      router.push('/dashboard');
      
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="flex justify-center text-black items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Log In</h2>
        <input
          className="border p-2 mb-4 w-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
}
