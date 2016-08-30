/* Replace with your SQL commands */

CREATE SEQUENCE kudos_serial START 1;

CREATE TABLE kudos (
  id            INTEGER PRIMARY KEY DEFAULT nextval('kudos_serial'),
  title         VARCHAR(100) not null,
  description   VARCHAR(5000) not null,
  from_id       INTEGER REFERENCES users (id),
  to_id         INTEGER REFERENCES users (id),
  recorded      TIMESTAMP with time zone default now()
);