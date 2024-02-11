const {
  getJoyasController,
  getJoyasFiltrosController,
} = require("../controllers");
const { getReportMiddleware } = require("../middlewares");
const router = require("express").Router();

router.get("/joyas", getReportMiddleware, getJoyasController)
router.get("/joyas/filtros", getReportMiddleware, getJoyasFiltrosController);


module.exports = router;
