import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Formulario from './Formulario';
import { RecoilRoot } from 'recoil';

test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(<Formulario />)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    const botao = screen.getByRole('button')

    expect(input).toBeInTheDocument()

    expect(botao).toBeDisabled()
})

test('adicionar um participante caso exista um nome preenchido', () => {
    render(<RecoilRoot>
        <Formulario />
    </RecoilRoot>)

    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')

    const botao = screen.getByRole('button')

    fireEvent.change(input, {
        target: {
            value: 'Ana Catarina'
        }
    })

    fireEvent.click(botao)

    expect(input).toHaveFocus()

    expect(input).toHaveValue("")
})