"use server";

import axiosInstance from "@src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(accessToken);
    const { data } = await axiosInstance.post("/post", formData, {
      headers: {
        // Authorization: `${accessToken}`, // ✅ Attach token manually
        "Content-Type": "multipart/form-data",
      },
    });

    // revalidateTag("posts");

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};