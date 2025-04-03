"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

import { Button } from "@heroui/button";
import { getCommentByPostId } from "@src/services/Comment";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

interface IProps {
  postId: string;
}
export const CommentsModal = ({ postId }: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // const { data: comments } = await getCommentByPostId(postId);
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      getCommentByPostId(postId)
        .then((data) => {
          setComments(data || []);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
          setComments([]);
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, postId]);
  console.log(comments);
  return (
    <>
      <Button variant="light" className="flex-1" onPress={onOpen}>
        Comment
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Comments
              </ModalHeader>
              <ModalBody>
                {comments?.length > 0 ? (
                  comments.map((comment: any) => (
                    <div
                      key={comment._id}
                      className="mb-4 flex items-start gap-2"
                    >
                      <div>
                        <p className="font-semibold">
                          {comment?.author?.username}
                        </p>
                        <p>{comment?.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center">
                    <p className="text-gray-500">No comments yet</p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

