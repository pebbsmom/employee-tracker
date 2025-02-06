-- Insert departments
INSERT INTO department (name) VALUES
('Engineering'),
('Finance'),
('Human Resources'),
('Marketing');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Senior Engineer', 100000, 1),
('Accountant', 60000, 2),
('HR Manager', 70000, 3),
('Marketing Coordinator', 50000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 3, NULL),
('Alice', 'Johnson', 4, NULL), 
('Bob', 'Williams', 2, 1),  
('Charlie', 'Brown', 5, NULL); 
