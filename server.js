const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const db = require(".");
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "mydatabase"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startScreen();
  });
  

function startScreen() {
    inquirer
      .prompt({
        type: "list",
        choices: [
          "Add department",
          "Add role",
          "Add employee",
          "View departments",
          "View roles",
          "View employees",
          "Update employee role",
          "Quit"
        ],
        message: "What would you like to do?",
        name: "option"
      })
      .then(function(result) {
        console.log("You entered: " + result.option);
  
        switch (result.option) {
          case "Add department":
            addDepartment();
            break;
          case "Add role":
            addRole();
            break;
          case "Add employee":
            addEmployee();
            break;
          case "View departments":
            viewDepartment();
            break;
          case "View roles":
            viewRoles();
            break;
          case "View employees":
            viewEmployees();
            break;
          case "Update employee role":
            updateEmployee();
            break;
          default:
            quit();
        }
      });
  }
  
  
  //All of the corresponding functions found below
  
  function addDepartment() {
  
  
      inquirer.prompt({
        
          type: "input",
          message: "What is the name of the department?",
          name: "deptName"
  
      }).then(function(answer){
  
  
  
          connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
              if (err) throw err;
              console.table(res)
              startScreen()
      })
      })
  }
  
  
  function addRole() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the title of the role?",
          name: "roleName"
        },
        {
          type: "input",
          message: "What is the department for this role?",
          name: "dempartmentRole"
        },
        {
          type: "input",
          message: "What is the salary for this role?",
          name: "roleSalary"
        }
      ])
      .then(function(answer) {
  
  
        connection.query("INSERT INTO role (title, department, salary) VALUES (?, ?, ?)", [answer.roleName, answer.departmentRole, answer.roleSalary], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What's the first name of the employee?",
          name: "firstName"
        },
        {
          type: "input",
          message: "What's the last name of the employee?",
          name: "lastName"
        },
        {
          type: "input",
          message: "What is the employee's role title?",
          name: "employeeTitle"
        },
        {
          type: "input",
          message: "What department does the employee belong to?",
          name: "employeeDepartment"
        },
        {
          type: "input",
          message: "What is the salary for this employee?",
          name: "employeeSalary"
        },
        {
          type: "input",
          message: "Who is the employee's manager?",
          name: "employeeManager"
        },

      ])
      .then(function(answer) {
  
        
        connection.query("INSERT INTO employee (first_name, last_name, title, department, salary, manager) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.employeeTitle, answer.employeeDepartment, answer.employeeSalary, answer.employeeManager], function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  

  
  function updateEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Which employee would you like to update?",
          name: "update"
        },
  
        {
          type: "input",
          message: "What do you want to update to?",
          name: "updateRole"
        }
      ])
      .then(function(answer) {
  
        connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.update],function(err, res) {
          if (err) throw err;
          console.table(res);
          startScreen();
        });
      });
  }
  
  
  function viewDepartment() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  }
  
  function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  }
  
  function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      startScreen();
    });
  }
  
  function quit() {
    connection.end();
    process.exit();
  }
