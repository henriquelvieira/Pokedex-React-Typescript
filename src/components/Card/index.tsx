import { ReactNode } from 'react';

import './styles.scss';


type CardProps = {
  imagem: string,
  name: string
}

export function Card({ 
    imagem, 
    name
  }: CardProps) {
    return (
          <div className="card">
            <img src={imagem} alt={name} />
            <div className="container">
              <h4><b>{name}</b></h4>
              <p>Habilidades</p>
            </div>
          </div>
    )
}