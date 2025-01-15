create sequence notice_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence notice_seq
nocache;


insert into notice (notice_no, title, admin_id, content, img_url, created_At) 
values (notice_seq.nextval, '공지입니다다.', 'adminId', '내용입니다.', '/uploads/images/2025-1-15/image2.jpg', sysdate);

insert into notice (notice_no, title, admin_id, content, img_url, created_At) 
values (notice_seq.nextval, '오픈했어어', 'adminId', '내용입니다.', '/uploads/images/2025-1-15/image2.jpg', sysdate);


commit;

select * from notice order by NOTICE_NO;

drop table notice;

