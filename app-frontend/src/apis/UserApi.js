import axios from "axios";

// 회원 검색, 리스트
export const fetchSearchResults = async (keyword, selectValue) => {
  const response = await axios.get("/user/list", {
    params: { keyword, selectValue },
  });
  return response.data;
};

// 회원 탈퇴
export const handleDeleteUser = async (userNum) => {
  try {
    const response = await axios.put(`/user/delete?userNum=${userNum}&state=inactive`);
    return response.data;
  } catch (error) {
    console.error("탈퇴 실패:", error);
    throw error;
  }
};
