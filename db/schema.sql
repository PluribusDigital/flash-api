
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username  VARCHAR(32) not null,
  password  VARCHAR(32) not null,
  name      VARCHAR(64) not null,
  email     VARCHAR(64) not null,
  title     VARCHAR(64) not null,
  organization VARCHAR(64) not null,
  department  VARCHAR(64) not null
);


CREATE TABLE kudos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(32) not null,
  full_text TEXT not null,
  from_user_id INT not null,
  to_user_id INT not null,
  created_at DATE not null,
  FOREIGN KEY (from_user_id) REFERENCES users (ID),
  FOREIGN KEY (to_user_id) REFERENCES users (ID)
);
