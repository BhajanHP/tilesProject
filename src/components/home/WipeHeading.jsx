export default function WipeHeading({ as: Tag = 'h2', className = '', children }) {
  return (
    <span className="wipe">
      <Tag className={className}>{children}</Tag>
      <span className="wipe__bar" aria-hidden="true" />
    </span>
  )
}
