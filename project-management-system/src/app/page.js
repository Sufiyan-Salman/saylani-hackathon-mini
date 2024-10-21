"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, createUserWithEmailAndPassword } from '@/lib/firebaseConfig';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    console.log(email,password,name)
    e.preventDefault();
    try {
     const res= await createUserWithEmailAndPassword(auth, email, password);
     console.log(res)
      router.push('/login');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  return (
    <div className="flex justify-center text-black items-center h-screen bg-gray-100">
    <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl mb-4">Sign Up</h2>
      <input
        className="border p-2 mb-4 w-full"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
        Sign Up
      </button>
    </form>
  </div>
  );
}
