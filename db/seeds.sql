INSERT INTO department (name)
VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, department, salary)
VALUE ("Sales Lead", "Sales", 100000), ("SalesPerson","Sales", 80000), ("Lead Engineer", "Engineering", 150000), ("Software Engineer", "Engineering", 120000), ("Account Manager", "Finance", 160000),("Legal Team Lead", "Legal",250000);

INSERT INTO employee (first_name, last_name, title, department, salary, manager)
VALUE ("John", "Doe", "Sales Lead", "Sales", 100000, NULL), ("Mike","Chan", "Salesperson", "Sales",80000, "John Doe"), ("Ashley", "Rodriguez", "Lead Engineer","Engineering",150000, NULL), ("Kunal", "Singh", "Account Manager", "Finance", 160000, NULL), ("Tom","Allen","Legal Team Lead","Legal", 250000, NULL);