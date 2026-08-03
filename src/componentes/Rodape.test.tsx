import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import Rodape from "./Rodape";

vi.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: vi.fn()
    }
})

const mockNavegacao = vi.fn()
const mockSorteio = vi.fn()

vi.mock('../state/hook/useSorteador', () => {
    return {
        useSorteador: () => mockSorteio
    }
})

vi.mock('react-router-dom', () => {
    return {
        useNavigate: () => mockNavegacao
    }
})

describe('quando não existem participantes suficientes', () => {
    beforeEach(() => {
        vi.mocked(useListaDeParticipantes).mockReturnValue([])
    })
    test('a brincadeira não pode ser iniciada', () => {
        render(<RecoilRoot>
            <Rodape />
        </RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).toBeDisabled()
    })
})

describe('quando existem participantes suficientes', () => {
    beforeEach(() => {
        vi.mocked(useListaDeParticipantes).mockReturnValue(['Ana', 'Catarina', 'Josefina'])
    })
    test('a brincadeira pode ser iniciada', () => {
        render(<RecoilRoot>
            <Rodape />
        </RecoilRoot>)
        const botao = screen.getByRole('button')
        expect(botao).not.toBeDisabled()
    })
    test('a brincadeira foi iniciada', () => {
        render(<RecoilRoot>
            <Rodape />
        </RecoilRoot>)
        const botao = screen.getByRole('button')
        fireEvent.click(botao)

        expect(mockNavegacao).toHaveBeenCalledTimes(1)
        expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
        expect(mockSorteio).toHaveBeenCalledTimes(1)
    })
})
