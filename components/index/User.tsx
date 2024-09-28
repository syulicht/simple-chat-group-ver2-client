"use client"
import { supabase } from '@/utils/supabase/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from "../../app/styles.module.css"
import { useRouter } from 'next/navigation';

type Props = {
    user : {
        email: string | null;
        id: number;
        name: string | null;
        quote: string | null;
        password: string | null;
    }
}

const User = (props: Props) => {
    const [url, setUrl] = useState("");
    const router = useRouter();
    const deleteUser = async() =>{
        await fetch('http://localhost:8000/api/delete',  {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({id : props.user.id})
        });
        window.location.reload();
    }

    const goToChatSpace = () => {
        router.push(`/login?name=${props.user.name}`, {});
    }

    useEffect(()=>{
    }, []);
  return (
    <tr className={''}>
        <td>
            {props.user.name}
        </td>
        <td>
            {props.user.quote}
        </td>
        <td>
            {props.user.email}
        </td>
        <td onClick={deleteUser}>
            <Image src={"/delete.png"} width={30} height={30} alt=''/>
        </td>
        <td onClick={goToChatSpace}>
            <Image src={"/login.png"} width={30} height={30} alt=''/>
        </td>
    </tr>
  )
}

export default User