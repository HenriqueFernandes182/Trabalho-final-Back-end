import Marca from '../models/Marca';
import Produto from '../models/Produto';
// import ProdutoMarca from '../models/ProdutoMarca';

class ProdutoController {
  async store(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.json({ produto });
    } catch (error) {
      return res.json({ error });
    }
  }
  // async store(req, res) {
  //   const t = await Produto.sequelize.transaction();
  //   try {
  //     const produto = await Produto.create(req.body, {
  //       transaction: t,
  //     });

  //     const { marcas } = req.boby;

  //     await Promise.all(
  //       marcas.map(async (marca_uid) => {
  //         const marca = await ProdutoMarca.create(
  //           {
  //             marca_uid: marca_uid,
  //             produto_uid
  //           },
  //           { transaction: t }
  //         );
  //         return marca;
  //       })
  //     );
  //     await t.commit();
  //     return res.json({ produto });
  //   } catch (error) {
  //     return res.json({ error });
  //   }
  // }

  async index(req, res) {
    try {
      const produtos = await Produto.findAll({
        attributes: ['name', 'quantidade', 'uid'],
        include: [
          {
            model: Marca,
            as: 'marcas',
            attributes: ['name', 'uid'],
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

      if (!produto) {
        throw Error('Produto não encontrado');
      }

      return res.json({ produto });
    } catch (error) {
      return res.json({ error });
    }
  }
}

export default new ProdutoController();
