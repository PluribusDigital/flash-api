
CREATE TABLE items (
  id        SERIAL  PRIMARY KEY, 
  text      VARCHAR(140) not null, 
  complete  BOOLEAN
);