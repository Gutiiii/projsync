import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    jwtSecretKey: str(),
})

export default env
