import db from "../../../lib/db";

export default async (req, res) => {
  if (req.method === "PUT") {
    const {
      query: { id },
      body: speaker,
    } = req;

    if (id) {
      db.one(
        `
        UPDATE speakers 
        SET (name, status) = ($1, $2)
        WHERE id = $3
        RETURNING *
        `,
        [speaker.name, speaker.status, id]
      )
        .then((data) => {
          res.statusCode = 200;
          res.json(data);
        })
        .catch((error) => {
          console.error("ERROR:", error);
          res.status(500).end();
        });
    } else {
      res.status(404).end("Speaker not found");
    }
  } else {
    res.status(404).end();
  }
};
