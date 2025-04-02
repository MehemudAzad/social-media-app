import { MeiliSearch } from 'meilisearch';
import { Document, Types } from 'mongoose';

import config from '../config';
import { noImage } from '../module/Post/post.constant';
import { TPost } from '../module/Post/post.interface';
import { TUser } from '../module/User/user.interface';
// import { noImage } from '../modules/Item/item.constant';
// import { TItem } from '../modules/Item/item.interface';

const meiliClient = new MeiliSearch({
  host: config.meilisearch_host as string,
  apiKey: config.meilisearch_master_key,
});

export async function addDocumentToIndex(
  result: Document<unknown, object, TPost> & TPost & { _id: Types.ObjectId },
  indexKey: string
) {
  const index = meiliClient.index(indexKey);

  const { _id, title, content, images } = result;
  const firstImage = images?.[0] || noImage;

  const document = {
    id: _id.toString(), // Ensure the ID is a string
    title,
    content,
    thumbnail: firstImage,
  };

  try {
    await index.addDocuments([document]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error adding document to MeiliSearch:', error);
  }
}

export async function addUserToIndex(
    user: Document<unknown, object, TUser> & TUser & { _id: Types.ObjectId },
    indexKey: string
  ) {
    const index = meiliClient.index(indexKey);
  
    const { _id, username, email, profilePicture, role, status } = user;
  
    const document = {
      id: _id.toString(), // Ensure the ID is a string
      username,
      email,
      profilePicture: profilePicture || 'default-profile.png', // Provide a default if none exists
      role,
      status,
    };
  
    try {
      await index.addDocuments([document]);
    } catch (error) {
      console.error('Error adding user to Meilisearch:', error);
    }
  }



export const deleteDocumentFromIndex = async (indexKey: string, id: string) => {
  const index = meiliClient.index(indexKey);

  try {
    await index.deleteDocument(id);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting resource from MeiliSearch:', error);
  }
};

export default meiliClient;