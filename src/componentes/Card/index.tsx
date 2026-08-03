//src/componentes/Card/index.tsx

import { PropsWithChildren } from "react"

import './estilos.css'

const Card = ({ children }: PropsWithChildren) => {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default Card
