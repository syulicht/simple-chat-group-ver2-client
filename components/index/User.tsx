"use client"
import { supabase } from '@/utils/supabase/supabase';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import styles from "../../app/styles.module.css"

type Props = {
    user : {
        created_at: string;
        delete: boolean | null;
        email: string | null;
        id: number;
        name: string | null;
        quote: string | null;
    }
}

const User = (props: Props) => {
    const [url, setUrl] = useState("");
    const deleteUser = async() =>{
        await supabase.from('users').delete().eq("id", props.user.id);
    }

    useEffect(()=>{
        const checkFileExists = async () => {
            try {
                // "userIcon"バケットの中からファイルリストを取得
                const { data, error } = await supabase.storage
                    .from("images")
                    .list("userIcon");
        
                if (error) {
                    console.error("Error listing files:", error.message);
                    return false; // ファイルが見つからない場合
                }
        
                const fileExists = data.some(file => file.name === `${props.user.name}.png`);
                return fileExists;
                } catch (error) {
                console.error("Error checking file existence:", error);
                return false;
            }
        };

        const getURL = async() => {
            try{
                const fileExists = await checkFileExists();
                if(fileExists){
                    const { data } = await supabase.storage.from("images").getPublicUrl(`userIcon/${props.user.name}.png`);
                    setUrl(data.publicUrl);
                } else {
                    const { data } = await supabase.storage.from("images").getPublicUrl(`userIcon/Frame 15.png`);
                    setUrl(data.publicUrl);
                }
            } catch(error){
                const {data} = await supabase.storage.from("images").getPublicUrl("userIcon/Frame 15.png");
                setUrl(data.publicUrl);
                console.log(0);
                console.log(error);
            }
        }
        getURL();
    }, []);
  return (
    <div className={styles.user}>
    <div>
        <Image src={url} alt='' width={50} height={50} />
    </div>
    <div>
        {props.user.name}
    </div>
    <div onClick={deleteUser}>
        <Image src={"/delete.png"} alt='' width={50} height={50}/>
    </div>
    </div>
  )
}

export default User