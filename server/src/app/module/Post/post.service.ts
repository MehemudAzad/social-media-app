import { addDocumentToIndex, deleteDocumentFromIndex } from '../../utils/meilisearch';
import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost, images: TImageFiles) => {
  const { itemImages } = images;
  payload.images = itemImages.map((image) => image.path);

  const result = await Post.create(payload);

  await addDocumentToIndex(result, 'posts');
  return result;
};

const getAllPosts = async () => {
  const result = await Post.find({}).populate('author', 'username email');
  return result;
};

const getPostById = async (postId: string) => {
  const result = await Post.findById(postId).populate('author', 'username email');
  return result;
};

const deletePostFromDB = async (postId: string) => {
  const result = await Post.findByIdAndDelete(postId);
  const deletedItemId = result?._id;
  if (deletedItemId) {
    await deleteDocumentFromIndex('posts', deletedItemId.toString());
  }
  return result;
};

export const PostService = {
  createPostIntoDB,
  getAllPosts,
  getPostById,
  deletePostFromDB
};
