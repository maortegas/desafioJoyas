const getReportMiddleware = async (req, res, next) => {
   const data =req.query
    try {
        const report = `La url consulta es ${req.originalUrl} a tráves de metodo ${req.method}
con los siguientes parámetros: `;
        console.log(report);
        console.table(data);
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getReportMiddleware,
};