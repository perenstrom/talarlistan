import db from "../../../../../lib/db";

export default async (req, res) => {
  const {
    query: { adminId },
  } = req;

  try {
    const list = await db.one("SELECT * FROM lists WHERE admin_hash = $1", [
      adminId,
    ]);
    const speakers = await db.any(
      `
      SELECT speakers.id, speakers.created_at, speakers.name, speakers.status 
      FROM speakers 
      WHERE list = $1 AND speakers.status = 'WANTS_TO_SPEAK'
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
