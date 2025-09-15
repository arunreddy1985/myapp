-- Create the customers table
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert 3 sample records (excluding Priya and Arun)
INSERT INTO customers (first_name, last_name, email, phone)
VALUES 
('John', 'Smith', 'john.smith@example.com', '022-456-7890'),
('Meera', 'Patel', 'meera.patel@example.com', '020-321-7654'),
('David', 'Lee', 'david.lee@example.com', '027-654-3210');

