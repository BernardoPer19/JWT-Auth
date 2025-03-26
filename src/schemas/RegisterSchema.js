import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  city: z.string().min(1, { message: "City is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const LoginSchema = z.object({
  email: z.string().email({ message: "Formato de email inválido" }),
  password: z.string().min(6, { message: "Contraseña inválida" }),
});

export const validateRegister = (input) => {
  return RegisterSchema.parse(input);
};

export const validateLogin = (input) => {
  return LoginSchema.parse(input);
};
