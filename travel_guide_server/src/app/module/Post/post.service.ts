import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TItem, images: TImageFiles) => {
  const { itemImages } = images;
  payload.images = itemImages.map((image) => image.path);

  const result = await Post.create(payload);

  // await addDocumentToIndex(result, 'items');
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

export const PostService = {
  createPostIntoDB,
  getAllPosts,
  getPostById,
};
