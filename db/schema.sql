CREATE SEQUENCE users_serial START 101;

CREATE TABLE users (
  id INTEGER PRIMARY KEY DEFAULT nextval('users_serial'),
  username  VARCHAR(32) not null,
  password  VARCHAR(32) not null,
  name      VARCHAR(64) not null,
  email     VARCHAR(128) not null,
  title     VARCHAR(64) not null,
  organization VARCHAR(64) not null,
  department  VARCHAR(64) not null,
  role      VARCHAR(32) not null,
  supervisor_id INTEGER REFERENCES users (id)
);
