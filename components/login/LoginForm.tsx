"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import styles from "../../app/login/css/styles.module.css"

type Props = {

}

const LoginForm = (props: Props) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const nameInput = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams()
    const router = useRouter();
    useEffect(() => {
        if(nameInput.current){
            nameInput.current.value = searchParams.get("name") as string;
            setName(nameInput.current.value);
        }
    }, []);
    const handleSubmit = async(e : FormEvent<HTMLElement>) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
            credentials: 'include',
          });
        if(!res.ok){
            router.push("/");
        } else {
            router.push("/chatSpace");
        }
    }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h3>Login</h3>
      <div>
        <label>Name</label>
        <input type='text' ref={nameInput} onChange={e => setName(e.target.value)}/>
      </div>
      <div>
        <label>Password</label>
        <input type='password' onChange={e => setPassword(e.target.value)}/>
      </div>
    <button type='submit'>Login</button>
</form>

  )
}

export default LoginForm