// src/paginas/Sorteio.tsx
import { useState } from "react"
import Card from "../componentes/Card"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio"

import './Sorteio.css'

const Sorteio = () => {

    const participantes = useListaDeParticipantes()

    const [participanteDaVez, setParticipanteDaVez] = useState('')
    const [amigoSecreto, setAmigoSecreto] = useState('')

    const resultado = useResultadoSorteio()

    const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        if (resultado.has(participanteDaVez)) {
            setAmigoSecreto(resultado.get(participanteDaVez)!)
        }
    }

    return (<Card>
        <section className="sorteio">
            <h2>Quem vai tirar o papelzinho?</h2>
            <form onSubmit={sortear}>
                <select
                    required
                    name="participanteDaVez"
                    id="participanteDaVez"
                    aria-label="Selecione o seu nome"
                    value={participanteDaVez}
                    onChange={evento => {
                        setParticipanteDaVez(evento.target.value)
                        setAmigoSecreto('')
                    }}
                >
                    <option value="" disabled>Selecione seu nome</option>
                    {participantes.map(participante => (
                        <option key={participante} value={participante}>{participante}</option>
                    ))}
                </select>
                <p>Clique em sortear para ver quem é seu amigo secreto!</p>
                <button className="botao-sortear" disabled={!participanteDaVez}>Sortear</button>
            </form>
            {amigoSecreto && (
                <p className="resultado" role="status" aria-live="polite">
                    Seu amigo secreto é: <strong>{amigoSecreto}</strong>
                </p>
            )}
            <footer className="sorteio">
                <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
            </footer>
        </section>
    </Card>)
}

export default Sorteio
