"use client"
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectType, setProjectType] = useState('');
  const [members, setMembers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users for the members dropdown
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'projects'), {
        projectName,
        projectType,
        members
      });
      alert('Project Created Successfully');
    } catch (error) {
      console.error('Error creating project:', error.message);
    }
  };

  return (
    <div className="flex justify-center text-black items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4">Create Project</h2>
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <input
          className="border p-2 mb-4 w-full"
          type="text"
          placeholder="Project Type"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        />
        <select
          className="border p-2 mb-4 w-full"
          multiple
          value={members}
          onChange={(e)      => setMembers(Array.from(e.target.selectedOptions, option => option.value))}
          >
            <option value="" disabled>Select Members</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            type="submit"
          >
            Create Project
          </button>
        </form>
      </div>
    );
  }
