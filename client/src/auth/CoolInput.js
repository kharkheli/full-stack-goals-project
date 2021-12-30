import React, { useState } from 'react'

function CoolInput({ name, label, type, maxLength, data, setData }) {
  const [placeholder, setPlaceholder] = useState(true)
  return (
    <div className="cool-input-cont">
      <h3 className={`cool-label ${placeholder ? 'placeholder' : null}`}>
        {label}
      </h3>
      <input
        className="cool-input"
        type={type}
        name={name}
        onFocus={() => setPlaceholder(false)}
        value={data[name]}
        onChange={(e) => {
          if (e.target.value.length <= maxLength) {
            setData({ ...data, [name]: e.target.value })
          }
        }}
        onBlur={() => {
          if (!data[name]) {
            setPlaceholder(true)
          }
        }}
      />
    </div>
  )
}

export default CoolInput
