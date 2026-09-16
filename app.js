const express = require("express");
console.log("THIS IS MY CS-312 APP.JS");
const app = express();

const PORT = 3003;

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/:id/edit", (req, res) => {
    const postId = Number(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("edit", { post });
});

app.post("/posts/:id/edit", (req, res) => {
    console.log("EDIT ROUTE WAS CALLED");
    const postId = Number(req.params.id);

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    post.author = req.body.author;
    post.title = req.body.title;
    post.content = req.body.content;

    res.redirect("/");
});

app.post("/posts", (req, res) => {
    console.log(req.body);


    const newPost = {
    id: Date.now(),
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    category: req.body.category,
    date: new Date().toLocaleString()
};

    posts.push(newPost);

    res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
   console.log("DELETE ROUTE WAS CALLED");
   
    const postId = Number(req.params.id);

    posts = posts.filter(post => post.id !== postId);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});