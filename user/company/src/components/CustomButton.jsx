import React from 'react'

const CustomButton = ({
  title,
  containerStyles,
  iconRight,
  iconLeft,
  type,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type || 'button'}
      className={`inline-flex items-center ${containerStyles}`}
    >
      {iconLeft && <div className="mr-2">{iconLeft}</div>}
      {title}
      {iconRight && <div className="ml-2">{iconRight}</div>}
    </button>
  )
}

export default CustomButton
