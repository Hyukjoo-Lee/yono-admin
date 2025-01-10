import axios from "axios";

// 커뮤니티 검색, 리스트
export const fetchSearchCommunity = async (keyword, selectValue) => {
  const response = await axios.get("/community/list", {
    params: { keyword, selectValue },
  });
  return response.data;
};

// 커뮤니티 삭제제
export const deleteCommunityItems = async (ids) => {
  const response = await axios.post("/community/delete", ids);
  return response.data;
};