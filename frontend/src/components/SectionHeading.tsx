type Props = { index: string; eyebrow: string; title: string; id?: string }

export default function SectionHeading({ index, eyebrow, title, id }: Props) {
  return (
    <div className="section-heading">
      <div className="section-index">{index} <span>—</span> {eyebrow}</div>
      <h2 id={id}>{title}</h2>
    </div>
  )
}
