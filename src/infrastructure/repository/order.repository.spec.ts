import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import OrderItem from "../../domain/entity/order_item";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer1.setAddress(address1);
    await customerRepository.create(customer1);

    const productRepository = new ProductRepository();

    const product1 = new Product("prod1", "Prod 1", 100)
    await productRepository.create(product1);

    const orderItem = new OrderItem("1", product1.id, product1.name, product1.price, 3)

    const orderRepository = new OrderRepository();

    const order = new Order("o1", "123", [orderItem])
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
        where: {
            id: order.id
        },
        include: ["items"]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "o1",
      customer_id: customer1.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "o1",
          product_id: "prod1",
        },
      ],
    });
  });
});
