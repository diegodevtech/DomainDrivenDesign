describe("Product Factory Unit Test", () => {
  it("should create an A-typed product", () => {
    const product = ProductFactory.create("a", "Product A", 1)

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A")
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  })
})