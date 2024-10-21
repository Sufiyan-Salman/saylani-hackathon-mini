"use client"
import { useState, useEffect } from 'react';
import { doc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import { useParams } from 'next/navigation';

export default function Project() {
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [agenda, setAgenda] = useState('');
  const [agendas, setAgendas] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProjectData = async () => {
      const projectDoc = await getDoc(doc(db, 'projects', slug));
      setProject(projectDoc.data());

      const membersSnapshot = await getDocs(collection(db, 'projects', slug, 'members'));
      setMembers(membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const agendasSnapshot = await getDocs(collection(db, 'projects', slug, 'agendas'));
      setAgendas(agendasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProjectData();
  }, [slug]);

  const handleCreateAgenda = async () => {
    await addDoc(collection(db, 'projects', slug, 'agendas'), {
      agendaName: agenda
    });
    setAgenda('');
  };

  return (
    <div className="p-6 ">
      {project && (
        <>
          <h2 className="text-2xl mb-6">{project.projectName}</h2>
          <h3 className="text-xl mb-4">Members</h3>
          <ul className="mb-6">
            {members.map((member) => (
              <li key={member.id} className="mb-2">
                {member.name}
              </li>
            ))}
          </ul>

          <h3 className="text-xl mb-4">Agendas</h3>
          <input
            type="text"
            className="border p-2 mb-4 text-black w-full"
            placeholder="New Agenda"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
            onClick={handleCreateAgenda}
          >
            Create Agenda
          </button>

          <ul>
            {agendas.map((agenda) => (
              <li key={agenda.id} className="mb-2">
                {agenda.agendaName}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
