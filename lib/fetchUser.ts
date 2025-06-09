import { useStore } from "@/store/store";
import axios from "axios"

export const fetchUser = async () => {
    try {
        const res = await axios.get("/api/me")
        const user = res.data;

        console.log("user fetched", user);

        useStore.getState().setUser(user);
        useStore.getState().setAuthenticated(true);
    }
    catch (e: any) {
        console.error(e);
        useStore.getState().clearUser();
    }
}