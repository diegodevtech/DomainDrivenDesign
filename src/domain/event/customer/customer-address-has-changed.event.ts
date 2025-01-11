import Address from "../../entity/address";
import EventInterface from "../@shared/event.interface";

export type CustomerAddressHasChangedEventMessageType = {
  id: string;
  name: string;
  address: Address;
}
export default class CustomerAddressHasChangedEvent implements EventInterface {
  dataTimeOcurred: Date;
  eventData: CustomerAddressHasChangedEventMessageType;

  constructor(eventData: CustomerAddressHasChangedEventMessageType) {
    this.dataTimeOcurred = new Date();
    this.eventData = eventData;
  }
}