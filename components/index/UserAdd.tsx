'use client'
import { supabase } from '@/utils/supabase/supabase';
import React, { FormEvent, useState } from 'react'
import styles from "../../app/styles.module.css"

type Props = {
}

const UserAdd = (props: Props) => {
    const [name, setName] = useState("");
    const [quote, setQuote] = useState("");
    const [email, setEmail] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const submit = async(e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        try{
            await supabase.from('users').insert({
                name: name,
                quote: quote,
                email: email
            })
            if(file)await supabase.storage.from('images').upload(`userIcon/${name}.png`, file);
        }catch(error){
            console.log(error);
        }
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
        <button type='submit'>submit</button>
    </form>
  )
}

export default UserAdd