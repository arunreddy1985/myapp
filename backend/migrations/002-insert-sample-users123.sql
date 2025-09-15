INSERT INTO users1234 (name, email)
VALUES
  ('Arun Example', 'arun@example.com'),
  ('Test User', 'test@example.com')
ON CONFLICT DO NOTHING;

