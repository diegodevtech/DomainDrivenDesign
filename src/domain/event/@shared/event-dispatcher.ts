import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  notify(event: EventInterface): void {
    
  }
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    
  }
  unregisterAll(): void {
    
  }
}