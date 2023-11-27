import connection from "../connection/db.js";

const deleteData = (req,res) =>{
  const id = parseInt(req.params.id);
  const query = 'DELETE FROM arduinodata WHERE id="'+id+'"';
    connection.query(query, (err, results) => {
        if (err) {
          console.error('Database query error:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.json(results);
        }
      });
}

export default deleteData;