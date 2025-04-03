import { createComment } from "@src/services/Comment";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// import { createPost } from "../services/post";

export const useCreateComment = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["CREATE_COMMENT"],
    mutationFn: async (postData) => await createComment(postData),
    onSuccess: () => {
      toast.success("Comment created successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};