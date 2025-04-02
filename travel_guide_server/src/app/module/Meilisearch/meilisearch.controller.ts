import { Request, Response } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { MeilisearchServices } from './meilisearch.service';

const getPostsFromMeili = catchAsync(async (req: Request, res: Response) => {
  const { searchTerm, limit } = req.query;

  const numberLimit = Number(limit) || 10;

  const result = await MeilisearchServices.getAllPosts(
    numberLimit,
    searchTerm as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts Retrieved Successfully',
    data: result,
  });
});

export const MeiliSearchController = {
  getPostsFromMeili,
};