
import { BACKEND_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetComments = (token: string | undefined, cardId: string) => {
    return useQuery({
        queryKey: ["getComments"],
        queryFn: async () => {
            return await axios.get(BACKEND_URL + '/project/comment/' + cardId, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: "Bearer " + token
                },
            });
        },
    });
}