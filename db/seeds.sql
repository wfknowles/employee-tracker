INSERT INTO departments
  (name)
VALUES
  ('Marketing'),
  ('Accounting'),
  ('Human Resources'),
  ('Sales'),
  ('IT');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('Marketing Coordinator', 40000.00, 1),
  ('Marketing Direct', 80000.00, 1),
  ('Marketing Intern', 0.00, 1),
  ('CFO', 120000.00, 2),
  ('Accounts Receivable', 40000.00, 2),
  ('Accounting Intern', 0.00, 2),
  ('Manager', 60000.00, 3),
  ('Inside Sales', 80000.00, 4),
  ('Outside Sales', 30000.00, 4),
  ('Webdev 1', 80000.00, 5),
  ('Tech Support', 50000.00, 5);
  

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('James', 'Fraser', 1, NULL),
  ('Jack', 'London', 2, 1),
  ('Robert', 'Bruce', 3, 1),
  ('Peter', 'Greenaway', 4, 1),
  ('Derek', 'Jarman', 5, 2),
  ('Paolo', 'Pasolini', 6, 2),
  ('Heathcote', 'Williams', 7, 2),
  ('Sandy', 'Powell', 8, 2),
  ('Emil', 'Zola', 9, 2);
  