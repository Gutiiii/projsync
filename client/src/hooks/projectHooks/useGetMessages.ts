
import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetMessages = (token: string | undefined, projectId: string) => {
    return useQuery({
        queryKey: ["getMessages"],
        queryFn: async () => {
            const res = await axios.get(BACKEND_URL + '/project/chats/' + projectId, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer " + token
                },
            });
            return res.data
        },
    });
}