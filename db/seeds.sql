INSERT INTO departments
  (name)
VALUES
  ('Admin'),
  ('Sales & Marketing'),
  ('Finance'),
  ('Operations'),
  ('Technology');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  -- ('Admin'),
  ('CEO', 12000.00, 1),
  ('Director of Marketing', 7500.00, 1),
  ('Director of Sales', 10000.00, 1),
  ('CFO', 10000.00, 1),
  ('HR Director', 6000.00, 1),
  ('CTO', 10000.00, 1),
  
  -- ('Sales & Marketing'),
  ('Sales Agent', 5000.00, 2),
  ('Marketing Coordinator', 3000.00, 2),

  -- ('Finance'),
  ('Accountant', 4000.00, 3),
  
  -- ('Operations'),
  ('Maintenance', 3000.00, 4),

  -- ('Technology');
  ('Help Desk', 2500.00, 5),
  ('Developer', 5000.00, 5);
  

  

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  -- CEO
  ('Malala', 'Yusuf', 1, NULL),
  -- Director of Marketing
  ('James', 'Fraser', 2, 1),
  -- Director of Sales
  ('Harry', 'Kane', 3, 1),
  -- CFO
  ('Jack', 'London', 4, 1),
  -- HR Director
  ('Michelle', 'Obama', 4, 1),
  -- Director of Operations
  ('Lionel', 'Messi', 5, 1),
  -- CTO
  ('Elon', 'Musk', 6, 1),
  -- Sales Agents
  ('Robert', 'Bruce', 7, 3),
  ('Peter', 'Greenaway', 7, 3),
  -- Marketing Coordinators
  ('Derek', 'Jarman', 8, 2),
  ('Paolo', 'Pasolini', 8, 2),
  -- Accountants
  ('Heathcote', 'Williams', 9, 4),
  ('Sandy', 'Powell', 9, 4),
  ('Emil', 'Zola', 9, 4),
  -- Maintenance
  ('Bob', 'Vila', 10, 6),
  -- Help Desk
  ('Harvey', 'Elliot', 11, 7),
  -- Developer
  ('Jurgen', 'Klopp', 12, 7),
  ('Kieran', 'Trippier', 12, 7);
  