const {validatePartialJoya} = require("../schemas");

const getReportMiddleware = async (req, res, next) => {
const data = req.query;
const result = validatePartialJoya(req.query);

if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
}

const report = `La url consulta es ${req.originalUrl} a tráves de metodo ${req.method}
con los siguientes parámetro `;

console.log(report);
console.table(data);
  
next();
};

module.exports = {
  getReportMiddleware,
};
