create sequence user_seq
start with 1
increment by 1
nocycle
nocache;

alter sequence user_seq
nocache;

select * from user_info;

insert into user_info (user_num, user_id, name, profile, email,  password,  address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'crtestid', '김채림', '/images/image1.jpg', 'cr@google.com', '1234','서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password,  address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'hjtestid', '이혁주', '/images/image2.jpg', 'hj@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'mktestid', '허민경', '/images/image3.jpg', 'mk@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'jhtestid', '김지훈', '/images/image3.jpg', 'jh@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);


insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'jetestid', '박지은', '/images/image3.jpg', 'je@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'hongid', '홍길동', '/images/image2.jpg', 'hong@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'leeid', '이순신', '/images/image2.jpg', 'lee@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'ganadaid', '가나다', '/images/image2.jpg', 'ganada@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'parkid', '박바바바', '/images/image2.jpg', 'park@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'hiid', '헬로우우', '/images/image2.jpg', 'hi@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'hhid', '히히', '/images/image2.jpg', 'hh@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);

insert into user_info (user_num, user_id, name, profile, email, password, address, detail_Address, postcode, spending_target, created_at, updated_at, state) 
values (user_seq.nextval, 'ggid', '구구', '/images/image2.jpg', 'gg@google.com', '1234', '서울시 용산구', '1415호', '11111', 500000, sysdate, sysdate, 1);


commit;

select * from user_info where email = 'mk@google.com';

drop table user_info;

update user_info set state = 1 where user_num = 21;
select * from user_info;