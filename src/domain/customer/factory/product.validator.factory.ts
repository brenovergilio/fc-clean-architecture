import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../../product/entity/product";
import ProductB from "../../product/entity/product-b";
import ProductYupValidator, { ProductBYupValidator } from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }

  static createForB(): ValidatorInterface<ProductB> {
    return new ProductBYupValidator();
  }
}
