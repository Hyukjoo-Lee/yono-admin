import axios from "axios";

// 카드 검색, 리스트
export const fetchSearchCard = async (keyword) => {
  const response = await axios.get("/card/list", {
    params: { keyword },
  });
  return response.data;
};

// 카드 생성
export const createCard = async (cardInfo) => {
  try {
    const response = await axios.post(`/card/create`, cardInfo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
};
