INSERT INTO users123 (name, email)
VALUES
  ('Arun Example', 'arun@example.com'),
  ('Test User', 'test@example.com')
ON CONFLICT DO NOTHING;

