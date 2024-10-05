import sql from "../db.js";

const addComment = async (req, res) => {
  try {
    let imageurl = "";
    if (req.file) {
      imageurl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    const { userId } = req.user;
    const { textarea } = req.body;

    await sql`
      INSERT INTO comments(userid, comment, fileloc)
      VALUES(${userId}, ${textarea}, ${imageurl})
      `;
    res.status(200).send("Comment added successfully");
  } catch (error) {
    res.status(500).send("error");
  }
};

const getAllComments = async (req, res) => {
  const comments = await sql`SELECT comment,fileloc FROM comments `;
  if (comments.length > 0) {
    res.status(200).json(comments);
  } else {
    res.status(200).send("Error getting all comments");
  }
};

const getUserComments = async (req, res) => {};
export { addComment, getAllComments, getUserComments }; 
