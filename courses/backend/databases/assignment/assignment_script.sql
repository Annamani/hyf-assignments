--Part 1: Basic CRUD Operations
--Insert a new user with your own name and email
INSERT INTO user(name,email,phone) VALUES ('Annamani','annamani@hyf.dk','123-456-789');
select * from user;

--Insert a new task assigned to yourself with the following attributes:
--Title: "Learn SQL"
--Description: "Practice database queries"
--Status: "In Progress"
--Due date: One week from today
INSERT INTO task (title, description, created, updated, due_date, status_id)
VALUES ("Learn SQL","Practice database queries",CURRENT_TIMESTAMP,CURRENT_TIMESTAMP,DATE('now', '+7 days'),2);
select * from task;

--Update the title of the task you just created to "Master SQL Basics"
update task set title="Master SQL Basics" where title="Learn SQL";

--Change the due date of your task to two weeks from today
update task set due_date=DATE('now', '+14 days') where title="Master SQL Basics";

--Change the status of your task to "Done"
UPDATE task SET status_id = 3 WHERE title = 'Master SQL Basics';

--Delete one of the tasks in the database (choose any task)
DELETE FROM task WHERE task_id = 4;

--Part 2: Working with Relationships
select * from user_task;

--List all users who don't have any tasks assigned
select u.name as user_name from user u 
left join user_task ut on ut.user_Id =u.user_Id 
where ut.task_Id IS NULL;

--Find all tasks with a status of "Done"
select t.title,s.name as status from task t
left join status s on s.id=t.status_id
where s.name='Done';


--Find all overdue tasks (due_date is earlier than today)
select t.task_id, t.title as task_name,t.due_date from task t
WHERE t.due_date IS NOT NULL AND DATE(t.due_date) < DATE('now');

--Part 3: Modifying the Database Schema
--Add a new column called priority to the task table with possible values: 'Low', 'Medium', 'High'.
--💡 Remember to provide default values.
ALTER table task add column priority text not null default "Medium";

--Update some existing tasks to have different priority values
UPDATE task
SET priority = 'High'
WHERE due_date IS NOT NULL
AND DATE(due_date) < DATE('now');

UPDATE task
SET priority = 'Low'
WHERE status_id =3;

--Create a new table called category with columns:
--id (PRIMARY KEY)
--name (e.g., "Work", "Personal", "Study")
--color (e.g., "red", "blue", "green")
CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    color TEXT
);
INSERT INTO category (name,color) VALUES ('Work', 'red'),('Personal', 'blue'),('Study', 'green');
select * from category;

--Create a linking table called task_category to establish a many-to-many relationship between tasks and categories:
--task_id (FOREIGN KEY to task.id)
--category_id (FOREIGN KEY to category.id)
CREATE TABLE task_category(
	task_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (task_id, category_id),
    FOREIGN KEY (task_id) REFERENCES task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE ON UPDATE CASCADE
);
select * from task_category;
INSERT INTO task_category (task_id, category_id)
VALUES 
(1, 1), 
(2, 2), 
(3, 3),  
(5, 1),  
(6, 2),  
(7, 3);
INSERT INTO task_category (task_id, category_id)
VALUES 
(8,1),(9,1),(10,2),(11,3),(12,2),(13,3);  
INSERT INTO task_category (task_id, category_id)
VALUES 
(14,1),(15,1),(16,3),(17,3),(18,3),(19,3),(20,1); 

--Part 4: Advanced Queries
--Find all tasks in a specific category (e.g., "Work")
SELECT t.title as task_name from task t
join task_category tc on t.task_id = tc.task_id
join category c on tc.category_id =c.id 
where c.name="Work";

--List tasks ordered by priority (High to Low) and by due date (earliest first)
select title,priority,due_date from task 
ORDER BY 
CASE priority
WHEN "High" THEN 1
WHEN "Medium" THEN 2
WHEN "Low" THEN 3 
END ASC,
due_date desc; 

--Find which category has the most tasks
SELECT c.name AS category, COUNT(*) AS task_count
FROM task t
JOIN task_category tc ON t.task_id = tc.task_id
JOIN category c ON tc.category_id = c.id
GROUP BY c.name
ORDER BY task_count DESC;

--Get all high priority tasks that are either "In Progress" or "Not started"
select t.title as task_name,t.priority as task_priority,s.name as status_name from task t
join status s on s.id=t.status_id 
where t.priority ="High"  AND (s.name = 'In progress' OR s.name = 'Not started');

--Find users who have tasks in more than one category
select u.user_id, u.name from user u
join user_task ut on u.user_id = ut.user_id
join task_category tc on ut.task_id = tc.task_id
GROUP BY u.user_id, u.name
HAVING COUNT(DISTINCT tc.category_id) > 1;


