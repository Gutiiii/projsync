import { BACKEND_URL } from "@/lib/constants";
import { RegisterUserFormData } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// export const useRegisterUser = (values: RegisterUserFormData) => {
//     return useMutation({
//         mutationFn: () => {
//             return axios.post(BACKEND_URL + '/auth/signup', values, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json',
//                 },
//             })
//         }


//     })

// }

const registerUser = async (values: RegisterUserFormData) => {
    return await axios.post(BACKEND_URL + '/auth/signup', values, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}

export const useRegisterUser = () => {
    return useMutation({mutationFn: asnyc})
}