"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Group from './Group';
import { GroupType } from '@/types/group';
import styles from "../../app/chatGroup/css/styles.module.css"
import useLogin from '@/hooks/useLogin';
import Loading from '../Loading';

type Props = {}

const GroupList = (props: Props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState<GroupType[]>([]);
    const res = useLogin('/chatSpace/group/get/fromUser', setGroups, setLoading);

    useEffect(() => {
      const fetchData = async() => {
        const success = await res();
        if (!success.success) {
          router.push("/login");
        }
      }
      fetchData();
    }, []);  

    return (
      <div className={styles.userList}>
        {
          loading ? <Loading />
          :   
          <table>
            <thead>
              <tr>
                <th>Group ID</th>
                <th>Group Name</th>
                <th>Delete</th>
                <th>Enter In</th>
              </tr>
            </thead>
            <tbody>
              {groups.map(group => <Group key={group.id} id={group.id} users={group.users} name={group.name}/>)}
            </tbody>
          </table>  
        }
      </div>
    );
}

export default GroupList;
