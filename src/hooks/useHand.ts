import { useCallback, useEffect, useState } from 'react'

import Riichi from 'riichi'
import translation from '../constants/translation'

import { useAtomValue } from 'jotai'
import { isLocalYakuAtom, isManganAtom } from '../store/mode'

const calc = (hand: string, isLocalYaku: boolean): Riichi.Result => {
  const result = new Riichi(hand, { allLocalYaku: isLocalYaku }).calc()
  return {
    ...result,
    han: result.yakuman ? 13 : result.han,
    yaku: Object.fromEntries(
      Object.entries(result.yaku).map(([k, v]) => [
        translation[k],
        v.replace('飜', '판').replace('倍役満', '배역만').replace('役満', '역만'),
      ])
    ),
  }
}

export interface Hand {
  result: Riichi.Result
  type: 'ron' | 'tsumo'
  closed: string
  taken: string
  bakaze: string
  jikaze: string
}

const getRandomHand = (hands: string[], isLocalYaku: boolean): Hand => {
  const hand = hands[Math.floor(Math.random() * hands.length)]

  const result = calc(hand, isLocalYaku)
  if (!result.isAgari || !Object.keys(result.yaku).length) return getRandomHand(hands, isLocalYaku)

  const parts = hand.split('+')
  if (parts.length === 3) {
    return {
      result,
      type: 'ron',
      closed: parts[0],
      taken: parts[1],
      bakaze: parts[2][0],
      jikaze: parts[2][1],
    }
  } else {
    return {
      result,
      type: 'tsumo',
      closed: parts[0].slice(0, -2),
      taken: parts[0].slice(-2),
      bakaze: parts[1][0],
      jikaze: parts[1][1],
    }
  }
}

const useHand = () => {
  const isMangan = useAtomValue(isManganAtom)
  const isLocalYaku = useAtomValue(isLocalYakuAtom)

  const [hands, setHands] = useState<string[]>()
  const [manganHands, setManganHands] = useState<string[]>()

  const [hand, setHand] = useState<Hand>()

  useEffect(
    () =>
      void import('../constants/hands').then(({ HANDS, MANGAN_HANDS }) => {
        setHands(HANDS)
        setManganHands(MANGAN_HANDS)
        setHand(getRandomHand(isMangan ? MANGAN_HANDS : HANDS, isLocalYaku))
      }),
    [isMangan, isLocalYaku]
  )

  const next = useCallback(() => {
    const targetHands = isMangan ? manganHands : hands
    if (targetHands) setHand(getRandomHand(targetHands, isLocalYaku))
  }, [hands, isLocalYaku, isMangan, manganHands])

  return [hand, next] as const
}

export default useHand
