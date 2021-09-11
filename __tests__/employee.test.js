const { expect } = require('@jest/globals');
const Employee = require('../lib/Employee');

test('new Employee()', () => {
  const employee = new Employee('Michael', 'Jordan');

  console.log(employee.getColumns());

  expect(employee.first_name).toBe('Michael');
  expect(employee.last_name).toBe('Jordan');
});

test('Employee.errorCheck()', () => {
  const employee = new Employee('Michael', 'Jordan');

  console.log(employee.errorCheck());

  expect(employee.first_name).toBe('Michael');
  expect(employee.last_name).toBe('Jordan');
});
