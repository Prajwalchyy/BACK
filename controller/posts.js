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

export const GetOnePost = async (req, res) => {
  const PostId = req.params.id;
  // console.log(PostId);
  try {
    const GetOnePostQuery = "SELECT * FROM posts WHERE posts_id=?";
    const [result] = await db.query(GetOnePostQuery, [PostId]);

    // console.log(result);

    if (result.length === 0) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    return res
      .status(200)
      .json({ message: " One Post Get sucessfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error in GetOneUserPost" });
  }
};

//One User Posts_____________________________________________________________________________________

export const GetOneUserPosts = async (req, res) => {
  const UserId = req.userid;
  // console.log(UserId);
  try {
    const OneUSerPOstsQuery = "SELECT * FROM posts WHERE userid=?";
    const [result] = await db.query(OneUSerPOstsQuery, [UserId]);

    if (result.length === 0) {
      return res.status(404).json({ message: "No Post Found" });
    }
    return res
      .status(200)
      .json({ message: "Posts Fetched Sucessfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in GetOneUser" });
  }
};

//UPDATE POSTS___________________________________________________________________________________
export const UpdatePost = async (req, res) => {
  const { title, content } = req.body;
  const PostId = req.params.id;
  const UserId = req.userid;

  try {
    const ChecKUserQuery = "SELECT  userid FROM posts WHERE posts_id=?";
    const [CheckUserResult] = await db.query(ChecKUserQuery, [PostId]);

    if (!CheckUserResult.length) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    const RequestUserId = CheckUserResult[0].userid;
    // console.log(RequestUserId);
    const Owner = RequestUserId === UserId;
    if (!Owner) {
      return res.status(403).json({ message: "you are unauthorize to update" });
    }
    const UpdatePostQuery =
      "Update posts SET posts_title=?, posts_content=? WHERE posts_id=?";
    const [UpdateResult] = await db.query(UpdatePostQuery, [
      title,
      content,
      PostId,
    ]);

    return res
      .status(200)
      .json({ message: "Post Updated Sucessfully", UpdateResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mesage: "Problem in UpdatePost" });
  }
};

//DELETE POST _______________________________________________________________________________________

export const DeletePosts = async (req, res, next) => {
  const PostId = req.params.id;
  const UserRole = req.userrole;
  const Userid = req.userid;
  // console.log("PostID=", PostId, "UserID=", Userid, "UserRole=", UserRole);
  try {
    const CheckPostUserIdQuery = "SELECT  userid FROM posts WHERE posts_id=?";
    const [checkResult] = await db.query(CheckPostUserIdQuery, [PostId]);

    if (checkResult.length === 0) {
      return res.status(404).json({ message: "Post Not Found" });
    }
    const OwnerId = checkResult[0].userid;
    // console.log(CheckUserId);
    const Owner = OwnerId === Userid;
    const Admin = UserRole === "admin";
    if (!Owner && !Admin) {
      return res.status(403).json({ message: "you are unauthorize to Delete" });
    }

    const DeletePostsQuery = "DELETE FROM posts WHERE posts_id=?";
    const [DeleteResult] = await db.query(DeletePostsQuery, [PostId]);
    res.status(200).json({ message: "Post deleted sucessfylly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Problem in DeletePosts", error });
  }
};

//Post Comment________________________________________________________________________________________________
export const PostComment = async (req, res) => {
  const { comment } = req.body;
  const UserId = req.userid;
  const PostId = req.params.postid;

  try {
    const PostIdCheckQuery = "SELECT posts_id FROM posts WHERE posts_id=?";
    const [resultCheckPostId] = await db.query(PostIdCheckQuery, [PostId]);

    if (!resultCheckPostId.length) {
      return res.status(404).json({ message: "Post id not found" });
    }

    const PostCommentQuery =
      "INSERT INTO comments (posts_id,userid,comment) VALUES (?,?,?)";
    const [resultcoment] = await db.query(PostCommentQuery, [
      PostId,
      UserId,
      comment,
    ]);
    return res
      .status(200)
      .json({ message: "Comment posted sucessfully", resultcoment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in PostComment" });
  }
};

export const GetAllComment = async (req, res) => {
  try {
    const GetAllCommentQuery = "SELECT * FROM comments";
    const [result] = await db.query(GetAllCommentQuery);

    if (!result.length) {
      return res.status(404).json({ message: "No comments found" });
    }

    return res
      .status(200)
      .json({ message: "Comment fetched sucessfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in GetAllComment" });
  }
};

export const GetMineComment = async (req, res) => {
  const AuthUser = req.userid;

  try {
    const MyCommentQuery = "SELECT * FROM comments WHERE userid=?";
    const [result] = await db.query(MyCommentQuery, [AuthUser]);

    if (!result.length) {
      return res.status(404).json({ message: "No Comment found" });
    }
    return res
      .status(200)
      .json({ message: "My Comment fetched sucessfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in GetMineComment" });
  }
};
