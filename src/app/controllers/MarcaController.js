import Marca from '../models/Marca';
import Produto from '../models/Produto';

class MarcaController {
  async store(req, res) {
    try {
      const marca = await Marca.create(req.body);
      return res.json({ marca });
    } catch (error) {
      return res.json({ error });
    }
  }

  async index(req, res) {
    try {
      const marcas = await Marca.findAll({
        attributes: ['uid', 'name'],
      });
      return res.json({ marcas });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const marca = await Marca.findByPk(uid, {
        attributes: ['uid', 'name'],
        include: [
          {
            model: Produto,
            as: 'produtos',
            attributes: ['uid', 'name'],
          },
        ],
      });

      return res.json({ marca });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new MarcaController();
// async show() {
//   try {
//     const { uid } = req.params;
//     const marca = await Marca.findByPk
//   } catch (error) {

//   }
// }
