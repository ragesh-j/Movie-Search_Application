const express=require("express")
const app=express()
app.use(express.json())
const mongoose=require("mongoose")
const SearchRoute=require("./Routes/Search")
const cors=require("cors")
const port = 8000;
app.use(cors())
app.use("/",SearchRoute)
mongoose.connect('mongodb://localhost/movieapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('connected',()=>{
  console.log("Succesfully connected to db...")
})
db.on('error',()=>{
  console.log("Failed connecting to db...")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });