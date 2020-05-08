module.exports = (req, res, next) => {
    if (!req.body) {
     res.status(400).json({ message: "missing action data" });
     } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
         res.status(400).json({ message: "missing required description, notes, or project_id field" });
     } else {
         next();
     }
 }