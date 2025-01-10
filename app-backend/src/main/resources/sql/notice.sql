create sequence notice_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence notice_seq
nocache;


insert into notice (notice_no, title, admin_id, content, img_url, created_At, updated_At) 
values (notice_seq.nextval, '공지입니다다.', 'jeId', '내용입니다.', '/images/image2.jpg', sysdate, sysdate);

insert into notice (notice_no, title, admin_id, content, img_url, created_At, updated_At) 
values (notice_seq.nextval, '오픈했어어', 'jeId', '내용입니다.', '/images/image2.jpg', sysdate, sysdate);


commit;

select * from notice;

drop table notice;

