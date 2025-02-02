import axios from "axios";

// 카드 검색, 리스트
export const fetchSearchCard = async (keyword) => {
  const response = await axios.get("/card/list", {
    params: { keyword },
  });
  return response.data;
};
