import db from "../database/dbconfig.js";

export const CreatePosts = async (req, res) => {
  const { title, content} = req.body;
  const userid = req.userid;//fetched from authuser
  // console.log(userid);
  try {
    const CreatePostsQuery =
      "INSERT INTO posts (posts_title,posts_content,userid) VALUES (?,?,?) ";

    const [result] = await db.query(CreatePostsQuery, [title, content, userid]);

    res.status(200).json({ message: "Post Created Sucessfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error in create posts" }, error);
  }
};
