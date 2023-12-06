import type { Score } from "~/utils/types";

export const getTopScores = async (url: string, id: string | number): Promise<Score[]> => {
  const scores = await fetch(`${url}/scores?populate[user][fields][0]=username&populate[user][fields][1]=email&sort[0]=amount&pagination[limit]=10&filters[engine][id][$eq]=${id}`);
  let response = await scores.json();
  // catchError(response)
  console.log({ response });
  return response.data;
};