import pool from "./db";

export async function getDepartments() {
  const { rows } = await pool.query("SELECT * FROM department");
  return rows;
}

export async function getRoles() {
  const { rows } = await pool.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
  return rows;
}

export async function getEmployees() {
  const { rows } = await pool.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
  return rows;
}

export async function addDepartment(name: string) {
  await pool.query("INSERT INTO department (name) VALUES ($1)", [name]);
}

export async function addRole(title: string, salary: number, departmentId: number) {
  await pool.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, departmentId]);
}

export async function addEmployee(firstName: string, lastName: string, roleId: number, managerId?: number) {
  await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, roleId, managerId || null]
  );
}

export async function updateEmployeeRole(employeeId: number, newRoleId: number) {
  await pool.query("UPDATE employee SET role_id = $1 WHERE id = $2", [newRoleId, employeeId]);
}
