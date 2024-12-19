import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.street,
      city: entity.city,
      zip: entity.zip,
      number: entity.number,
    });
  }

  async update(entity: Customer): Promise<void> {
    throw new Error("Method not implemented")
  }

  async find(id: string): Promise<Customer> {
    throw new Error("Method not implemented");
  }

  async findAll(): Promise<Customer[]> {
    throw new Error("Method not implemented");
  }
}