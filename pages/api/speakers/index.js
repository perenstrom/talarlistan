import db from "../../../lib/db";
import { SPEAKER_STATUS } from "../../../consts/speakerStatus";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, listId } = req.body;
    if (name) {
      console.log(JSON.stringify(name, null, 2));
      db.one(
        "INSERT INTO speakers(list, name, created_at, status) VALUES($1, $2, current_timestamp, $3) RETURNING *",
        [listId, name, SPEAKER_STATUS.wantsToSpeak]
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
      res.status(400).end("Name cannot be blank");
    }
  } else {
    res.status(404).end();
  }
};
