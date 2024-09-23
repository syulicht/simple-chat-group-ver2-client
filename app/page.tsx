"use client"
import UserAdd from "@/components/index/UserAdd";
import UserList from "@/components/index/UserList";
import styles from "./styles.module.css"

export default async function Index() {
  return (
    <div className={styles.main}>
    <UserList />
    <UserAdd />
    </div>
  );
}
