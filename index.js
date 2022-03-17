const express =  require("express");
const mongoose=require("mongoose");

const port=process.env.PORT || 5052

const connect=()=>{
    mongoose.connect("mongodb+srv://dhruv:dhruv_1112@cluster0.1qaar.mongodb.net/portfolioInbox?retryWrites=true&w=majority")
}

const app=express()

app.use(express.json());

const messageSchema=new mongoose.Schema({
      name:{type:String,required:true},
      email:{type:String,required:true},
      message:{type:String,required:true},
},{
    versionKey:false,
    timestamps:true
})

const Message=mongoose.model("Message",messageSchema);
app.get("/",async(req,res)=>{
    try {
         const messagein=await Message.find().lean().exec();

         return res.send(messagein)
    } catch (error) {
        return res.send(e.message)
    }
})

app.post("/",async(req,res)=>{
    try {
        const messagein=await Message.create(req.body)

        return res.send(messagein);
    } catch (error) {
        return res.send(error.message)
    }
})


app.listen(port,async()=>{
    try {
        connect()
        console.log(`http://localhost:${port}`)
    } catch (error) {
        console.log(error.message)
    }
})