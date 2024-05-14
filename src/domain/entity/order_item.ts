export default class OrderItem {
  private _id: string;
  private _product_id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(id: string, name: string, price: number, productId: string, quantity: number){
    this._id = id;
    this._name = name;
    this._price = price;
    this._product_id = productId
    this._quantity = quantity;
    this.validate();
  }

  validate(): boolean{
    if(this._quantity <= 0){
      throw new Error("Quantity has to be greater than zero.")
    } 
    return true
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number{
    return this._quantity;
  }

  get id(): string{
    return this._id
  }

  get name(): string{
    return this._name
  }

  get productId(): string {
    return this._product_id
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}