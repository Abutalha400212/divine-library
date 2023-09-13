import z from "zod";
const loginZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
const createUserZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    name: z.string({
      required_error: "Name is required",
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    email: z.string().optional(),
    name: z.string().optional(),
  }),
});
export const AuthValidation = {
  loginZodSchema,
  createUserZodSchema,
  updateUserZodSchema,
};
