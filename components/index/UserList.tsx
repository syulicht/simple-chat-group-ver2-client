"use client"
import { Database } from '@/types/supabasetype'
import { supabase } from '@/utils/supabase/supabase'
import React, { useEffect, useState } from 'react'
import styles from "../../app/styles.module.css"
import User from './User'

type Props = {}

type User = {
    created_at: string;
    delete: boolean | null;
    email: string | null;
    id: number;
    name: string | null;
    quote: string | null;
};

const UserList = (props: Props) => {
    const [data, setData] = useState<Database['public']['Tables']['users']["Row"][]>([]);
    const [image, setImage] = useState<{url: string, id: number}[]>([]);

    useEffect(()=>{
        const webSocket = () => {
            supabase.channel('users').on("postgres_changes",{
                event: "*",
                schema: "public",
                table: "users",
              },
               async (payload)=> {
                if(payload.eventType === "INSERT"){
                    setData(prev => [...prev, payload.new as User])
                } else if(payload.eventType === "DELETE"){
                    const {data, error} = (await supabase.from('users').select('*').eq("delete", false));
                    if(data){
                        setData(await data);
                    }
                }
            }, ).subscribe();
        }
        const firstget = async() =>{
            try{
                const {data, error} = (await supabase.from('users').select('*').eq("delete", false));
                if(error) {
                    console.log(error);
                    return;
                }
                setData(await data);
            } catch(error){
                console.log(error);
                return;
            }
        }
        firstget();
        webSocket();
    }, [])
  return (
    <table className={styles.userList}>
        <thead>
        <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Quote</th>
            <th>Email</th>
            <th>Created At</th>
            <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {data.map(user => {return <User user={user} />})}
        </tbody>
    </table>
  )
}

export default UserList