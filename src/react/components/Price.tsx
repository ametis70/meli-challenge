import PriceType from '../../server/entities/Price'

const Price: React.FC<{ price: PriceType }> = ({ price, children }) => {
  return (
    <p className="price">
      {`$ ${price.amount.toLocaleString('es-AR')}`}
      {price.decimals ? <span className="price-decimals">{price.decimals}</span> : null}
      {children}
    </p>
  )
}

export default Price
