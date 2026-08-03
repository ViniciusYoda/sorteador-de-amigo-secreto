import { render, screen } from '@testing-library/react'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { useListaDeParticipantes } from '../state/hook/useListaDeParticipantes'
import ListaParticipantes from './ListaParticipantes'

vi.mock('../state/hook/useListaDeParticipantes', () => {
    return {
        useListaDeParticipantes: vi.fn()
    }
})

describe('uma lista vazia de participantes', () => {
    beforeEach(() => {
        vi.mocked(useListaDeParticipantes).mockReturnValue([])
    })
    test('deve ser renderizada sem elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(0)
    })
})

describe('uma lista preenchida de participantes', () => {
    const participantes = ['Ana', 'Catarina']
    beforeEach(() => {
        vi.mocked(useListaDeParticipantes).mockReturnValue(participantes)
    })
    test('deve ser renderizada sem elementos', () => {
        render(<RecoilRoot>
            <ListaParticipantes />
        </RecoilRoot>)
    
        const itens = screen.queryAllByRole('listitem')
        expect(itens).toHaveLength(participantes.length)
    })
})
