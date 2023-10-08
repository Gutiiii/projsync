import { BACKEND_URL } from "@/lib/constants";
import { RegisterUserFormData } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const registerUser = (values: RegisterUserFormData) => {
    return axios.post(BACKEND_URL + '/auth/signup', values, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}

export const useRegisterUser = () => {
    return useMutation(registerUser)
}