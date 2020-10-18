import db from "../../../lib/db";

export default async (req, res) => {
  const {
    query: { listId },
  } = req;

  try {
    const speakers = await db.any("SELECT * FROM speakers WHERE list = $1", [
      listId,
    ]);
    res.statusCode = 200;
    res.json({ speakers: speakers });
  } catch (e) {
    console.error(e);
  }
};
