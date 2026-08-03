import { useRef, useState } from "react"
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante"
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro"

import './Formulario.css'

const Formulario = () => {

    const [nome, setNome] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    const adicionarNaLista = useAdicionarParticipante()

    const mensagemDeErro = useMensagemDeErro()

    const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        adicionarNaLista(nome.trim())
        setNome('')
        inputRef.current?.focus()
    }

    return (<form onSubmit={adicionarParticipante}>
        <div className="grupo-input-btn">
            <input
                ref={inputRef}
                value={nome}
                onChange={evento => setNome(evento.target.value)}
                type="text"
                aria-label="Nome do participante"
                placeholder="Insira os nomes dos participantes"
                autoComplete="off"
                maxLength={60}
            />
            <button disabled={!nome.trim()}>Adicionar</button>
        </div>
        {mensagemDeErro && <p className="alerta erro" role="alert">{mensagemDeErro}</p>}
    </form>)
}

export default Formulario
