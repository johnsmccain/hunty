import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

type CustomToggleProps = {
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
};

const CustomToggle = ({ initialValue = false, onChange, disabled = false }: CustomToggleProps) => {
  const [isToggled, setIsToggled] = useState(initialValue);

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !isToggled;
    setIsToggled(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <button
    onClick={handleToggle}
    disabled={disabled}
    className={`
      relative inline-flex items-center h-8 w-16 rounded-full transition-all duration-300 ease-in-out
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${isToggled 
        ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg shadow-green-200' 
        : 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-200'
      }
      hover:${isToggled ? 'from-green-600 to-green-700' : 'from-red-600 to-red-700'}
      focus:outline-none focus:ring-2 focus:ring-offset-2 
      ${isToggled ? 'focus:ring-green-500' : 'focus:ring-red-500'}
    `}
  >
    {/* Toggle Slider */}
    <div
      className={`
        absolute top-0.5 left-0.5 h-7 w-7 bg-white rounded-full shadow-md
        transform transition-transform duration-300 ease-in-out
        flex items-center justify-center
        ${isToggled ? 'translate-x-8' : 'translate-x-0'}
      `}
    >
      {/* Icon */}
      {isToggled ? (
        <Check className="h-4 w-4 text-green-600" strokeWidth={3} />
      ) : (
        <X className="h-4 w-4 text-red-600" strokeWidth={3} />
      )}
    </div>
    
    {/* Background Icons (Optional - for extra visual appeal) */}
    <div className="absolute inset-0 flex items-center justify-between px-2">
      <Check 
        className={`h-4 w-4 text-white transition-opacity duration-200 ${
          isToggled ? 'opacity-100' : 'opacity-40'
        }`} 
        strokeWidth={2}
      />
      <X 
        className={`h-4 w-4 text-white transition-opacity duration-200 ${
          !isToggled ? 'opacity-100' : 'opacity-40'
        }`} 
        strokeWidth={2}
      />
    </div>
  </button>
  );
};

export default CustomToggle;