export default class ProductDto {
  constructor(product, order) {
    this.id = product._id.toString();
    this.title = product.title;
    this.price = product.price;
    this.quantity = order.quantity;
    this.total = product.price * order.quantity;
    this.thumbnail = product.thumbnail;
  }
}
