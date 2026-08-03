import { realizarSorteio } from "./realizarSorteio"

describe('dado um sorteio de amigo secreto', () => {
    test('não gera resultado sem participantes suficientes', () => {
        expect(realizarSorteio([])).toEqual(new Map())
        expect(realizarSorteio(['Ana'])).toEqual(new Map())
    })

    test('cada participante não sorteie o próprio nome', () => {

        const participantes = [
            'Ana',
            'Catarina',
            'Vinicios',
            'Juliana',
            'João',
            'Nathália'
        ]

        const sorteio = realizarSorteio(participantes)
        participantes.forEach(participante => {
            const amigoScreto = sorteio.get(participante)
            expect(amigoScreto).not.toEqual(participante)
        })

    })
})
