import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerRepository from "./customer.repository";

describe("Customer repository tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });
  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    customer.changeName("Diego");
    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });

    const address2 = new Address("Rua Top", 10, "20200-222", "Iranduba");

    customer.setAddress(address2);

    await customerRepository.update(customer);

    const customerModel2 = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel2.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: customer.street,
      number: customer.number,
      zip: customer.zip,
      city: customer.city,
      rewardPoints: customer.rewardPoints,
    });

  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Rua tal", 110, "10100-111", "Manaus");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);
    expect(customer).toStrictEqual(customerResult);
  })

  it("should throw an error when customer is not found", ()=> {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("12345")
    }).rejects.toThrow("Customer not found.")
  })
});
