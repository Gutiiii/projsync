import { BACKEND_URL } from "@/lib/constants";
import { RegisterUserFormData } from "@/types/user.types";
import axios from "axios";

export const registerUser = async (values: RegisterUserFormData) => {
    return await axios.post(BACKEND_URL + '/auth/signup', values, {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
}