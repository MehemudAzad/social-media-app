"use client";
import { Avatar } from "@heroui/avatar";
import { format } from "date-fns";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";

import { IPost, IUser } from "@src/types";

import { Button } from "@heroui/button";
// import ImageGallery from "./ImageGallery";
// import ClaimRequestModal from "../../modals/ClaimRequestModal";
import { useUser } from "@src/context/user.provider";
import ImageGallery from "./ImageGalary";
// import AuthenticationModal from "../../modals/AuthenticationModal";
// import ImageGallery from "./ImageGalary";

// interface IProps {
//   post: IPost;
// }

export default function Post({ post }: any) {
  const { title, content, _id, images, author, tags, createdAt } = post || {};

  const { username, email, profilePhoto } = (author as IUser) || {};
  const { user: loggedInUser } = useUser();

  return (
    <div className="mb-2 rounded-md bg-default-100 p-4">
      <div className="border-b border-default-200 pb-2">
        {/* <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            {/* <Avatar isBordered name={username} radius="sm" src={profilePhoto} /> */}
        {/* <div>
              <p>{username}</p>
              <p className="text-xs">{email}</p>
            </div>
          </div> */}
        {/* </div> */}

        <div className="flex items-center justify-between border-b border-default-200 pb-4">
          <div className="flex items-center gap-3">
            <Avatar isBordered name={username} radius="sm" src={profilePhoto} />
            <div>
              <p className="font-semibold">{username}</p>
              <p className="text-xs text-gray-500">{email}</p>
            </div>
          </div>
          {/* Display createdAt timestamp */}
          <p className="flex items-center text-xs text-gray-500">
            <Calendar width={14} className="mr-1" />
            {createdAt
              ? format(new Date(createdAt), "dd MMM, yyyy hh:mm a")
              : "Unknown"}
          </p>
        </div>

        <div className="border-b border-default-200 py-4">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <Link href={`/news-feed/${_id}`}>
                <h1 className="cursor-pointer text-2xl">{title}</h1>
              </Link>
              {/* <p className="flex items-center gap-1 text-xs">
                Found on: <Calendar width={14} />
                {format(new Date(dateFound), "dd MMM, yyyy")}
              </p> */}
            </div>
            <div>
              {/* <p className="flex items-center gap-1">
                <MapPin width={18} />
                {location}, {city}
              </p> */}
            </div>
          </div>
          {/* <p>{content}</p> */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>

        <ImageGallery images={images} />

        <div className="mt-4 flex gap-5">
          {email !== loggedInUser?.email && (
            <div className="w-[1px] bg-default-200" />
          )}
          <Button variant="light" className="flex-1">
            Like
          </Button>
          <Button variant="light" className="flex-1">
            Comment
          </Button>
          {email !== loggedInUser?.email && (
            <>
              <Button variant="light" className="flex-1">
                Share
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
