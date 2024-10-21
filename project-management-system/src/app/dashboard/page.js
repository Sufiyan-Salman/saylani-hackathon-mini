"use client"
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex justify-center text-black items-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h2 className="text-2xl mb-6">Dashboard</h2>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded w-full mb-4"
          onClick={() => router.push('/create-project')}
        >
          Create Project
        </button>
        <button
          className="bg-green-500 text-white py-2 px-4 rounded w-full"
          onClick={() => router.push('/view-project')}
        >
          View Projects
        </button>
      </div>
    </div>
  );
}
