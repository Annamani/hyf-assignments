// Exercise 5: Build runSequentially ⭐⭐
function runSequentially(tasks, finalCallback) {
  // function runTask(index) {
  //   if (index === tasks.length) return finalCallback();
  //   tasks[index](() => runTask(index + 1));
  // }
  // runTask(0);
  //   const done0 = () => tasks[2](finalCallback);
  //   const done1 = () => tasks[1](done0);
  //   const done2 = () => tasks[0](done1);
  // done2();
  const final = tasks.reduceRight((carry, f) => {
    return () => f(carry);
  }, finalCallback);
  final();
}
const tasks = [
  (done) =>
    setTimeout(() => {
      console.log("Task 1");
      done();
    }, 300),
  (done) =>
    setTimeout(() => {
      console.log("Task 2");
      done();
    }, 200),
  (done) =>
    setTimeout(() => {
      console.log("Task 3");
      done();
    }, 100),
];

runSequentially(tasks, () => {
  console.log("All tasks complete!");
});
