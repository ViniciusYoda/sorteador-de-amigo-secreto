import { atom } from "recoil";

export const listaparticipantesState = atom<string[]>({
    key: 'listaParticipantesState',
    default: []
})