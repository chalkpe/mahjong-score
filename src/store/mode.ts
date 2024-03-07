import { atomWithStorage } from 'jotai/utils'

export const isManganAtom = atomWithStorage<boolean>('isMangan', false)
export const isLocalYakuAtom = atomWithStorage<boolean>('isLocalYaku', false)
