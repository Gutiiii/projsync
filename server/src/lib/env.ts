import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    jwtSecretKey: str(),
    ORIGIN: str(),
    PORT: str()
})

export default env
