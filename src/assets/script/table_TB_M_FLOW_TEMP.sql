
ALTER SESSION SET CURRENT_SCHEMA=CHP
/

DROP TABLE CHP.TB_M_FLOW_TEMP;
CREATE TABLE CHP.TB_M_FLOW_TEMP
(
    FLOW_ID       NUMBER       not null
        constraint PK_FLOW_TEMP
            primary key,
    FLOW_NAME     VARCHAR2(100 char),
    RESULT_PARAM  VARCHAR2(100 char),
    START_FLOW_ID NUMBER,
    IS_ACTIVE     CHAR(1 char) not null,
    CREATE_DATE   TIMESTAMP(6) not null,
    CREATE_USER   VARCHAR2(50 char),
    UPDATE_DATE   TIMESTAMP(6),
    UPDATE_USER   VARCHAR2(50 char)
)
    LOGGING
    TABLESPACE CHPMASDATATBS
    PCTFREE 10
    INITRANS 1
    STORAGE
(
  INITIAL 65536
  NEXT 1048576
  MINEXTENTS 1
  MAXEXTENTS UNLIMITED
  BUFFER_POOL DEFAULT
) NOCOMPRESS;



CREATE UNIQUE INDEX CHP.PK_FLOW_TEMP ON CHP.TB_M_FLOW_TEMP (FLOW_ID ASC)
    LOGGING
    TABLESPACE CHPMASDATATBS
    PCTFREE 10
    INITRANS 2
    STORAGE
(
  INITIAL 65536
  NEXT 1048576
  MINEXTENTS 1
  MAXEXTENTS UNLIMITED
  BUFFER_POOL DEFAULT
)
NOPARALLEL;




GRANT SELECT, INSERT, UPDATE, DELETE ON CHP.TB_M_FLOW_TEMP to DBCHP;
COMMIT;



select * from CHP.TB_M_FLOW_TEMP;