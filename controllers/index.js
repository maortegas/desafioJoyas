const db = require("../db");
const {
  selectAllJoyas,
} = require("../querys");

const getJoyasController = async (req, res, next) => {
  try {
    const { rows } = await db.query(selectAllJoyas);

    if (rows.count == 0) {
      res.status(404).json({
        status: "Failed",
        msg: "No existen datos ",
      });
    } else {
      
      res.status(200).json( prepararHATEOAS(rows));
    }
  } catch (error) {
    next(error);
  }
};

const prepararHATEOAS = (joyas) => {
const results = joyas.map((m) => {
    return {
      name: m.nombre,
      href: `/joyas/joya/${m.id}`,
    };
  })
  .slice(0, 6);
const total = joyas.length; 
const HATEOAS = {total, results }
return HATEOAS 
}

const getJoyasFiltrosController=async()=>{

}
module.exports = {getJoyasController,getJoyasFiltrosController};
