import { atom } from 'jotai'

export const hanAtom = atom<number | undefined>(undefined)
export const fuAtom = atom<number | undefined>(undefined)
export const tenAtom = atom<number | undefined>(undefined)

export const resetAtom = atom(null, (_, set) => {
  set(hanAtom, undefined)
  set(fuAtom, undefined)
  set(tenAtom, undefined)
})
