"use client";

import React, { useLayoutEffect, useRef, useState, useTransition } from "react";
import GithubIcon from "@/public/github-icon.svg";
import LinkedinIcon from "@/public/linkedin-icon.svg";
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
import { ContactCard } from "./contact-card";
import { gsap, registerGsap } from "@/lib/gsap-client";
import { usePrefersReducedMotion } from "@/lib/reduced-motion";

const EmailSection = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const submitLabelRef = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

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

  useLayoutEffect(() => {
    if (!sectionRef.current || reduced) return;
    registerGsap();
    const ctx = gsap.context(() => {
      if (leftColRef.current) {
        const q = gsap.utils.selector(leftColRef);
        gsap
          .timeline({
            scrollTrigger: {
              trigger: leftColRef.current,
              start: "top 88%",
              once: true,
            },
          })
          .from(q(".contact-kw"), {
            opacity: 0,
            y: 22,
            rotateX: -32,
            stagger: 0.12,
            duration: 0.52,
            ease: "power2.out",
            transformOrigin: "50% 100%",
          })
          .from(
            q(".contact-block"),
            {
              opacity: 0,
              y: 12,
              stagger: 0.07,
              duration: 0.42,
              ease: "power2.out",
            },
            "-=0.28"
          )
          .from(
            q(".socials-block a"),
            { opacity: 0, y: 8, stagger: 0.06, duration: 0.35 },
            "-=0.22"
          );
      }
      if (formColRef.current) {
        gsap.from(formColRef.current.querySelectorAll(".form-field"), {
          opacity: 0,
          y: 14,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formColRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          opacity: 0.45,
          scale: 1.06,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [reduced]);

  useLayoutEffect(() => {
    if (!submitLabelRef.current || reduced) return;
    registerGsap();
    gsap.to(submitLabelRef.current, {
      opacity: isPending ? 0.65 : 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [isPending, reduced]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-16 py-20 md:py-24 gap-10 md:gap-12 relative z-0 scroll-mt-24 [perspective:900px]"
    >
      <div
        ref={blobRef}
        className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/50 via-transparent to-transparent rounded-full h-72 w-72 z-0 blur-3xl absolute top-1/2 -left-24 -translate-y-1/2 pointer-events-none opacity-40"
        aria-hidden
      />
      <div ref={leftColRef} className="z-10 space-y-1 relative">
        <h5 className="text-lg font-semibold text-stone-100 tracking-tight flex flex-wrap gap-x-2 [transform-style:preserve-3d]">
          <span className="contact-kw inline-block">Let&apos;s</span>
          <span className="contact-kw inline-block">connect</span>
        </h5>
        <p className="contact-block text-stone-500 mb-6 max-w-md leading-relaxed">
          {contactMe}
        </p>
        <div className="contact-block md:w-4/5 my-4 space-y-3">
          <ContactCard
            icon="phone"
            title="Phone"
            first="+251921435868"
            second="+251799450102"
            customClass=""
          />
          <ContactCard
            icon="EnvelopeIcon"
            title="Email"
            first="misbahmuhidin@gmail.com"
            second="muhidin.misbah@coopbankoromiasc.com"
            customClass=""
          />
        </div>
        <div className="socials socials-block flex flex-col gap-3 pt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
            Profiles
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              target="_blank"
              href="https://github.com/MuhidinM"
              className="group inline-flex items-center gap-3 text-stone-300 transition-colors hover:text-stone-100"
            >
              <Image src={GithubIcon} alt="" width={32} height={32} />
              <span className="border-b border-transparent text-sm group-hover:border-stone-500">
                github.com/MuhidinM
              </span>
            </Link>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/MuhidinM"
              className="group inline-flex items-center gap-3 text-stone-300 transition-colors hover:text-stone-100"
            >
              <Image src={LinkedinIcon} alt="" width={32} height={32} />
              <span className="border-b border-transparent text-sm group-hover:border-stone-500">
                linkedin.com/in/MuhidinM
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div ref={formColRef} className="relative z-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-stone-300">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-stone-100 border-stone-700 bg-zinc-900/40 placeholder:text-stone-600"
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
                  <FormItem className="form-field">
                    <FormLabel className="text-stone-300">Subject</FormLabel>
                    <FormControl>
                      <Input
                        className="text-stone-100 border-stone-700 bg-zinc-900/40 placeholder:text-stone-600"
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
                  <FormItem className="form-field">
                    <FormLabel className="text-stone-300">Message</FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-stone-100 border-stone-700 bg-zinc-900/40 min-h-[120px] placeholder:text-stone-600"
                        {...field}
                        disabled={isPending}
                        placeholder="Let's talk..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-sm min-h-[1.25rem]">
              {error ? (
                <span className="text-red-400/90">{error}</span>
              ) : success ? (
                <span className="text-stone-400">{success}</span>
              ) : null}
            </div>
            <Button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full border border-stone-600 bg-zinc-800/90 text-stone-100 hover:bg-zinc-700/90"
            >
              <span ref={submitLabelRef}>
                {isPending ? "Sending…" : "Send message"}
              </span>
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default EmailSection;
