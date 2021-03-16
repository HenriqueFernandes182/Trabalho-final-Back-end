import Sequelize from 'sequelize';
import 'dotenv/config';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Marca from '../app/models/Marca';
import Produto from '../app/models/Produto';
import ProdutoMarca from '../app/models/ProdutoMarca';

const models = [User, Marca, Produto, ProdutoMarca];

class DataBase {
  constructor() {
    this.init();
  }

  init() {
    console.log('iniciou o banco');

    this.connection = new Sequelize(process.env.DATABASE_URL, databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new DataBase();
