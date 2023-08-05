const express=require("express")
const router=require("express").Router()
const app=express()
const axios=require("axios")
app.use(express.json())
router.get("/search",async (req,res)=>{
    const {query,page}=req.query
    console.log(req.query)
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=42d2c4151595f27a30f24d8df0417740&language=en-US&query=${query}&page=${page}&include_adult=false`)
        const data = await response.data
        res.json(data)
      } catch (error) {
        console.error('Error occured:', error)
        res.status(500).json({ error: 'Error!' })
      }

})

module.exports=router
