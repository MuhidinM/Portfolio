import * as z from "zod";

export const EmailSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Please enter your name" })
    .max(100, { message: "Name is too long" }),
  email: z
    .string()
    .trim()
    .email({ message: "Enter a valid email address" })
    .max(200),
  subject: z.string().trim().max(150, { message: "Subject is too long" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message should be at least 10 characters" })
    .max(5000, { message: "Message is too long (5000 characters max)" }),
  // Honeypot: hidden from people, filled in by naive bots.
  // Checked on the server so bots get a normal-looking success response.
  website: z.string().optional(),
});

export type EmailValues = z.infer<typeof EmailSchema>;
