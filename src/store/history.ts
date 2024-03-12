import { atomWithStorage } from 'jotai/utils'

export interface History {
  jikaze: '1' | '2' | '3' | '4'
  type: 'ron' | 'tsumo'
  fu: [number, number | null]
  han: [number, number | null]
  ten: [number, number | null]
}

export const historyAtom = atomWithStorage<History[]>('history', [])
