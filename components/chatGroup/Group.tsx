import { GroupType } from '@/types/group'
import Image from 'next/image';
import React from 'react'

type Props = GroupType;

const Group = (props: Props) => {
  const deleteGroup = () => {

  }

  const goToChatSpace = () => {
    
  }
  return (
    <tr>
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td onClick={deleteGroup}>
          <Image src={"/delete.png"} width={30} height={30} alt=''/>
      </td>
      <td onClick={goToChatSpace}>
          <Image src={"/login.png"} width={30} height={30} alt=''/>
      </td>
    </tr>
)
}

export default Group