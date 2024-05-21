import { postsSearchEngineService } from "../service/PostService";

export const usePostsSearchEngine = async (filter) => {
  const { data, status } = await postsSearchEngineService(filter);
  return [data.data];
};
