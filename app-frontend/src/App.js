import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/layout/Layout";
import UserComponent from "./pages/user/UserComponent";
import CardComponent from "./pages/card/CardComponent";
import CommunityComponent from "./pages/community/CommunityComponent";
import NoticeComponent from "./pages/notice/NoticeComponent";
import NoticeWrite from "./pages/notice/NoticeWrite";
import NoticeEdit from "./pages/notice/NoticeEdit";
import NoticeView from "./pages/notice/NoticeView";

export const drawerWidth = 240;
export const headerHeight = 78;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<UserComponent />} />
          <Route path="/card" element={<CardComponent />} />
          <Route path="/communityList" element={<CommunityComponent />} />
          <Route path="/noticeList" element={<NoticeComponent />} />
          <Route path="/notice/write" element={<NoticeWrite />} />
          <Route path="/notice/edit" element={<NoticeEdit />} />
          <Route path="/notice/view" element={<NoticeView />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
