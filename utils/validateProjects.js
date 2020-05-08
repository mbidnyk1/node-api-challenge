module.exports = (req, res, next) => {
    if (!req.body) {
     res.status(400).json({ message: "missing project data" });
     } else if (!req.body.name || !req.body.description) {
         res.status(400).json({ message: "missing required name or description field" });
     } else {
         next();
     }
 }