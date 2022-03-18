var express = require('express');
var app = express();
var PORT = 5000;
const cors =require("cors");
const pool =require("./db");
const { test } = require('media-typer');

//midleware
app.use(cors());
app.use(express.json());

//routes



//create a vo/
app.post("/vo", async(req,res)=>{
    try{
        const {title, description, date, starttime, endtime}=req.body;

        const newVo=await pool.query(
            "Insert INTO vo (title,description, date, starttime, endtime) VALUES($1,$2, $3, $4, $5) RETURNING *",  
            [title, description, date, starttime, endtime]);
       
            res.json(newVo).rows[0];

    } catch (err){
        console.error(err.message); 
    }
});

//get all vo
app.get("/vo", async (req, res)=>{
    try{
        const allVos=await pool.query("SELECT * FROM vo");
        res.json(allVos.rows);
    }catch{
        console.error(err.message)
    }
});

//get todo
app.get("/vo/:id",  async(req,res)=>{
    try{
        const{id}=req.params;
        const vo=await pool.query("SELECT * FROM vo WHERE vo_id = $1", 
        [id])
        res.json(vo.rows[0])
    }catch (err){
        console.error(err.message);
    }
});

//update a todo
app.put("/vo/:id", async(req,res)=>{
    try{
        const {id} =req.params;
        const{title, description, date, starttime, endtime}=req.body
        const updateVo=await pool.query("UPDATE vo SET title =$1, description = $2, date=$3, starttime=$4, endtime=$5 WHERE vo_id=$6", 
        [title, description, date, starttime, endtime, id])

        res.json("Vo was updated")
    }catch (err){
        console.error(err.message)
    }
})


//delete a todo
app.delete("/vo/:id", async (req, res)=>{
    try{
        const {id}= req.params
        const deleteVo=await pool.query("DELETE FROM vo WHERE vo_id = $1",
        [id]);
        res.json("Vo was deleted");
    }catch{
        console.error(err.message)
    }
});


 
app.listen(PORT, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", PORT);
})

//test table
app.post("/test", async(req,res)=>{
    try{
        const {time}=req.body;

        const newTest=await pool.query(
            "Insert INTO test (time) VALUES(ARRAY[$1]) RETURNING *",  
            [time]);
       
            res.json(newTest).rows[0];

    } catch (err){
        console.error(err.message); 
    }
});