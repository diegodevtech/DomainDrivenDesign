import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Diego");
const address = new Address("Rua tal", 111,"69095-626","Manaus")
customer.setAddress(address)
customer.activate()

const item1 = new OrderItem("1", "123", "Item1", 1, 10);
const item2 = new OrderItem("2", "124", "Item 2", 1, 15);
const order = new Order("1", "123", [item1, item2])

