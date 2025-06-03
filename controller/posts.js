import { response } from "express";
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

//Insert Posts Like_______________________________________________________________________________________
//TODO: remaining send notification form like post
export const PostLike = async (req, res) => {
  const AuthUserId = req.userid;
  const PostId = req.params.postid;

  try {
    const CheckLikesQuery = "SELECT * FROM likes WHERE post_id=? AND user_id=?";
    const [CheckResult] = await db.query(CheckLikesQuery, [PostId, AuthUserId]);
    // console.log(CheckResult);

    if (!CheckResult.length) {
      const LikeInsertQuery =
        "INSERT INTO likes (post_id,user_id) VALUES (?,?)";
      const [LiekdResult] = await db.query(LikeInsertQuery, [
        PostId,
        AuthUserId,
      ]);

      return res
        .status(200)
        .json({ message: "You liked the post", LiekdResult });
    } else {
      const UnLikeQuery = "DELETE FROM likes WHERE post_id=? AND user_id=?";
      const [ResultUnlike] = await db.query(UnLikeQuery, [PostId, AuthUserId]);

      return res.status(200).json({ message: "You unlike post" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in PostLike" });
  }
};

//Count post LIke
export const CountLikePost = async (req, res) => {
  const PostId = req.params.postid;

  try {
    const CountQuery =
      "SELECT COUNT(*) AS TotalLikes FROM likes WHERE post_id = ?";
    const [resultcount] = await db.query(CountQuery, [PostId]);
    console.log(resultcount);
    return res
      .status(200)
      .json({ message: "liked conuntd sucessfully", resultcount });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "problem in CountLikePost" });
  }
};

//Post Comment________________________________________________________________________________________________
export const PostComment = async (req, res) => {
  const { comment } = req.body;
  const UserId = req.userid;
  const PostId = req.params.postid;

  try {
    const PostIdCheckQuery =
      "SELECT posts_id, userid FROM posts WHERE posts_id=?";
    const [resultCheckPostId] = await db.query(PostIdCheckQuery, [PostId]);

    if (!resultCheckPostId.length) {
      return res.status(404).json({ message: "Post id not found" });
    }

    const PostCommentQuery =
      "INSERT INTO comments (posts_id,userid,comment) VALUES (?,?,?)";
    const [resultcomment] = await db.query(PostCommentQuery, [
      PostId,
      UserId,
      comment,
    ]);

    const RecentCommentId = resultcomment.insertId; //get recently inserted id from insertId
    const OwnerOfPostUser = resultCheckPostId[0].userid;
    const Type = "comment";

    //Insert Notification data for comment

    const InsertNotificationQuery =
      "INSERT INTO notifications (notification_type,notification_receiver_user_id,posts_id,comment_id) VALUES (?,?,?,?)";
    const [InsertNotificationResult] = await db.query(InsertNotificationQuery, [
      Type,
      OwnerOfPostUser,
      PostId,
      RecentCommentId,
    ]);
    return res.status(200).json({
      message: "Comment posted sucessfully",
      PostCommentResult: resultcomment,
      NotificationResult: InsertNotificationResult,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in PostComment" });
  }
};

//UPDATE COMMENT__________________________________________________________________________________

export const UpdateComment = async (req, res) => {
  const { comment } = req.body;
  const CommentId = req.params.CommentId;
  const UserId = req.userid;

  try {
    const CheckUserQuery = "SELECT userid FROM comments WHERE comment_id=?";
    const [CheckResult] = await db.query(CheckUserQuery, [CommentId]);

    if (!CheckResult.length) {
      return res.status(404).json({ message: "No User Found" });
    }

    const CheckUser = CheckResult[0].userid;
    const OwnerUser = CheckUser === UserId;

    if (!OwnerUser) {
      return res
        .status(403)
        .json({ message: "Unauthorize User cannot edit the comment" });
    }

    const EditCommentQuery = "UPDATE comments SET comment=? WHERE comment_id=?";
    const [EditResult] = await db.query(EditCommentQuery, [comment, CommentId]);

    return res
      .status(200)
      .json({ message: "Comment update sucessfully", EditResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in UpdateComment" });
  }
};

//ALL COMMENT _____________________________________________________________________________________
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

// MYCOMMENT_______________________________________________________________________________________
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

//DELETE COMMENT_____________________________________________________________________________

export const DeleteComment = async (req, res) => {
  const CommentId = req.params.commmentid;
  const OwnerId = req.userid;
  const OwnerRole = req.userrole;
  // console.log("cid=", CommentId, "OId=", OwnerId, "Role=", OwnerRole);
  try {
    const CheckUserQuery = "SELECT userid FROM comments WHERE comment_id=?";
    const [CheckResult] = await db.query(CheckUserQuery, [CommentId]);

    if (!CheckResult.length) {
      return res.status(404).json({ message: "No User Found" });
    }

    const CheckOwnerId = CheckResult[0].userid;
    const ValidOwner = CheckOwnerId === OwnerId;
    const admin = OwnerRole === "admin";

    if (!ValidOwner && !admin) {
      return res.status(403).json({ message: "Unauthorize to delete Comment" });
    }

    const DeleteQuery = "DELETE FROM comments WHERE comment_id=?";
    const [DeleteResult] = await db.query(DeleteQuery, [CommentId]);

    return res.status(200).json({ message: "Comment Deleted Sucessfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Problem in DeleteComment" });
  }
};

//
//TODO:notification
