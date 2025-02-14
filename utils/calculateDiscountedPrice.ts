export default function calculateDiscountedPrice(price: number, discount: number) {
    return (price - price * discount / 100).toFixed(2);
}