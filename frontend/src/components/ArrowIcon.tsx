type Props = {
  direction?: 'up-right' | 'up' | 'down'
  className?: string
}

export default function ArrowIcon({ direction = 'up-right', className }: Props) {
  const path = direction === 'up-right'
    ? <><path d="M5 19 19 5" /><path d="M9 5h10v10" /></>
    : direction === 'up'
      ? <><path d="M12 19V5" /><path d="m5 12 7-7 7 7" /></>
      : <><path d="M12 5v14" /><path d="m5 12 7 7 7-7" /></>

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {path}
    </svg>
  )
}
