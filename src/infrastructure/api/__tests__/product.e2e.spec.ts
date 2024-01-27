import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        name: "Case",
        price: 10.00,
        type: "a",
      });

    expect(response.status).toBe(200);

    const response2 = await request(app)
      .post("/product")
      .send({
        name: "Pencil",
        price: 3.00,
        type: "b",
      });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("Case");
    expect(product.price).toBe(10.00);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Pencil");
    expect(product2.price).toBe(6.00);
  });
});
