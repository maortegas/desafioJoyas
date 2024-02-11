const getReportMiddleware = async (req, res, next) => {
    const data=req.query
    try {
        console.log(data);
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {
  getReportMiddleware,
};