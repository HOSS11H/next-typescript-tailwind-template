declare namespace NodeJS {
    export interface ProcessEnv {
        NEXTAUTH_SECRET: string
        GITHUB_ID: string
        GITHUB_SECRET: string
        GOOGLE_CLIENT_ID: string
        GOOGLE_CLIENT_SECRET: string
        NEXT_BACKEND_URL: string
        DATABASE_URL: string
    }
}