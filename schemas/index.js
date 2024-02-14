const z = require("zod");

const joyaSchema = z.object({
  limits: z.coerce.number().min(1),
  page: z.coerce.number().min(1),
  order_by: z.enum([
    "id_ASC",
    "id_DESC",
    "nombre_ASC",
    "nombre_DESC",
    "categoria_ASC",
    "categoria_DESC",
    "metal_ASC",
    "metal_DESC",
    "precio_ASC",
    "precio_DESC",
    "stock_ASC",
    "stock_DESC",
  ]),
});

function validatePartialJoya(input) {
  return joyaSchema.partial().safeParse(input);
}

module.exports = {
  validatePartialJoya,
};
