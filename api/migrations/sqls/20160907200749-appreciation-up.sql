CREATE SEQUENCE appreciation_serial START 101;

CREATE TABLE appreciation (
  id                          INTEGER PRIMARY KEY DEFAULT nextval('appreciation_serial') not null,
  from_user                   INTEGER REFERENCES users (id) not null,
  to_user                     INTEGER REFERENCES users (id) not null,
  date_given                  DATE not null,
  description_of_conduct      VARCHAR(8000) not null,
  positive_effect_on_others   VARCHAR(8000) not null,
  status                      VARCHAR(32) not null
);