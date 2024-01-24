
import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetLists = (token: string | undefined, projectId: string) => {
    return useQuery({
        queryKey: ["getLists"],
        queryFn: async () => {
            return await axios.get(BACKEND_URL + '/project/list/' + projectId, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer " + token
                },
            });
        },
    });
}