// import envConfig from "@/src/config/envConfig";
// import { delay } from "@/src/utils/delay";

export const getRecentPosts = async () => {
  const res = await fetch(
    `http://localhost:5001/api/post`,
  );

//   await delay(5000);

  return res.json();
};