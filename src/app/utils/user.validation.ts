import z from "zod";
import { IsActive, Role } from "../modules/user/user.interface";

export const createUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short. Minimum 2 characters long" })
    .max(50, { message: "Name too long." }),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .regex(/(?=.*[\W_])/, {
      message: "Password must contain at least 1 special character.",
    }),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. 017XXXXXXXX).",
    })
    .optional(),
  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot excced 200 characters" })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be string" })
    .min(2, { message: "Name too short. Minimum 2 characters long" })
    .max(50, { message: "Name too long." })
    .optional(),

  password: z
    .string()
    .min(8)
    .regex(/(?=.*[a-z])/, {
      message: "Password must contain at least 1 lowercase letter.",
    })
    .regex(/(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .regex(/(?=.*[\W_])/, {
      message: "Password must contain at least 1 special character.",
    })
    .optional(),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, {
      message:
        "Phone number must be a valid Bangladeshi number (e.g. 017XXXXXXXX).",
    })
    .optional(),

  role: z.enum(Object.values(Role) as [string]).optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),

  isDeleted: z
    .boolean({ invalid_type_error: "isDeleted must be true or false" })
    .optional(),
  isVerified: z
    .boolean({ invalid_type_error: "isVerified true or false" })
    .optional(),

  address: z
    .string({ invalid_type_error: "Address must be string" })
    .max(200, { message: "Address cannot excced 200 characters" })
    .optional()
    .optional(),
});
