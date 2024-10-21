"use client"
import { useState, useEffect } from 'react';

import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebaseConfig';


export default function OwnerProjects() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsSnapshot = await getDocs(collection(db, 'projects'));
      const projectsList = projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsList);
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    router.push(`/project/${projectId}`);
  };

  return (
    <div className="flex flex-col text-black items-center h-screen bg-gray-100">
      <h2 className="text-2xl mb-6">Your Owned Projects</h2>
      {projects?.map((project) => (
        <div
          key={project.id}
          className="bg-white p-4 w-1/2 mb-4 rounded shadow-md cursor-pointer"
          onClick={() => handleProjectClick(project.id)}
        >
          <h3 className="text-lg">{project.projectName}</h3>
          <p>{project.projectType}</p>
        </div>
      ))}
    </div>
  );
}
