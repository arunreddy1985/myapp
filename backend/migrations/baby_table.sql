-- Create table
CREATE TABLE baby_names (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    gender CHAR(1) CHECK (gender IN ('M', 'F')),
    birth_year INT NOT NULL,
    state VARCHAR(2) NOT NULL,
    count INT NOT NULL
);

-- Insert sample rows
INSERT INTO baby_names (first_name, gender, birth_year, state, count) VALUES
('Liam', 'M', 2020, 'CA', 1850),
('Olivia', 'F', 2020, 'CA', 1720),
('Noah', 'M', 2019, 'NY', 1400),
('Emma', 'F', 2019, 'NY', 1360),
('Ava', 'F', 2018, 'TX', 1280);
