import { TPost } from './post.interface';
import { Post } from './post.model';

const createPost = async (post: TPost) => {
  const result = await Post.create(post);
  return result;
};

const getAllPosts = async () => {
  const result = await Post.find({}).populate('author', 'name email');
  return result;
};

const getPostById = async (postId: string) => {
  const result = await Post.findById(postId).populate('author', 'name email');
  return result;
};

export const PostService = {
  createPost,
  getAllPosts,
  getPostById,
};
