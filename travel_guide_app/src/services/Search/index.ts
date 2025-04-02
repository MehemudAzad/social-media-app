"use server";

import axiosInstance from "@src/lib/AxiosInstance";

export const searchItems = async (searchTerm: string) => {
  try {
    const res = await axiosInstance.get(
      `/search-posts?searchTerm=${searchTerm}`
    );

    return res.data;
  } catch (error) {
    throw new Error("Failed to search items");
  }
};
