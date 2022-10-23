class localStorageUtil {
    constructor() {
        this.keyName = 'tasks';
    }

    getTasks() {
        const tasksLocalStorage = localStorage.getItem(this.keyName);
        if (tasksLocalStorage !== null) {
            return JSON.parse(tasksLocalStorage);
        }
        return [];
    }

    putTasks(id) {
        let tasks = this.getTasks();

        let pushTask = false;

        const index = tasks.indexOf(id);
        if (index === -1) {
            tasks.push(id);
            pushTask = true;
        }
        else {
            tasks.splice(index, 1);
        }

        tasks.push(id);
        localStorage.setItem(this.keyName, JSON.stringify(tasks));

        return {
            pushTask, tasks
        }
    }
}

const localStorage = new localStorageUtil();
//localStorageUtil.getTasks();