"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Authhandler({ children }) {
  const pathname = usePathname();
  const router = useRouter();
console.log(pathname)
  useEffect(() => {
      const token = localStorage.getItem('tokenid');
      if (!token && (pathname !== '/' || pathname!=='/login')) {
        router.push('/');
      }
      else if (token && (pathname === '/' || pathname==='/login')){
        router.push('/create-project')
      }
  }, [router, pathname]);

  useEffect(() => {

      const token = localStorage.getItem('tokenid');
      if (!token) {
          localStorage.removeItem('tokenid');
        } 
  });

  return (
    <div>

    </div>
      )
}
