import CustomerCreatedEvent from "../customer/customer-created.event";
import Handler1 from "../customer/handler/handler-1.handler.ts";
import Handler2 from "../customer/handler/handler-2.handler.ts";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/sendEmailWhenProductIsCreated.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Event Domain Tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    
    eventDispatcher.unregisterAll();
    
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
  });

  it("should notify all registered handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const productEventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyProductEventHandler = jest.spyOn(productEventHandler, "handle");

    const customerEventHandler1 = new Handler1();
    const spyCustomerEventHandler1 = jest.spyOn(customerEventHandler1, "handle");
    const customerEventHandler2 = new Handler2();
    const spyCustomerEventHandler2 = jest.spyOn(customerEventHandler2, "handle");

    eventDispatcher.register("ProductCreatedEvent", productEventHandler);
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(productEventHandler);
  
    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", customerEventHandler2);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(customerEventHandler1);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(customerEventHandler2);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Description top",
      price: 20.0
    });

    const customerCreatedEvent = new CustomerCreatedEvent({
      id: "123",
      name: "Customer 1",
      address: "Rua tal, 23",
      active: false,
      rewardPoints: 20
    })

    // quando notify() executar o SendEmailWhenProductIsCreatedHandler.handle() sera executado
    eventDispatcher.notify(productCreatedEvent)
    expect(spyProductEventHandler).toHaveBeenCalled()

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyCustomerEventHandler1).toHaveBeenCalled();
    expect(spyCustomerEventHandler2).toHaveBeenCalled();
  });

})