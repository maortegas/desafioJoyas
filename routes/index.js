const {
  getJoyasController,
  getJoyasFiltrosController,
} = require("../controllers");
const { getReportMiddleware } = require("../middlewares/validateHATEOAS");
const router = require("express").Router();
const validateFilters = require("../middlewares/validateFilters");

router.get("/joyas", getReportMiddleware, getJoyasController);
router.get("/joyas/filtros", validateFilters, getJoyasFiltrosController);

// Ruta indefinida
router.use("*", (req, res) => {
  res.status(404).json({ error: "Ruta no encontrada." });
});

module.exports = router;
