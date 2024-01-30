"use client";
import React, { useState, useTransition } from "react";
import GithubIcon from "/public/github-icon.svg";
import LinkedinIcon from "/public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { sendEmail } from "@/actions/email";
import { contactMe } from "@/constants";
import { PhoneIcon } from "@heroicons/react/24/solid";

const EmailSection = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      sendEmail(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
        form.reset();
      });
    });
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold text-white my-2">
          Let&apos;s Connect
        </h5>
        <p className="text-[#ADB7BE] mb-4 max-w-md">{contactMe}</p>
        <div className="md:w-3/4">
          <div className="flex items-center justify-start space-x-6 lg:space-x-12 text-white border border-gray-700 rounded-lg p-4 bg-transparent">
            <div className="bg-sky-200 p-4 rounded-full">
              <PhoneIcon width={"24"} className="text-sky-500" />
            </div>
            <div className="flex flex-col items-start justify-center">
              <h3>Contact on phone</h3>
              <p className="font-light">+251921435868</p>
              <p className="font-light">+251921435868</p>
            </div>
            <div className="hidden md:block"></div>
          </div>
        </div>
        <div className="socials flex flex-row gap-2">
          <Link target="_blank" href="https://github.com/MuhidinM">
            <Image src={GithubIcon} alt="Github Icon" />
          </Link>
          <Link target="_blank" href="http://www.linkedin.com/in/MuhidinM">
            <Image src={LinkedinIcon} alt="Linkedin Icon" />
          </Link>
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white"
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Subject</FormLabel>
                    <FormControl>
                      <Input
                        className="text-white"
                        {...field}
                        disabled={isPending}
                        placeholder="Hello"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-white"
                        {...field}
                        disabled={isPending}
                        placeholder="Let's talk something..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-white">
              {error}
              {success}
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-sky-500 hover:bg-blue-500"
            >
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EmailSection;
