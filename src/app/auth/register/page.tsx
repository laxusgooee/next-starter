"use client";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import useRegister from "@/hooks/mutations/use-register";
import { formatErrorMessage } from "@/lib/utils";
import { useAuthSession } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Please enter a valid email address" }),
    username: z.string({ required_error: "Username is required" }).min(4),
    password: z.string({ required_error: "Password is required" }).min(4),
    confirm_password: z
      .string({ required_error: "Confirm Password is required" })
      .min(4),
  })
  .refine((obj) => obj.password === obj.confirm_password, {
    message: "Password doesn’t match, please re-enter the correct password.",
    path: ["confirm_password"],
  });

export type RegisterFormInputs = z.infer<typeof RegisterFormSchema>;

export default function RegisterPage() {
  const { signIn } = useAuthSession();

  const router = useRouter();

  const registerMuntation = useRegister();

  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "test@mailinator.com",
      password: "1234567890",
      username: "testuser",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const res = await registerMuntation.mutateAsync(data);

      await signIn(res.data.user);

      toast.success("Register successful");

      setTimeout(() => router.replace("/"), 1);
    } catch (error) {
      form.setError("root", {
        type: "server",
        message: formatErrorMessage(error),
      });

      toast.error(formatErrorMessage(error));
    }
  };

  return (
    <div className="rounded-2xl shadow-lg p-4 w-full max-w-lg">
      <h1>Register Page</h1>
      <div className="pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usename</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repeat password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <p className="text-sm text-destructive">
                {form.formState.errors.root?.message}
              </p>
            )}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
