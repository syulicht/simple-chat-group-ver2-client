import LoginForm from '@/components/login/LoginForm';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import styles from "./css/styles.module.css"

type Props = {}

const Page = (props: Props) => {
  return (
    <div className={styles.main}>
        <LoginForm />
    </div>
  )
}

export default Page