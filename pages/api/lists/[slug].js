import db from "../../../lib/db";

export default async (req, res) => {
  const {
    query: { slug },
  } = req;

  try {
    const list = await db.one("SELECT * FROM lists WHERE slug = $1", [slug]);
    res.statusCode = 200;
    res.json({ list: list });
  } catch (e) {
    console.error(e);
  }
};
