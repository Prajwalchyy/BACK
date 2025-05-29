import db from "../database/dbconfig.js";

export const CreatePosts = async (req, res) => {
  const { title, content } = req.body;
  const userid = req.userid; //fetched from authuser
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

//GET ALL POST ________________________________________________________________________________________

export const GetAllPosts = async (req, res) => {
  try {
    const GetPostsQuery = "SELECT * FROM posts";
    const [result] = await db.query(GetPostsQuery);
    res.status(200).json({ message: "All Posts Fetched Sucessfully", result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Probelm in GetAllPost" }, error);
  }
};

// GET SPECIFIC POST ___________________________________________________________________________________

// export const GetOneUserPost = async (req, res) => {
//   const PostId = req.params.id;
//   try {
//     const GetOnePostQuery = "SELECT * FROM posts WHERE userid=?";
//     const [result] = await db.query(GetOnePostQuery, [PostId]);

//     res.status(200).
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Error in GetOneUserPost" });
//   }
// };

//DELETE POST _______________________________________________________________________________________

export const DeletePosts = async (req, res, next) => {
  const PostId = req.params.id;
  const UserRole = req.userrole;
  const Userid = req.userid;

  // console.log("PostID=", PostId, "UserID=", Userid, "UserRole=", UserRole);
  try {
    const CheckPostUserIdQuery = "SELECT  userid FROM posts WHERE posts_id=?";
    const [checkResult] = await db.query(CheckPostUserIdQuery, [PostId]);
    const NotFound = () => {
      return res.status(404).json({ Message: "Post Not Found" });
    };

    if (checkResult.length === 0) {
      return NotFound();
    }
    const OwnerId = checkResult[0].userid;
    // console.log(CheckUserId);
    const Owner = OwnerId === Userid;
    const Admin = UserRole === "admin";
    if (Owner || Admin) {
      try {
        const DeletePostsQuery = "DELETE FROM posts WHERE posts_id=?";
        const [DeleteResult] = await db.query(DeletePostsQuery, [PostId]);
        res.status(200).json({ message: "Post deleted sucessfylly" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Problem in DeletePosts", error });
      }
    } else {
      return NotFound();
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Problem in SelectCheck DeletePosts", error });
  }
};
