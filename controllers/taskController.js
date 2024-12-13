let idCounter =2
let tasks = [
    {
        id: 1,
        name: "abdirasak",
        description: "you must be coming in the morning",
        dueDate: "2024-12-13",
        status: "completed"
    },
    {
        id: 2,
        name: "mohamud",
        description: "you must be coming in the evening",
        dueDate: "2024-12-13",
        status: "pending"
    }
]


//get all tasks
const getAlltasks = (req, res) =>{
    res.status(200).json({
        isSucces: true,
        message: "All tasks are being displayed",
        tasks: tasks
    })
}

//get single task
const getSingleTask = (req, res) => {
    const taskId = req.params.id

    const targetTask = tasks.find(t => t.id === parseInt(taskId))

    if(!targetTask){
        return res.status(404).json({
            isSucces: false,
            message: `The task with the id:${taskId} is not found!`
        })
    }


    return res.status(200).json({
        isSucces: true,
        message: `The task with the id:${taskId} is found`,
        task: targetTask
    })
}

//delete a task

const deleteTask = (req, res) => {
    const taskId = req.params.id

    const isTaskExist = tasks.some(t => t.id === parseInt(taskId))
    
    if(!isTaskExist) {
        return res.status(404).json({
            isSucces:false,
            message:`The task with id:${taskId} is not found!`
        })
    }

    tasks = tasks.filter(t => t.id !== parseInt(taskId))

    return res.status(200).json({
        isSucces: true,
        message: `The task with id:${taskId} is being deleted successfully`
    })
}

//create a task
const createTask = (req, res) => {
    const {name, description, dueDate, status} = req.body

    if(!name || !description || !dueDate || !status) {
        return res.status(400).json({
            isSucces: false,
            message: "Fill all the inputs"
        })
    }

    //check valid status

    const validStatus = ["comlpleted", "pending", "in progress"]
    if(!validStatus.includes(status)) {
        return res.status(400).json({
            isSucces:false,
            message: "The status must be valid"
        })
    }

    idCounter += 1
    const newTask = {
        id: idCounter,
        name,
        description,
        dueDate,
        status
    }

    tasks.push(newTask)

    return res.status(200).json({
        isSucces: true,
        message: "new task was added"
    })
}

     // update a task
const updateTask = (req, res) => {
    const targetId = parseInt(req.params.id)
    const updates = req.body

    const targetTask = tasks.find(t => t.id === taskId)

    if(!targetTask) {
        res.status(404).json({
            isSucces:false,
            message:`The task with id:${taskId} is not found!`
        })
    }

        //check valid status
    const validStatus = ["comlpleted", "pending", "in progress"]
    if(!validStatus.includes(updates.status)) {
        return res.status(400).json({
            isSucces:false,
            message: "The status must be valid"
        })
    }
        tasks = tasks.map(task => task.id === taskId ? {...task, ...updates } : task)
        return res.status(200).json({
            isSucces: true,
            message: `The user with id:${taskId} is updated succesfully`,
            task : tasks

        })
}


module.exports = {
    getAlltasks,
    getSingleTask,
    deleteTask,
    createTask,
    updateTask
}