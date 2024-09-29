import React from 'react'
import "../app/globals.css"
import Image from 'next/image'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='loadingDiv'>
      <Image src={'/Loading.png'} alt='' width={100} height={100} />
    </div>
  )
}

export default Loading