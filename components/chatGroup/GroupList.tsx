"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

const GroupList = (props: Props) => {
    const router = useRouter();
    useEffect(() => {
      const getres = async() => {
        const res = await fetch('http://localhost:8000/api/chatSpace/group/get', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        if(!res.ok){
          router.push("/");
        } else {
        }  
      }
      getres();
    }, []);  
  return (
    <div>GroupList</div>
  )
}

export default GroupList