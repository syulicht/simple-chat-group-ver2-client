import { GroupType } from "./group";

export type UserType = {
    id: number;
    name: string;
    quote: string;
    email: string;
    password: string;
    groups: GroupType;
}