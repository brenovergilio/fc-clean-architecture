import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

describe("Test list product use case", () => {
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

  it("should list a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);

    const product1 = new Product("123", "Case", 10.00);
    const product2 = new Product("321", "Pencil", 3.00);
  
    await Promise.all([
      productRepository.create(product1),
      productRepository.create(product2),
    ]);

    const output = {
      products: [
        {
          id: "123",
          name: "Case",
          price: 10.00
        },
        {
          id: "321",
          name: "Pencil",
          price: 3.00
        },
      ]
    };

    const result = await usecase.execute({});

    expect(result).toEqual(output);
  });
});
