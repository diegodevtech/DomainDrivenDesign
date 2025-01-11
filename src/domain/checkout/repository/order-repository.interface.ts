import Order from "./order";
import RepositoryInterface from "../../@shared/repository/repository.interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
