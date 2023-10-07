import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    NEXTAUTH_SECRET: str(),
    NEXTAUTH_URL: str()
})

export default env
