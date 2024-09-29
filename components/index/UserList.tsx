"use client"
import { Database } from '@/types/supabasetype'
import { supabase } from '@/utils/supabase/supabase'
import React, { useEffect, useState } from 'react'
import styles from "../../app/styles.module.css"
import User from './User'
import { headers } from 'next/headers'
import Loading from '../Loading'

type Props = {}

type User = {
    email: string | null;
    id: number;
    name: string | null;
    quote: string | null;
    password: string | null;
};

const UserList = (props: Props) => {
    const [data, setData] = useState<User[]>([]);
    const [image, setImage] = useState<{url: string, id: number}[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const webSocket = () => {
        }
        const firstget = async() =>{
            try{
                const data = await (await fetch("http://localhost:8000/api/get", {
                    method: "GET",
                    headers: {
                        "Content-Type" : "application/json"
                    }
                })).json();
                setData(data);
            } catch(error){
                console.log(error);
                return;
            } finally{
                setTimeout(() => setLoading(false), 1000);
            }
        }
        firstget();
        webSocket();
    }, [])
  return (
    <div className={styles.userList} style={loading?{overflow: 'hidden'} : {overflow: 'auto'}}>
    {loading? <Loading /> :
    <table>
        <thead>
        <tr>
            <th>Name</th>
            <th>Quote</th>
            <th>Email</th>
            <th>Delete</th>
            <th>Login</th>
        </tr>
        </thead>
        <tbody>
        {data.map(user => {return <User key={user.id} user={user} />})}
        </tbody>
    </table>
    }
    </div>
  )
}

export default UserList