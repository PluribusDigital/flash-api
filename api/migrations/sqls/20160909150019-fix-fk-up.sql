DROP TABlE kudo;

CREATE TABLE kudo (
  id            INTEGER PRIMARY KEY DEFAULT nextval('kudo_serial'),
  nominee       INTEGER REFERENCES users (id),
  nominator     INTEGER REFERENCES users (id),
  category      VARCHAR(40),
  comment       VARCHAR(2000),
  created_date  DATE
);