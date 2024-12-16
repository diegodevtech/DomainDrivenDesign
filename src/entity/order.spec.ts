import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw an error when id is empty", () => {
    expect(() => {
      const order = new Order("", "123", []);
      order.validate();
    }).toThrow("ID is required.");
  });

  it("should throw an error when customer id is empty", () => {
    expect(() => {
      const order = new Order("123", "", []);
      order.validate();
    }).toThrow("Customer ID is required.");
  });

  it("should throw an error when item list is empty", () => {
    expect(() => {
      const order = new Order("123", "123", []);
      order.validate();
    }).toThrow(
      "A list of items is required and must have length greater than zero."
    );
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("123", "Item 1", 1);
    const item2 = new OrderItem("1234", "Item 2", 10);
    const item3 = new OrderItem("12345", "Item 3", 100);

    const order = new Order("1", "12", [item1, item2, item3]);
    const total = order.total()

    expect(total).toBe(111);

    const order2 = new Order("111","123", [item1, item3])
    const total2 = order2.total()

    expect(total2).toBe(101)
  });
});
