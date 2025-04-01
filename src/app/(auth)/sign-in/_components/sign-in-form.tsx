"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { toast } from "@/utils/toast";
import { verifyEmail } from "@/utils/db";

const SignInForm = () => {
  const router = useRouter();

  const verifyEmailAction = async (formData: FormData) => {
    const responseAction = await verifyEmail(formData);

    if (responseAction?.error) {
      toast({
        type: "error",
        message: responseAction.error,
        style: "subdark",
      });

      return;
    }

    toast({
      type: "success",
      message: "Email sent successfully",
      style: "subdark",
    });
  };

  const authenticateUserAction = async (formData: FormData) => {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (response?.code) {
      toast({
        type: "error",
        message: response.code,
        style: "subdark",
        closeButton:
          response.error === "Verification"
            ? {
                onClick: async () => verifyEmailAction(formData),
                title: "Send",
              }
            : undefined,
      });

      return;
    }

    toast({
      type: "remove",
    });

    return router.push("/dashboard");
  };

  return (
    <form
      action={authenticateUserAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        required
        type="email"
        name="email"
        label="E-mail"
        placeholder="johndoe@example.com"
        icon={Mail}
        variant="big"
      />
      <Input
        required
        type="password"
        name="password"
        label="Password"
        placeholder="*************"
        icon={Lock}
        variant="big"
      />
      <Button title="Continue" variant="big" />
    </form>
  );
};

export { SignInForm };
