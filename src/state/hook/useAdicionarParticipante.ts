import { useRecoilValue, useSetRecoilState } from "recoil"
import { erroState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
    const setLista = useSetRecoilState(listaParticipantesState)
    const lista = useRecoilValue(listaParticipantesState)
    const setErro = useSetRecoilState(erroState)
    return (nomeDoParticipante: string) => {
        const nomeNormalizado = nomeDoParticipante.trim()
        const nomeJaExiste = lista.some(
            nome => nome.localeCompare(nomeNormalizado, 'pt-BR', { sensitivity: 'base' }) === 0
        )

        if (!nomeNormalizado) {
            return
        }

        if (nomeJaExiste) {
            setErro('Nomes duplicados não são permitidos!')
            setTimeout(() => {
                setErro("")
            }, 5000)
            return
        }
        setErro('')
        return setLista(listaAtual => [...listaAtual, nomeNormalizado])
    }
}
