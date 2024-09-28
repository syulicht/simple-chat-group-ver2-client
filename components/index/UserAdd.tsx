"use client"
import { supabase } from '@/utils/supabase/supabase';
import React, { FormEvent, useState } from 'react'
import styles from "../../app/styles.module.css"

type Props = {
}

const UserAdd = (props: Props) => {
    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const submit = async(e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            const data = {
                name: name,
                quote: quote,
                email: email,
                password: password
            }
            await fetch("http://localhost:8000/api/add", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({data: data})    
            })
        }catch(error){
            console.log(error);
        }
        window.location.reload();
    }

  return (
    <form onSubmit={e => submit(e)} className={styles.form}>
        <div>
            <label>Name</label>
            <input type='text' onChange={e => setName(e.target.value)}/>
        </div>
        <div>
            <label>Quote</label>
            <input type='text' onChange={e => setQuote(e.target.value)}/>
        </div>
        <div>
            <label>Email</label>
            <input type='text' onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
            <label>Password</label>
            <input type='text' onChange={e => setPassword(e.target.value)}/>
        </div>
        <button type='submit'>submit</button>
    </form>
  )
}

export default UserAdd