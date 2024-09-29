import { UserType } from "./user";

export type GroupType = {
    id: number;
    name: string;
    users: UserType[];
}