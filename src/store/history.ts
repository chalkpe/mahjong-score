import { atomWithStorage } from 'jotai/utils'

interface History {
  fu: [number, number | undefined]
  han: [number, number | undefined]
  ten: [number, number | undefined]
}

export const historyAtom = atomWithStorage<History[]>('history', [])
