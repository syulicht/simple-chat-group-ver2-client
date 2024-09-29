"use client"
import useLogin from '@/hooks/useLogin';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

type Props = {}

const Space = (props: Props) => {
    const router = useRouter();
    const login = useLogin("/chatSpace/chat/get/fromGroup");
    useEffect(() => {
        login();
    })  
  return (
    <div>Space</div>
  )
}

export default Space