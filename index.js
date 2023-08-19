import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const date = new Date();
let dateNumber = date.getDate();
let dayName = days[date.getDay()];
let monthName = months[date.getMonth()];


const tasksForToday = [];
const workTasks = [];

app.get("/", (req,res) => {
    res.render("index.ejs", {
        tasksForToday: tasksForToday,
        dayName: dayName,
        dateNumber: dateNumber,
        monthName: monthName
    });
});

app.post("/", (req,res) => {
    tasksForToday.push(req.body['newItem']);
    res.render("index.ejs", {
        tasksForToday: tasksForToday,
        dayName: dayName,
        dateNumber: dateNumber,
        monthName: monthName
    })
});

app.get("/work", (req,res, next) => {
    res.render("partials/work.ejs",{
        workTasks: workTasks,   
    })
    next();
});

app.post("/work", (req,res) => {
    workTasks.push(req.body['newWorkItem']);
    res.render("partials/work.ejs", {
        workTasks: workTasks, 
        dayName: dayName,  
    })
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

