import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
    GOOGLE_CLIENT_ID: str(),
    GOOGLE_CLIENT_SECRET: str(),
    GITHUB_ID: str(),
    GITHUB_SECRET: str()
})

export default env
