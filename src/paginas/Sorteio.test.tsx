import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import Sorteio from "./Sorteio";

vi.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: vi.fn()
    }
})
vi.mock('../state/hook/useResultadoSorteio', () => {
    return {
        useResultadoSorteio: vi.fn()
    }
})

describe('na pagina de sorteio', () => {
    const participantes = [
        'Ana',
        'Catarina',
        'Jorel'
    ]
    const resultado = new Map([
        ['Ana', 'Jorel'],
        ['Jorel', 'Catarina'],
        ['Catarina', 'Ana']
    ])

    beforeEach(() => {
        vi.mocked(useListaDeParticipantes).mockReturnValue(participantes);
        vi.mocked(useResultadoSorteio).mockReturnValue(resultado);
    })
    test('todos os participantes podem exibir o seu amigo secreto', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const opcoes = screen.queryAllByRole('option')
        expect(opcoes).toHaveLength(participantes.length + 1) // pq já vem uma option por padrão
    })
    test('o amigo secreto é exibido quando solicitado', () => {
        render(<RecoilRoot>
            <Sorteio />
        </RecoilRoot>)

        const select = screen.getByRole('combobox', { name: 'Selecione o seu nome' })
        
        fireEvent.change(select, {
            target: {
                value: participantes[0]
            }
        })

        const botao = screen.getByRole('button')

        fireEvent.click(botao)

        const amigoSecreto = screen.getByRole('status')

        expect(amigoSecreto).toBeInTheDocument()

    })
})
