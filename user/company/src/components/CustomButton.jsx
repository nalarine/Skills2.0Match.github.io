import React from 'react'

const CustomButton = ({
  title,
  containerStyles,
  iconRight,
  icon,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {title}
      {icon}
      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  )
}

export default CustomButton
