const format = require("pg-format");
const db = require("../db");
const pool = require("../db");
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

// Filtro

const getJoyasFiltrosController = async (req, res, next) => {
  try {
    const { precio_max, precio_min, categoria, metal } = req.query;
    const filtros = [];
    const values = [];

    let index = 1;

    if (precio_max) {
      filtros.push("precio <= $" + index++);
      values.push(precio_max);
    }
    if (precio_min) {
      filtros.push("precio >= $" + index++);
      values.push(precio_min);
    }
    if (categoria) {
      filtros.push("categoria = $" + index++);
      values.push(categoria);
    }
    if (metal) {
      filtros.push("metal = $" + index++);
      values.push(metal);
    }

    let consulta = "SELECT * FROM inventario";
    if (filtros.length > 0) {
      consulta += " WHERE " + filtros.join(" AND ");
    }

    const { rows } = await pool.query(consulta, values);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron registros coincidentes" });
    }

    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

module.exports = { getJoyasController, getJoyasFiltrosController };
