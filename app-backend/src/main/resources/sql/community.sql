create sequence posts_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence posts_seq
nocache;


insert into tbl_posts (no, title, category, userid, content, regdate, viewcnt,  imgurl, created_At, updated_At) 
values (posts_seq.nextval, '제목입니다.', '정보공유', 'jjid', '내용입니다.', sysdate, 0, '/images/image2.jpg', sysdate, sysdate);

insert into tbl_posts (no, title, category, userid, content, regdate, viewcnt,  imgurl, created_At, updated_At) 
values (posts_seq.nextval, '커뮤니티 질문', '질문', 'park', '내용입니다.', sysdate, 0, '/images/image2.jpg', sysdate, sysdate);

insert into tbl_posts (no, title, category, userid, content, regdate, viewcnt,  imgurl, created_At, updated_At) 
values (posts_seq.nextval, '퐈이팅이다', '기타질문', 'qqq', '내용입니다.', sysdate, 0, '/images/image2.jpg', sysdate, sysdate);

insert into tbl_posts (no, title, category, userid, content, regdate, viewcnt,  imgurl, created_At, updated_At) 
values (posts_seq.nextval, '정보공유합니다.', '정보공유', 'haha', '내용입니다.', sysdate, 0, '/images/image2.jpg', sysdate, sysdate);

commit;

select * from tbl_posts;

update tbl_posts set title = '가나다라' where no = 4;

drop table tbl_posts;
UPDATE tbl_posts SET user_num = 21 WHERE no = 7;
