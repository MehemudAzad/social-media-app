"use server";

import envConfig from "@src/config/envConfig";
import axiosInstance from "@src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
// import { revalidateTag } from "next/cache";

export const createComment = async (formData: FormData): Promise<any> => {
  try {
    const { data } = await axiosInstance.post("/comment", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("comments");

    // return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create comment");
  }
};

export const getCommentByPostId = async (postId: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(
    `http://localhost:5001/api/comment/${postId}`,
    fetchOptions
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};
