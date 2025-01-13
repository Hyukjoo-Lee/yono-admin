import axios from "axios";

// 공지사항 검색, 리스트
export const fetchSearchNotice = async (keyword) => {
  const response = await axios.get("/notice/list", {
    params: { keyword },
  });
  return response.data;
};

// 공지사항 삭제
export const deleteNotice = async (ids) => {
  const response = await axios.post("/notice/delete", ids);
  return response.data;
};

// 공지사항 등록
export const createNotice = async (formData) => {
  const response = await axios.post("/notice/write", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 공지사항 상세 조회
export const fetchNoticeDetail = async (id) => {
  const response = await axios.get("/notice/detail", {
    params: { id },
  });
  return response.data;
};

// 공지사항 수정
export const updateNotice = async (formData) => {
  try {
    const response = await axios.post("/notice/edit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.status === 200; // 수정 성공 여부 반환
  } catch (error) {
    console.error("공지사항 수정 중 오류 발생:", error);
    return false;
  }
};