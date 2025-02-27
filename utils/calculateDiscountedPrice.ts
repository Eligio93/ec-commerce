export default function calculateDiscountedPrice(
  price: number,
  discount: number = 0,
  quantity: number = 1
) {
  return ((price - (price * discount) / 100) * quantity).toFixed(2);
}
