'use strict';
function notFound(req, res, next) {
    res.status(404);
    res.statusMessage = 'Not Found :(';
    res.json({ error: `page Not Found ` });
}
module.exports = notFound;