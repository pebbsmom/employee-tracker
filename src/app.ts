import inquirer from "inquirer";
import chalk from "chalk";
// import consoleTable from "console.table";
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from "./queries";

async function startApp() {
  console.log(chalk.green("Welcome to Employee Tracker!"));

  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Choose an action:",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Exit",
      ],
    },
  ]);

  switch (action) {
    case "View All Departments":
      console.table(await getDepartments());
      break;
    case "View All Roles":
      console.table(await getRoles());
      break;
    case "View All Employees":
      console.table(await getEmployees());
      break;
    case "Add Department":
      const { departmentName } = await inquirer.prompt([
        { type: "input", name: "departmentName", message: "Enter the department name:" },
      ]);
      await addDepartment(departmentName);
      console.log(chalk.green("Department added!"));
      break;
    case "Add Role":
      const { title, salary, departmentId } = await inquirer.prompt([
        { type: "input", name: "title", message: "Enter role title:" },
        { type: "input", name: "salary", message: "Enter role salary:" },
        { type: "input", name: "departmentId", message: "Enter department ID:" },
      ]);
      await addRole(title, Number(salary), Number(departmentId));
      console.log(chalk.green("Role added!"));
      break;
    case "Add Employee":
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: "input", name: "firstName", message: "Enter first name:" },
        { type: "input", name: "lastName", message: "Enter last name:" },
        { type: "input", name: "roleId", message: "Enter role ID:" },
        { type: "input", name: "managerId", message: "Enter manager ID (null if no manager):" },
      ]);
      await addEmployee(firstName, lastName, Number(roleId), managerId ? Number(managerId) : undefined);
      console.log(chalk.green("Employee added!"));
      break;
    case "Update Employee Role":
      const { employeeId, newRoleId } = await inquirer.prompt([
        { type: "input", name: "employeeId", message: "Enter employee ID to update:" },
        { type: "input", name: "newRoleId", message: "Enter new role ID:" },
      ]);
      await updateEmployeeRole(Number(employeeId), Number(newRoleId));
      console.log(chalk.green("Employee role updated!"));
      break;
    case "Exit":
      console.log(chalk.blue("Goodbye!"));
      process.exit();
  }

  startApp();
}

startApp();
