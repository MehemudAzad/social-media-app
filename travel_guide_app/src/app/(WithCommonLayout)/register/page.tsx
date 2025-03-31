"use client";

import FXForm from "@src/components/form/FXForm";
import FXInput from "@src/components/form/FXInput";
import { useUserRegistration } from "@src/hooks/auth.hook";
import registerValidationSchema from "@src/schemas/register.schema";
import { registerUser } from "@/services/AuthService";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  //   useEffect(() => {
  //     if (isPending) {
  //       // Handle Loading satate
  //     }
  //   }, [isPending]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    console.log("Inside form user data: ", userData);

    handleUserRegistration(userData);
  };

  if (isPending) {
    //  handle loading state
  }

  return (
    <div className="flex h-[calc(100vh-100px)] flex-col items-center justify-center">
      <h3 className="my-2 text-xl font-bold">Register with newsX</h3>
      <p className="mb-4">Find all the latest news around the world</p>
      <div className="w-[35%]">
        <FXForm
          //! Only for development
          defaultValues={{
            username: "Mehemud",
            email: "mehemudazad@gmail.com",
            password: "123456",
          }}
          resolver={zodResolver(registerValidationSchema)}
          onSubmit={onSubmit}
        >
          <div className="py-3">
            <FXInput label="Username" name="username" size="sm" />
          </div>
          <div className="py-3">
            <FXInput label="Email" name="email" size="sm" />
          </div>
          <div className="py-3">
            <FXInput
              label="Password"
              name="password"
              size="sm"
              type="password"
            />
          </div>

          <Button
            className="my-3 w-full rounded-md bg-default-900 text-default"
            size="lg"
            type="submit"
          >
            Registration
          </Button>
        </FXForm>
        <div className="text-center">
          Already have an account ? <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}