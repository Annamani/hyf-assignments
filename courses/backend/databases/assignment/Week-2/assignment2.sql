-- Part 1, Q1
-- Count the total number of tasks in the database.
select count(*) as total_tasks from task;   

-- Part 1, Q2
-- Count tasks per user. Include users with zero tasks.
select u.name as name, count(t.id) as task_count from user u 
left join task t on u.id=t.user_id
GROUP BY u.id, u.name
ORDER BY task_count DESC;

-- Part 1, Q3
-- Count tasks per status (To Do, In Progress, Done, Blocked).
select s.name as name,count(t.id) as count from status s
join task t on t.status_id=s.id
group by s.id,s.name
order by count desc;

-- Part 1, Q4
-- Find the user who has the most tasks assigned.
select u.name as name, count(t.id) as task_count from user u
join task t on t.user_id=u.id
group by u.name
order by task_count desc LIMIT 1;

-- Part 1, Q5
-- Average tasks per user — only for users with at least one task.
select avg(task_count) asavg_tasks_per_user
FROM (
  select count(t.id) as task_count
  from user u
  join task t on u.id = t.user_id
 group by u.id);

-- Part 1, Q6
-- Find the earliest and latest due_date across all tasks.
select min(due_date) as earliest , max(due_date) as latest from task;

-- Part 1, Q7
-- List categories with task counts, ordered most to least.
select c.name as name,count(tc.task_id) AS task_count
from category c
join task_category tc on c.id = tc.category_id
join task t on tc.task_id = t.id
group by c.id, c.name
order by task_count DESC;

-- Part 1, Q8
-- Find users who have more than 2 tasks assigned.
select u.name as name, count(t.id) as task_count from user u 
left join task t on u.id=t.user_id
GROUP BY u.id, u.name
having task_count >2;

-- Part B 
--1. Spot the Vulnerability
function getTasksByUser(userName) {
  const query = `SELECT * FROM task WHERE user_id = (SELECT id FROM user WHERE name = '${userName}')`;
  db.all(query, (err, rows) => console.log(rows));
}

if we change username to ' OR '1'='1 then query becomes
SELECT * FROM task
WHERE user_id = (
 SELECT id FROM user WHERE name = '' OR '1'='1');

It will fetch all the rows from task table because name = '' OR '1'='1' is always true.
That means subquery always returns multiple records.
Problems:
1.Hacker can access all the user records.
2.This is a classic SQL injection attack.

-- Part B 
--Write the malicious string that an attacker could use to delete all tasks from the database.
--'; DELETE FROM task; --
DELETE from task.. ;
DELETE FROM task removes ALL rows from the task table
so all tasks are permanently deleted.

--Part B
--2. Fix the Vulnerability
-- FIXED VERSION USING PARAMETERIZED queries 
--Most databases support parameterized queries, but the syntax varies:
--MySQL use ? for parameters
--SQL Server uses @ for parameters
--PostgreSQL uses $ for parameters
--It treats user input as data.
function getTasksByUser(userName) {
  const query = `
    SELECT * FROM task
    WHERE user_id = (
      SELECT id FROM user WHERE name = ?
    )
  `;
  db.all(query, [userName], (err, rows) => {
    console.log(rows);
  });
}







-- Part 3, Q1
-- Reassign all tasks from user 1 to user 2, then delete user 1.
-- Use BEGIN TRANSACTION and COMMIT.
BEGIN TRANSACTION;
  update task set user_id=2 where user_id=1;
  delete from user where id=1;
COMMIT;


-- Part 3, Q2
-- Demonstrate a deliberate rollback.
-- Make some changes, then trigger a failure so everything rolls back.
BEGIN TRANSACTION;
  update task set user_id = 2 where user_id = 1;
  update task set status_id = 2 where status_id = 1;
INSERT INTO task (title, user_id, status_id, created)VALUES ('This will fail', 2, 4, datetime('now'));
rollback;

--Part 4, Q1
--Transaction: create "Urgent" + assign tasks
BEGIN TRANSACTION;
INSERT OR ROLLBACK INTO category (name) VALUES ('Urgent');
INSERT INTO task_category (task_id, category_id) 
SELECT id, (SELECT id FROM category WHERE name = 'Urgent')
FROM task
WHERE user_id = 1;
COMMIT;

-- Part 4, Q2
-- Dashboard: single SELECT returning all four numbers:
--   total tasks, completed (Done), overdue, users with tasks
SELECT COUNT(t.id) AS total_tasks,
  SUM(CASE WHEN s.name = 'Done' THEN 1 ELSE 0 END) AS completed_tasks,
  SUM(CASE 
        WHEN s.name != 'Done' 
         AND t.due_date < DATE('now') 
        THEN 1 
        ELSE 0 
      END) AS overdue_tasks,
  COUNT(DISTINCT t.user_id) AS users_with_tasks
FROM task t
JOIN status s ON s.id = t.status_id;
