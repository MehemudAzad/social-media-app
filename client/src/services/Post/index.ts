"use server";

import envConfig from "@src/config/envConfig";
import axiosInstance from "@src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

export const createPost = async (formData: FormData): Promise<any> => {
  try {
    // const cookieStore = await cookies();
    // const accessToken = cookieStore.get("accessToken")?.value;
    // console.log(accessToken);
    console.log("create post hit");
    const { data } = await axiosInstance.post("/post/create", formData, {
      headers: {
        // Authorization: `${accessToken}`, // ✅ Attach token manually
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("posts");

    // return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create post");
  }
};


export const getPost = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`http://localhost:5001/api/post/${postId}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};