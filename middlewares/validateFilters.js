const validateFilters = (req, res, next) => {
  console.log("Request URL:", req.originalUrl);
  console.log("Request metodo:", req.method);
  console.log("Request parametros:", req.params);
  console.log("Request query string:", req.query);
  console.log("Request body:", req.body);

  const { precio_max, precio_min, categoria, metal } = req.query;

  const validColumns = ["precio_max", "precio_min", "categoria", "metal"];

  const invalidFilters = Object.keys(req.query).filter(
    (key) => !validColumns.includes(key)
  );

  if (invalidFilters.length > 0) {
    return res.status(400).json({
      error: "Parametros de filtros invalidos: " + invalidFilters.join(", "),
    });
  }

  if (!precio_max && !precio_min && !categoria && !metal) {
    return res.status(400).json({
      error: "Parametros de filtros incompletos o invalidos.",
      message: "Debe proporcionar al menos un filtro válido.",
    });
  }

  if (!(precio_max || precio_min || categoria || metal)) {
    return res.status(400).json({
      error: "No se han especificado filtros de busqueda.",
      message: "Debe proporcionar al menos un filtro válido.",
    });
  }

  if (precio_max) {
    const parsedPrecioMax = parseInt(precio_max);
    if (isNaN(parsedPrecioMax) || parsedPrecioMax <= 0) {
      return res.status(400).json({
        error:
          "precio_max debe ser un número entero no negativo distinto de cero.",
        message: "El valor de precio_max no es válido.",
      });
    }
  }
  if (precio_min) {
    const parsedPrecioMin = parseInt(precio_min);
    if (isNaN(parsedPrecioMin) || parsedPrecioMin < 0) {
      return res.status(400).json({
        error: "precio_min debe ser un número entero no negativo.",
        message: "El valor de precio_min no es válido.",
      });
    }
  }

  if (categoria && typeof categoria !== "string") {
    return res.status(400).json({
      error: "categoria debe ser un string.",
      message: "El valor de categoria no es válido.",
    });
  }
  if (metal && typeof metal !== "string") {
    return res.status(400).json({
      error: "metal debe ser una cadena de caracteres.",
      message: "El valor de metal no es válido.",
    });
  }

  next();
};

module.exports = validateFilters;
