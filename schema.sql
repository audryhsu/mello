CREATE TABLE boards (
  id serial PRIMARY KEY,
  title varchar(40),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

CREATE TABLE lists (
  id serial PRIMARY KEY,
  board_id integer references boards(id) ON DELETE CASCADE,
  title varchar(40),
  position float,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)

CREATE TABLE cards (
  id serial PRIMARY KEY,
  list_id integer references lists(id) ON DELETE CASCADE,
  board_id integer references boards(id) ON DELETE CASCADE,
  title varchar(40),
  position float,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)