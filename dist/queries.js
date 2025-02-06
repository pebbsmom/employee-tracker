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
exports.getDepartments = getDepartments;
exports.getRoles = getRoles;
exports.getEmployees = getEmployees;
exports.addDepartment = addDepartment;
exports.addRole = addRole;
exports.addEmployee = addEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
const db_1 = __importDefault(require("./db"));
function getDepartments() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield db_1.default.query("SELECT * FROM department");
        return rows;
    });
}
function getRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield db_1.default.query(`
    SELECT role.id, role.title, department.name AS department, role.salary
    FROM role
    JOIN department ON role.department_id = department.id
  `);
        return rows;
    });
}
function getEmployees() {
    return __awaiter(this, void 0, void 0, function* () {
        const { rows } = yield db_1.default.query(`
    SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    JOIN role ON employee.role_id = role.id
    JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
  `);
        return rows;
    });
}
function addDepartment(name) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query("INSERT INTO department (name) VALUES ($1)", [name]);
    });
}
function addRole(title, salary, departmentId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query("INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)", [title, salary, departmentId]);
    });
}
function addEmployee(firstName, lastName, roleId, managerId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)", [firstName, lastName, roleId, managerId || null]);
    });
}
function updateEmployeeRole(employeeId, newRoleId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query("UPDATE employee SET role_id = $1 WHERE id = $2", [newRoleId, employeeId]);
    });
}
