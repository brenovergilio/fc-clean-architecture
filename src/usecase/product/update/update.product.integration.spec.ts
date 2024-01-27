import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test create product use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = ProductFactory.create("a", "Case", 10.00);

    productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);
  
    const input = {
      id: product.id,
      type: "a",
      name: "Pencil",
      price: 3.00
    };    

    const output = {
      id: product.id,
      name: "Pencil",
      price: 3.00
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
