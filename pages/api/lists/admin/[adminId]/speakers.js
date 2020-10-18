import db from "../../../../../lib/db";

export default async (req, res) => {
  const {
    query: { adminId },
  } = req;

  try {
    const speakers = await db.any(
      `SELECT speakers.id, speakers.created_at, speakers.name, speakers.status 
      FROM speakers 
      LEFT JOIN lists 
      ON speakers.list = lists.id 
      WHERE lists.admin_hash = $1 AND speakers.status = 'WANTS_TO_SPEAK'
      ORDER BY speakers.created_at ASC`,
      [adminId]
    );
    res.statusCode = 200;
    res.json(speakers);
  } catch (e) {
    console.error(e);
  }
};
