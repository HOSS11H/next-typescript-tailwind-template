import * as z from "zod"
export const registerSchema = z.object({
    username: z.string({required_error: "Username is required",}).min(2, { message: "Must be 5 or more characters long" }).max(50, { message: "Must be 50 or fewer characters long" }),
    email: z.string({required_error: "Email is required",}).email({ message: "Invalid email address" }),
    password: z.string({required_error: "Password is required",}).min(2, { message: "Must be 5 or more characters long" }).max(50, { message: "Must be 50 or fewer characters long" }),
})
export const loginSchema = z.object({
    email: z.string({required_error: "Email is required",}).email({ message: "Invalid email address" }),
    password: z.string({required_error: "Password is required",}).min(2, { message: "Must be 5 or more characters long" }).max(50, { message: "Must be 50 or fewer characters long" }),
})