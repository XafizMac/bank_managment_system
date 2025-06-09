import { useStore } from "@/store/store";
import axios from "axios"

export const fetchAllUsers = async () => {
    try {
        const res = await axios.get("/api/users")
        const users = res.data;
        console.log("Users are role:", users);
        return users?.users;
    }
    catch (e: any) {
        console.error(e);
    }
}