export default function Card({
  children,
  title,
  subtitle,
  className = '',
  hover = false,
  ...props
}) {
  const hoverStyles = hover ? 'hover:scale-105 hover:shadow-2xl cursor-pointer' : ''

  return (
    <div
      className={`
        bg-gray-800/50 backdrop-blur-sm
        border border-gray-700/50
        rounded-xl p-6
        transition-all duration-300
        ${hoverStyles}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {subtitle && (
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}
