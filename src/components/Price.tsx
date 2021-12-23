const Price: React.FC<{ price: Price }> = ({ price, children }) => {
  return (
    <p className="price">
      {`$ ${price.amount.toLocaleString('es-AR')}`}
      {price.decimals ? <span className="price-decimals">{price.decimals}</span> : null}
      {children}
    </p>
  )
}

export default Price
