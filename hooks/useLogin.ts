import { SetStateAction } from "react";

const useLogin = (url:string, setFunction?: SetStateAction<any>, loadFunction?: SetStateAction<any>) => {
    const login = async() => {
    const res = await fetch(`http://localhost:8000/api${url}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    const data = await res.json();
    if(!res.ok){
        return {};
    } else {
        if(setFunction !== undefined) setFunction(data.groups);
        if(loadFunction !== undefined) setTimeout(() => loadFunction(false), 1000);
        return {success: "success"}
    }
}
return login;
}

export default useLogin;