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
import useLogin from "@/hooks/mutations/auth/useLogin";
import { formatErrorMessage } from "@/lib/utils";
import { useAuthSession } from "@/providers/AuthProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z.string({ required_error: "Password is required" }).min(4),
});

export type LoginFormInputs = z.infer<typeof LoginFormSchema>;

export default function LoginPage() {
  const { signIn } = useAuthSession();

  const router = useRouter();

  const loginMuntation = useLogin();

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "test@mailinator.com",
      password: "1234567890",
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      const res = await loginMuntation.mutateAsync({
        ...data,
        provider: "email",
      });

      await signIn(res.data.token);

      toast.success("Login successful");

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
      <h1>Login Page</h1>
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
