--How many tasks are in the task table?
select count(*)as total from task;

--How many tasks in the task table do not have a valid due date?
select count(*)as no_due_date from task where due_date is NULL;

--Find all the tasks that are marked as done.
select task.title,task.description,(select name from status where status.id=task.status_id) as status_name from task where status_name='Done';

--Find all the tasks that are not marked as done.
select task.title,task.description,(select name from status where status.id=task.status_id) as status_name from task where status_name!='Done';

--Get all the tasks, sorted with the most recently created first.
select * from task order by created desc;

--Get the single most recently created task.
select * from task order by created desc LIMIT 1;

--Get the title and due date of all tasks where the title or description contains database.
select title,due_date,description from task where task.description like '%database%' or task.title like '%database%';

--Get the title and status (as text) of all tasks.
select title,(select name from status where status.id=task.status_id) as status_name from task; 

--Get the name of each status, along with a count of how many tasks have that status.
select (select name from status where status.id=task.status_id) as status_name,count(*) as total_tasks from task group by status_name;  

--Get the names of all statuses, sorted by the status with most tasks first.
select (select name from status where status.id=task.status_id) as status_name,count(*) as total_tasks from task group by status_name order by total_tasks desc;