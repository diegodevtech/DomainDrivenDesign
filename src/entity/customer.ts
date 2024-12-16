import Address from "./address";

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _active: boolean = false;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    isActive(): boolean {
        return this._active;
    }

    get name(): string {
        return this._name
    }

    validate() {
        if(this._name.length === 0) {
            throw new Error("Name is required")
        }
        if (this._id.length === 0) {
            throw new Error("ID is required")
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate()
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true
    }
    
    deactivate() {
        this._active = false
    }

    setAddress(address: Address) {
        this._address = address;
    }
}