// console.log("khalid")

// const {add,f} =require("./operation");



// console.log(add([1,2,3,4,5]));
// console.log(f([1,2,3,4,5]));


// const http=require('http')

// const server =http.createServer((req,res)=>{
//     res.end(" happy bday thara")

// })

// const PORT=8000
// server.listen(PORT,()=>{
//     console.log(`My server is running at http://localhost:${PORT}`)
// })

const express = require("express");//imported express
const app = express();//instance of express
app.use(express.json());//parse json data
const mongoose=require("mongoose");
const {v4:uuidv4} = require('uuid');
const PORT =8000

const mongourl="mongodb://localhost:27017/practice";
mongoose
.connect(mongourl)
.then(()=>{
    console.log("Db connected ")
    app.listen(PORT,()=>{
        console.log("My server is running")
    })
})

.catch((err)=>{
    console.log("Connection failed");
});


const expenseSchema = new mongoose.Schema({
    id:{type:String, required:true,unique:true},
    title:{type:String, required:true},
    amount:{type:Number, required:true},
})

const expenseModel = mongoose.model('expense_tracker',expenseSchema);//collection name ,schema name 

app.post("/api/expenses",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpenses=new expenseModel({
        id:uuidv4(),
        title:title,
        amount:amount,
    })
    const savedExpense = await newExpenses.save();
    res.status(200).json(savedExpense);
})

app.get("/api/expenses", async (req, res) => {
    const expense = await expenseModel.find();
   res.status(200).json(expense);
});

app.get("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params;
    const expense = await expenseModel.findOne();
    res.status(200).json(expense);
})

app.put("/api/expenses/:id",async(req,res)=>{
    const {id} = req.params;
    const {title,amount} = req.body;
    const updatedExpense = await expenseModel.findOneAndUpdate(
        {
            id:id
        },
        {
            title:title,
            amount:amount
        },
    );

    app.delete("/api/expenses/:id",async(req,res)=>{
        const {id} = req.params;
        const deletedExpense = await expenseModel.findOneAndDelete({id:id});
        res.status(200).json(deletedExpense);
    });    
        
    res.status(200).json(updatedExpense);
})





// const students = [
//     { id: 1, name: "Jai" },
//     { id:2, name : "Vishal"}
//   ];
// app.get("/", (req, res) => {
  
//   res.json(students);
// });


// app.get("/singledata/:id",(req,res)=>{
//     const {id} = req.params;

//     if(id){
//         const result = students.find((item)=>item.id===Number(id) )
//         res.json(result);
//     }
//     else{
//         res.json(students);
//     }
// });

// app.get("/name/:name",(req,res)=>{
//     const {name} = req.params;

//     if(name){
//         const result = students.find((item)=>item.name===name)
//         res.json(result);
//     }
//     else{
//         res.json(students);
//     }
// });


// mongodb://localhost:27017/
// app.listen(PORT, () => {
//   console.log('Server is running on http://localhost:${PORT}');
// });