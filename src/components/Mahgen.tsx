import 'mahgen'
import { FC, useEffect, useRef } from 'react'

interface MahgenElement extends HTMLElement {
  ['data-seq']: string
  ['data-show-err']: string
  ['data-river-mode']: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'mah-gen': React.DetailedHTMLProps<React.HTMLAttributes<MahgenElement>, MahgenElement>
    }
  }
}

interface MahgenProps {
  sequence: string
  showError?: boolean
  riverMode?: boolean
  size: number
}

const Mahgen: FC<MahgenProps> = ({ sequence, showError, riverMode, size }) => {
  const ref = useRef<MahgenElement>(null)

  useEffect(() => {
    if (ref.current) {
      const img = ref.current.shadowRoot!.querySelector('img')!
      img.style.width = `min(calc(50px * ${size}), calc(5vw * ${size}))`
    }
  }, [size])

  return (
    <>
      <mah-gen
        ref={ref}
        data-seq={sequence.replace('||', '|')}
        {...(showError ? { ['data-show-err']: 'true' } : {})}
        {...(riverMode ? { ['data-river-mode']: 'true' } : {})}
      />
    </>
  )
}

export default Mahgen
