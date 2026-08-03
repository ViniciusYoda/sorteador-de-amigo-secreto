import shuffle from "just-shuffle";

export function realizarSorteio (participantes: string[]) {
    if (participantes.length < 2) {
        return new Map<string, string>()
    }

    const  totalDeParticipantes = participantes.length
    const embaralhado = shuffle([...participantes])
    const resultado = new Map<string, string>()
    for (let index = 0; index < totalDeParticipantes; index++) {    
        const indiceDoAmigo = index === (totalDeParticipantes - 1) ? 0 : index + 1;
        resultado.set(embaralhado[index], embaralhado[indiceDoAmigo])
    }
    return resultado
}
