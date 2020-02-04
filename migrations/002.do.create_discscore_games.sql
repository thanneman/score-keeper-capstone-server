DROP TABLE IF EXISTS games;

CREATE TABLE games (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  course_name TEXT NOT NULL,
  date TIMESTAMP DEFAULT now() NOT NULL,
  course_par INTEGER NOT NULL,
  front_score INTEGER NOT NULL,
  back_score INTEGER NOT NULL,
  notes TEXT
);