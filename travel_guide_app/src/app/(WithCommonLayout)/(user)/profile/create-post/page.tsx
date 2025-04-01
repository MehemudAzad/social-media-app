"use client";

// import FXInput from "@/components/form/FXInput";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import FXInput from "@src/components/form/FXInput";
import TiptapEditor from "@src/components/UI/TextEditor/textEditor";
import { useState } from "react";
import { useCreatePost } from "@src/hooks/post.hook";
import { useRouter } from "next/navigation";
import { useUser } from "@src/context/user.provider";
// import TiptapEditor from "@/components/UI/textEditor";

export default function page() {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const { user } = useUser();
  const router = useRouter();

  const methods = useForm();

  const { control, handleSubmit } = methods;

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "questions",
  // });

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess,
  } = useCreatePost();

  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   const postData = {
  //     ...data,
  //     questions: data.questions.map((que: { value: string }) => que.value),
  //   };

  //   console.log(postData);
  // };

  // const handleFieldAppend = () => {
  //   append({ name: "questions" });
  // };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("submit hit");
    const formData = new FormData();

    const postData = {
      ...data,
      // questions: data.questions.map((que: { value: string }) => que.value),
      // dateFound: dateToISO(data.dateFound),
      user: user!._id,
    };

    console.log(postData);

    formData.append("data", JSON.stringify(postData));

    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }

    handleCreatePost(formData);
  };

  // const handleFieldAppend = () => {
  //   append({ name: "questions" });
  // };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };

      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && isSuccess) {
    router.push("/");
  }

  return (
    <div className="p-5 bg-default-50 rounded-lg">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FXInput name="title" label="Title" />

          <Divider className="my-5" />

          {/* <div className="flex justify-between items-center">
            <h1 className="text-xl">Owner verification questions</h1>
            <Button onClick={() => handleFieldAppend()}>Append</Button>
          </div> */}

          {/* {fields.map((field, index) => (
            <div key={field.id} className="flex items-center">
              <FXInput name={`questions.${index}.value`} label="Question" />
              <Button onClick={() => remove(index)}>Remove</Button>
            </div>
          ))} */}

          <Divider className="my-5" />
          <div className="min-w-fit flex-1">
            <label
              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
              htmlFor="image"
            >
              Upload image
            </label>
            <input
              multiple
              className="hidden"
              id="image"
              type="file"
              onChange={(e) => handleImageChange(e)}
            />
          </div>

          {imagePreviews.length > 0 && (
            <div className="flex gap-5 my-5 flex-wrap">
              {imagePreviews.map((imageDataUrl) => (
                <div
                  key={imageDataUrl}
                  className="relative size-48 rounded-xl border-2 border-dashed border-default-300 p-2"
                >
                  <img
                    alt="item"
                    className="h-full w-full object-cover object-center rounded-md"
                    src={imageDataUrl}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="max-w-3xl mx-auto mt-10">
            <TiptapEditor />
          </div>

          <Divider className="my-5" />
          <div className="flex justify-end">
            <Button size="lg" type="submit">
              Post
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
