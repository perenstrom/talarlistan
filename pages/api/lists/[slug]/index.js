import db from "../../../../lib/db";

export default async (req, res) => {
  const {
    query: { slug },
  } = req;

  try {
    const list = await db.one("SELECT * FROM lists WHERE slug = $1", [slug]);
    const speakers = await db.any(
      `
      SELECT speakers.id, speakers.created_at, speakers.name, speakers.status 
      FROM speakers 
      WHERE list = $1
      ORDER BY speakers.created_at ASC
      `,
      [list.id]
    );

    res.statusCode = 200;
    res.json({ ...list, speakers });
  } catch (e) {
    console.error(e);
  }
};
