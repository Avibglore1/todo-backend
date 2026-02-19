import ToDo from "./../models/ToDo.js"

export const createToDo = async(req,res) =>{
    const {title}  = req.body;
    try {
        const todo = await ToDo.create(
            {title,user:req.user}
        )
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

export const getToDos = async(req,res) =>{
    try {
        const todos = await ToDo.find({user: req.user});
        res.json(todos);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}