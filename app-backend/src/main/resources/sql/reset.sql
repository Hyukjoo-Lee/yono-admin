
-- 모든 Foreign Key 제약조건 제거
BEGIN
    FOR cur IN (SELECT constraint_name, table_name
                FROM user_constraints
                WHERE constraint_type = 'R') LOOP
        EXECUTE IMMEDIATE 'ALTER TABLE ' || cur.table_name || ' DROP CONSTRAINT ' || cur.constraint_name;
    END LOOP;
END;
/

-- 모든 테이블 삭제
BEGIN
    FOR cur IN (SELECT table_name FROM user_tables) LOOP
        EXECUTE IMMEDIATE 'DROP TABLE ' || cur.table_name || ' CASCADE CONSTRAINTS PURGE';
    END LOOP;
END;
/

-- 모든 시퀀스 삭제
BEGIN
    FOR cur IN (SELECT sequence_name FROM user_sequences) LOOP
        EXECUTE IMMEDIATE 'DROP SEQUENCE ' || cur.sequence_name;
    END LOOP;
END;
/

commit;

-- 휴지통 삭제
PURGE RECYCLEBIN;