import Riichi from 'riichi'
import translation from '../constants/translation'
import { useCallback, useEffect, useState } from 'react'

const calc = (hand: string, localYaku: boolean): Riichi.Result => {
  const result = new Riichi(hand, { allLocalYaku: localYaku }).calc()
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

const getRandomHand = (hands: string[], localYaku: boolean): Hand => {
  const hand = hands[Math.floor(Math.random() * hands.length)]

  const result = calc(hand, localYaku)
  if (!result.isAgari || !Object.keys(result.yaku).length) return getRandomHand(hands, localYaku)

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

interface UseHandProps {
  isMangan: boolean
  localYaku: boolean
}

const useHand = ({ isMangan, localYaku }: UseHandProps) => {
  const [hands, setHands] = useState<string[]>()
  const [manganHands, setManganHands] = useState<string[]>()

  const [hand, setHand] = useState<Hand>()

  useEffect(
    () =>
      void import('../constants/hands').then(({ HANDS, MANGAN_HANDS }) => {
        setHands(HANDS)
        setManganHands(MANGAN_HANDS)
        setHand(getRandomHand(isMangan ? MANGAN_HANDS : HANDS, localYaku))
      }),
    [isMangan, localYaku]
  )

  const next = useCallback(() => {
    const targetHands = isMangan ? manganHands : hands
    if (targetHands) setHand(getRandomHand(targetHands, localYaku))
  }, [hands, isMangan, localYaku, manganHands])

  return [hand, next] as const
}

export default useHand
