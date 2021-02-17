import Marca from '../models/Marca';

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
}
export default new MarcaController();
