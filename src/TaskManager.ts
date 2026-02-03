import readline from 'readline';

type TaskName = string;
type TaskId = number;

enum TaskStatus {
    Pending = "pending",
    Completed = "completed"
}

interface Task {
    id : TaskId
    name : TaskName,
    status : TaskStatus
}

let TaskList : Task[] = []
let task_count = 1;
function addTask(name:TaskName) {
    const newTask : Task = {
        id : task_count++,
        name : name,
        status : TaskStatus.Pending
    }
    TaskList.push(newTask);
}

function listAllTasks(){
    for (let i = 0;i<TaskList.length;i++){
        console.log(`\nTask ID : ${TaskList[i].id} \nTask Name : ${TaskList[i].name} \nTask Status : ${TaskList[i].status}`)
        
    }
}
function markAsCompleted(id:TaskId){
    const task = TaskList.find(i=>i.id==id);
    if (!task){
        console.log("Task Not found!");
        return;
    }
    task.status = TaskStatus.Completed;
}

function filterTasks(status:TaskStatus){
    for (let i =0;i<TaskList.length;i++){
        if (TaskList[i].status == status){
            console.log(`\nTask ID : ${TaskList[i].id} \nTask Name : ${TaskList[i].name} \nTask Status : ${TaskList[i].status}`)
        }
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function printMenu() {
    console.log("\nTask Tracker Menu:");
    console.log("1. Add Task");
    console.log("2. List All Tasks");
    console.log("3. Mark Task as Completed");
    console.log("4. Show Pending Tasks");
    console.log("5. Show Completed Tasks");
    console.log("6. Exit\n");
}

function promptMenu() {
    printMenu();
    rl.question("Choose an option (1-6): ", (answer) => {
        handleMenuInput(answer.trim());
    });
}

function handleMenuInput(input: string) {
    switch (input) {
        case '1':
            rl.question("Enter task name: ", (name) => {
                addTask(name.trim());
                promptMenu();
            });
            break;
        case '2':
            listAllTasks();
            promptMenu();
            break;
        case '3':
            rl.question("Enter task ID to mark as completed: ", (idStr) => {
                const id = Number(idStr.trim());
                if (isNaN(id)) {
                    console.log("Invalid task ID.");
                } else {
                    markAsCompleted(id);
                }
                promptMenu();
            });
            break;
        case '4':
            filterTasks(TaskStatus.Pending);
            promptMenu();
            break;
        case '5':
            filterTasks(TaskStatus.Completed);
            promptMenu();
            break;
        case '6':
            rl.close();
            return;
        default:
            console.log("Invalid option. Please choose (1-6).");
            promptMenu();
            break;
    }
}

console.log("Welcome to the Task Tracker!.");
promptMenu();

rl.on('close', () => {
    console.log('Exiting Task Manager.');
    process.exit(0);
});