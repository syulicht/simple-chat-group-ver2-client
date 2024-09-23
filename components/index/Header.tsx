import { useRouter } from 'next/navigation'
import React from 'react'
import styles from '../../app/styles.module.css';
import Image from 'next/image';

type Props = {}

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
        <Image src={"/logo.png"} width={300} height={100} alt='' style={{objectFit: "cover"}} />
    </div>
  )
}

export default Header