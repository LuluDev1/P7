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
  const comments = await sql`SELECT userid,comment,fileloc FROM comments `;
  if (comments.length > 0) {
    res.status(200).json(comments);
  } else {
    res.status(200).send("Error getting all comments");
  }
};

const getUser = async (req, res) => {
  try {
    const { userid } = req.params;

    const email = await sql`
      SELECT email
      FROM users
      WHERE userid = ${userid}
    `;

    if (email.length > 0) {
      res.status(200).json({ email: email[0].email }); // Return as JSON object
    } else {
      res.status(404).json({ error: "User not found." }); // Return error as JSON
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    res
      .status(500)
      .json({ error: "An error occurred while fetching the email." });
  }
};

const deleteComment = async (req, res) => {};

const deleteUser = async (req, res) => {};

export { addComment, getAllComments, getUser };
