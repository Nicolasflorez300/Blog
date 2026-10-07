import express from "express"
import bodyParser from "body-parser";

const port = 3000;
const app = express();
var blog = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(express.json())


app.get("/",(req, res)=>{
    res.render("main.ejs", {blog, error: ""})
})


app.post("/submit", (req, res)=>{
    if(req.body.Title && req.body.Desc){
        var title = req.body.Title;
        var desc = req.body.Desc;
        blog.push({title, desc})
        res.send(`<script>
            alert("Uploaded succesfully");
            window.history.back();
            </script>`)
    }else {
        res.render("main.ejs", {blog ,error: "The fields are empty, please try again"})
    } 
})

app.get("/posts",(req, res)=>{
    res.render("posts.ejs", {blog})
})

app.put("/put",(req, res)=>{
    const {index, title, desc} = req.body
    blog[index] = {title, desc}

    res.sendStatus(200);
})

app.delete("/delete",(req, res)=>{
    const index = req.body.index;

    blog.splice(index, 1);

    res.sendStatus(200);
})


app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
