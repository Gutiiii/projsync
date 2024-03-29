
import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAllProjects = (token: string | undefined) => {
    return useQuery({
        queryKey: ["getAllProjects"],
        queryFn: async () => {
            return await axios.get(BACKEND_URL + '/project/all', {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer " + token
                },
            });
        },
    });
}