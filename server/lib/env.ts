import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    jwtSecretKey: str(),
    jwtRefreshTokenKey: str(),
})

export default env
