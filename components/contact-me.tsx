"use client";

import React, { useLayoutEffect, useRef, useState, useTransition } from "react";
import GithubIcon from "@/public/github-icon.svg";
import LinkedinIcon from "@/public/linkedin-icon.svg";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailSchema, type EmailValues } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

  const form = useForm<EmailValues>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
    },
  });

  const onSubmit = (values: EmailValues) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await sendEmail(values);
        if ("success" in data) {
          setSuccess(data.success);
          form.reset();
        } else {
          setError(data.error);
        }
      } catch {
        setError("Couldn't reach the server. Please email me directly instead.");
      }
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
      className="relative z-0 scroll-mt-28 py-16 sm:py-24 [perspective:900px]"
      aria-labelledby="contact-title"
    >
      <div
        ref={blobRef}
        className="pointer-events-none absolute -left-24 top-1/2 z-0 h-80 w-80 -translate-y-1/2 rounded-full bg-cobalt-600/20 opacity-40 blur-3xl"
        aria-hidden
      />
      <div className="relative z-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div ref={leftColRef} className="lg:col-span-5">
          <h2
            id="contact-title"
            className="mb-6 flex flex-wrap gap-x-3 text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl [transform-style:preserve-3d]"
          >
            <span className="contact-kw inline-block">Let&apos;s</span>
            <span className="contact-kw inline-block text-zinc-400">talk.</span>
          </h2>
          <p className="contact-block mb-8 max-w-md text-lg leading-relaxed text-zinc-400">
            {contactMe}
          </p>
          <div className="contact-block space-y-3">
            <ContactCard
              icon="phone"
              title="Phone · WhatsApp"
              first="+251921435868"
              customClass=""
            />
            <ContactCard
              icon="EnvelopeIcon"
              title="Email"
              first="misbahmuhidin@gmail.com"
              second="misbahmuhidin3@gmail.com"
              customClass=""
            />
          </div>
          <div className="socials-block mt-6 flex flex-wrap gap-3">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/MuhidinM"
              className="glass-key px-4 py-2.5 text-sm"
            >
              <Image src={GithubIcon} alt="" width={18} height={18} />
              github.com/MuhidinM
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/MuhidinM"
              className="glass-key px-4 py-2.5 text-sm"
            >
              <Image src={LinkedinIcon} alt="" width={18} height={18} />
              linkedin.com/in/MuhidinM
            </Link>
          </div>
        </div>

        <div ref={formColRef} className="lg:col-span-7">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="glass relative space-y-6 p-6 sm:p-8"
              noValidate
            >
              <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
                <label>
                  Website
                  <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-sm text-zinc-300">Name</FormLabel>
                      <FormControl>
                        <input {...field} disabled={isPending} placeholder="Jane Doe" autoComplete="name" type="text" className="glass-input h-11 w-full px-4 text-sm disabled:opacity-50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="form-field">
                      <FormLabel className="text-sm text-zinc-300">Email</FormLabel>
                      <FormControl>
                        <input {...field} disabled={isPending} placeholder="jane@company.com" autoComplete="email" type="email" className="glass-input h-11 w-full px-4 text-sm disabled:opacity-50" />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-sm text-zinc-300">
                      Subject <span className="text-zinc-500">(optional)</span>
                    </FormLabel>
                    <FormControl>
                      <input {...field} disabled={isPending} placeholder="Role, project, or question" type="text" className="glass-input h-11 w-full px-4 text-sm disabled:opacity-50" />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="form-field">
                    <FormLabel className="text-sm text-zinc-300">Message</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        disabled={isPending}
                        placeholder="Let&apos;s talk..."
                        className="glass-input block min-h-[140px] w-full resize-y px-4 py-3 text-sm disabled:opacity-50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-h-[1.25rem] text-sm" role="status" aria-live="polite">
                  {error ? (
                    <span className="text-red-400">{error}</span>
                  ) : success ? (
                    <span className="text-emerald-400">{success}</span>
                  ) : null}
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="glass-key glass-key-primary px-6 py-3 font-medium"
                >
                  <span ref={submitLabelRef}>{isPending ? "Sending…" : "Send message"}</span>
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
