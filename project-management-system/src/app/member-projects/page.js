'use client'
import { useState, useEffect } from 'react';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebaseConfig';

export default function memberProjects() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for auth state changes to get the current user
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login'); // If not logged in, redirect to login
      }
    });
    
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (user) {
      // Fetch projects where the user is listed as a member
      const fetchProjects = async () => {
        const projectsRef = collection(db, 'projects');
        const membersQuery = query(
          collection(db, 'projects'),
          where('members', 'array-contains', user.uid) // Assuming we store user IDs in the members field
        );
        const querySnapshot = await getDocs(membersQuery);
        const memberProjects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProjects(memberProjects);
      };
      fetchProjects();
    }
  }, [user]);

  const handleProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  return (
    <div className="flex flex-col items-center h-screen text-black bg-gray-100">
      <h2 className="text-2xl mb-6">Your Member Projects</h2>
      {projects.length === 0 ? (
        <p>No projects found where you are a member.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="bg-white p-4 w-1/2 mb-4 rounded shadow-md cursor-pointer"
            onClick={() => handleProjectClick(project.id)}
          >
            <h3 className="text-lg">{project.projectName}</h3>
            <p>{project.projectType}</p>
          </div>
        ))
      )}
    </div>
  );
}
