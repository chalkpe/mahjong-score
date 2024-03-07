import Riichi from 'riichi'
import translation from '../constants/translation'
import { useEffect, useState } from 'react'

const calc = (hand: string): Riichi.Result => {
  const result = new Riichi(hand, { allLocalYaku: true }).calc()
  return {
    ...result,
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

const getRandomHand = (hands: string[]): Hand => {
  const hand = hands[Math.floor(Math.random() * hands.length)]

  const result = calc(hand)
  if (!result.isAgari || !Object.keys(result.yaku).length) return getRandomHand(hands)

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
  const [hand, setHand] = useState<Hand>()
  useEffect(() => void import('../constants/hands').then(({ HANDS }) => setHand(getRandomHand(HANDS))), [])

  return hand
}

export default useHand
