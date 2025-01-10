import axios from "axios";

// 공지사항 검색, 리스트
export const fetchSearchNotice = async (keyword) => {
  const response = await axios.get("/notice/list", {
    params: { keyword },
  });
  return response.data;
};

// 공지사항항 삭제
export const deleteNotice = async (ids) => {
  const response = await axios.post("/notice/delete", ids);
  return response.data;
};
