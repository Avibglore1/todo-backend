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
        const todo = await ToDo.find({user: req.user});
        res.json(todo);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const updateToDo = async(req,res) =>{
    try {
        const todo = await ToDo.findOneAndUpdate(
            {_id:req.params.id, user:req.user.id},req.body,{new: true}
        );
        res.json(todo);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const deleteToDo = async(req,res) =>{
    try {
        await ToDo.findOneAndDelete({
            _id:req.params.id,
            user: req.user.id
        });

        res.json({message: "Todo deleted"});
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};

export const toggleToDo = async(req,res) =>{
    try {
        const todo = await ToDo.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        todo.completed = !todo.completed;
        await todo.save()
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}