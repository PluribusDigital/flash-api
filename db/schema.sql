
CREATE TABLE users (
  username  VARCHAR(32) PRIMARY KEY,
  password  VARCHAR(32) not null,
  name      VARCHAR(64) not null,
  title     VARCHAR(64) not null,
  organization VARCHAR(64) not null,
  department  VARCHAR(64) not null
);
