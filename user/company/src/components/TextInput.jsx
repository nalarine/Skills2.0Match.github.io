import React from 'react';
import { Input } from '@nextui-org/react';

const placements = ["outside"];

const TextInput = React.forwardRef(
  ({ type, label, register, name, error, required, ...rest }, ref) => {
    return (
      <div className='flex flex-col mt-2'>
        {placements.map((placement) => (
          <div key={placement} className={`${placement === 'outside' ? 'w-40%' : 'w-full'}`}>
            <p className='text-gray-600 text-sm mb-1'>{label} {required && <span className="text-red-500">*</span>}</p>
            <Input
              type={type}
              name={name}
              labelPlacement={placement}
              ref={ref}
              {...register}
              aria-invalid={error ? "true" : "false"}
              {...rest}
              style={{
                ...rest.style,
                borderRadius: '0.375rem',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
                ':focus': {
                  borderColor: '#22C55E',
                  boxShadow: '0 0 0 0.2rem rgba(66,153,225,.5)',
                },
              }}
            />
            {error && <span className="text-xs text-red-500 mt-0.5">{error}</span>}
          </div>
        ))}
      </div>
    );
  }
);

export default TextInput;
