import React from 'react'

const ProductPolitics = ({politics}) => {
  return (
    <div className="politics">
    <h2>Qué tenés que saber</h2>
    <hr />
    <div className="politics--container">
      <div>
        <h3>Normas de la casa</h3>
        <ol>
          {politics?.rules?.map(e=>(<li key={e.id}>{e.description}</li>))}
        </ol>
      </div>
      <div>
        <h3>Salud y seguridad</h3>
        <ol>
        {politics?.healthAndSecurityPolicies?.map(e=>(<li key={e.id}>{e.description}</li>))}
        </ol>
      </div>
      <div>
        <h3>Políticas de cancelación</h3>
        <ol>
          {politics?.cancellationPolicies?.map(e=>(<li key={e.id}>{e.description}</li>))}
        </ol>
      </div>
    </div>
  </div>
  )
}

export default ProductPolitics