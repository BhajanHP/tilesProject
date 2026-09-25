import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, onSelect }) {
  return (
    <ul className="grid">
      {products.map((product, index) => (
        <li key={product.id} style={{ '--stagger': index }}>
          <ProductCard product={product} onSelect={() => onSelect(product)} />
        </li>
      ))}
    </ul>
  )
}
