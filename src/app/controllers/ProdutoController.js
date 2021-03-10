import Marca from '../models/Marca';
import Produto from '../models/Produto';

class ProdutoController {
  async store(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.json({ produto });
    } catch (error) {
      return res.json({ error });
    }
  }

  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        attributes: ['uid', 'name', 'quantidade', 'marca_uid'],
        include: [
          {
            model: Marca,
            as: 'marcas',
            attributes: ['uid', 'name'],
          },
        ],
      });
      return res.json({ produtos });
    } catch (error) {
      return res.json({ error });
    }
  }

  async show(req, res) {
    try {
      const { uid } = req.params;

      const produto = await Produto.findByPk(uid, {
        attributes: ['name', 'quantidade', 'uid'],
        include: [
          {
            model: Marca,
            as: 'marcas',
            attributes: ['name', 'uid'],
          },
        ],
      });

      return res.json({ produto });
    } catch (error) {
      return res.json({ error });
    }
  }

  async update(req, res) {
    try {
      const { uid } = req.params;

      const [produto] = await Produto.update(req.body, { where: { uid } });

      if (!produto) {
        throw Error('Produto não encontrado.');
      }

      return res.json({ result: 'Produto Atualizado' });
    } catch (error) {
      return res.json({ error });
    }
  }
  async delete(req, res) {
    try {
      const { uid } = req.params;

      const produto = await Produto.destroy({ where: { uid } });

      if(!produto) {
        throw Error('Produto não encontrado');
      }

      return res.json({ produto });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new ProdutoController();
