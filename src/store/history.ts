import { atomWithStorage } from 'jotai/utils'

interface History {
  fu: [number, number | null]
  han: [number, number | null]
  ten: [number, number | null]
}

export const historyAtom = atomWithStorage<History[]>('history', [])
