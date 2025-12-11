Find all the tasks that are marked as done.
--using join
select task.title,task.description,status.name from task join status on task.status_id=status.id where status.name='Done';

Find all the tasks that are not marked as done.
--using join
select task.title,task.description,status.name from task join status on task.status_id=status.id where status.name!='Done';

Get the title and status (as text) of all tasks.
--using join
select task.title,status.name from task join status on status.id=task.status_id;

Get the name of each status, along with a count of how many tasks have that status.
--using join
select status.name as status_name,count(\*) as total_tasks from task join status on status.id=task.status_id group by status.name;

Get the names of all statuses, sorted by the status with most tasks first.
--using join
select status.name as status_name,count(\*) as tasks_count from task join status on status.id=task.status_id group by status.name order by tasks_count desc;
