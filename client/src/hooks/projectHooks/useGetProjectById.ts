
import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetProjectById = (token: string | undefined, id: string) => {
    return useQuery({
        queryKey: ["getProjectById"],
        queryFn: async () => {
            return await axios.get(BACKEND_URL + '/project/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer " + token
                },
            });
        },
    });
}