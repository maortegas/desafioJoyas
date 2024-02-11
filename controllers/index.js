const format = require("pg-format");
const db = require("../db");
const { selectAllJoyas } = require("../querys");

const getJoyasController = async (req, res, next) => {
  try {
    const { limits = 10, order_by = "id_ASC", page = 1 } = req.query;

    const [campo, direccion] = order_by.split("_");
    const offset = (page - 1) * limits;
    const formattedQuery = format(
      selectAllJoyas,
      campo,
      direccion,
      limits,
      offset
    );
    const { rows } = await db.query(formattedQuery);

    if (rows.count == 0) {
      res.status(404).json({
        status: "Failed",
        msg: "No existen datos ",
      });
    } else {
      res.status(200).json(prepararHATEOAS(rows));
    }
  } catch (error) {
    next(error);
  }
};

const prepararHATEOAS = (joyas) => {
    const results = joyas
        .map((m) => {
        return {
            name: m.nombre,
            href: `/joyas/joya/${m.id}`,
        };
        })
        .slice(0, 6);
    const total = joyas.length;
    const suma = joyas
        .map((joya) => joya.stock)
        .reduce((prev, curr) => prev + curr, 0);
    const HATEOAS = { total, suma, results };

    return HATEOAS;
};

const getJoyasFiltrosController = async () => {};
module.exports = { getJoyasController, getJoyasFiltrosController };
