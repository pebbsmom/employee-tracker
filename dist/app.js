"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
// import consoleTable from "console.table";
const queries_1 = require("./queries");
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.green("Welcome to Employee Tracker!"));
        const { action } = yield inquirer_1.default.prompt([
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
                console.table(yield (0, queries_1.getDepartments)());
                break;
            case "View All Roles":
                console.table(yield (0, queries_1.getRoles)());
                break;
            case "View All Employees":
                console.table(yield (0, queries_1.getEmployees)());
                break;
            case "Add Department":
                const { departmentName } = yield inquirer_1.default.prompt([
                    { type: "input", name: "departmentName", message: "Enter the department name:" },
                ]);
                yield (0, queries_1.addDepartment)(departmentName);
                console.log(chalk_1.default.green("Department added!"));
                break;
            case "Add Role":
                const { title, salary, departmentId } = yield inquirer_1.default.prompt([
                    { type: "input", name: "title", message: "Enter role title:" },
                    { type: "input", name: "salary", message: "Enter role salary:" },
                    { type: "input", name: "departmentId", message: "Enter department ID:" },
                ]);
                yield (0, queries_1.addRole)(title, Number(salary), Number(departmentId));
                console.log(chalk_1.default.green("Role added!"));
                break;
            case "Add Employee":
                const { firstName, lastName, roleId, managerId } = yield inquirer_1.default.prompt([
                    { type: "input", name: "firstName", message: "Enter first name:" },
                    { type: "input", name: "lastName", message: "Enter last name:" },
                    { type: "input", name: "roleId", message: "Enter role ID:" },
                    { type: "input", name: "managerId", message: "Enter manager ID (null if no manager):" },
                ]);
                yield (0, queries_1.addEmployee)(firstName, lastName, Number(roleId), managerId ? Number(managerId) : undefined);
                console.log(chalk_1.default.green("Employee added!"));
                break;
            case "Update Employee Role":
                const { employeeId, newRoleId } = yield inquirer_1.default.prompt([
                    { type: "input", name: "employeeId", message: "Enter employee ID to update:" },
                    { type: "input", name: "newRoleId", message: "Enter new role ID:" },
                ]);
                yield (0, queries_1.updateEmployeeRole)(Number(employeeId), Number(newRoleId));
                console.log(chalk_1.default.green("Employee role updated!"));
                break;
            case "Exit":
                console.log(chalk_1.default.blue("Goodbye!"));
                process.exit();
        }
        startApp();
    });
}
startApp();
