import * as z from "zod";

export const EmailSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  subject: z.optional(z.string()),
  message: z.string(),
});
