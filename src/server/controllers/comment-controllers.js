import sql from "../db.js";

const addComment = async (req, res) => {
  if (req.body) {
    const imageurl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
    const { userId } = req.user;
    const { textarea } = req.body;

    await sql`
    INSERT INTO comments(userid, comment, fileloc)
    VALUES(${userId}, ${textarea}, ${imageurl})
    `;
    res.status(200).send("Comment added successfully");
  } else {
    res.status(400).send("eRROR ADDING COMMENT");
  }
};

export { addComment };
