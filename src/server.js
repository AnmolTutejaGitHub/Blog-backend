const express = require("express");
require("../database/mongoose");
const Blog = require("../database/Models/Blogs");
const app = express();
const PORT = 6969 || process.env.PORT;
const cors = require("cors");


app.use(cors({
    origin: `http://localhost:3000`,
    credentials: true
}));

app.use(express.json());

app.post("/blogs", async (req, res) => {
    try {
        const { title, details } = req.body;
        if (!title || !details) {
            return res.status(400).send({ error: "Title and details are required." });
        }

        const blog = new Blog({ title, details });
        await blog.save();

        res.status(200).send(blog);
    } catch (e) {
        res.status(500).send({ error: "Failed to create blog.", message: e.message });
    }
});


app.get("/allBlogs", async (req, res) => {
    try {
        const allBlogs = await Blog.find();
        res.status(200).send(allBlogs);
    } catch (error) {
        res.status(500).send({ message: "Error fetching blogs", error: error.message });
    }
});

app.post("/comments", async (req, res) => {
    const { id, comment } = req.body;
    try {
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.comments.push(comment);
        await blog.save();
        res.status(200).send({ message: "Comment added successfully", blog });
    } catch (error) {
        res.status(500).send({ message: "Error adding comment", error: error.message });
    }
});

app.post("/blog_id", async (req, res) => {
    const { title } = req.body;

    try {
        const blog = await Blog.findOne({ title });

        if (!blog) {
            return res.status(404).send({ message: "Blog not found" });
        }
        res.status(200).send({ blogId: blog._id });
    } catch (error) {
        res.status(500).send({ message: "Error finding blog", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})