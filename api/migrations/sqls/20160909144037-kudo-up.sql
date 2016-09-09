CREATE SEQUENCE kudo_serial START 101;

CREATE TABLE kudo (
  id            INTEGER PRIMARY KEY DEFAULT nextval('kudo_serial'),
  nominee       INTEGER REFERENCES kudo (id),
  nominator     INTEGER REFERENCES kudo (id),
  category      VARCHAR(40),
  comment       VARCHAR(2000),
  created_date  DATE
);