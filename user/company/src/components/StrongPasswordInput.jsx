import React, { useState } from 'react';
import TextInput from './TextInput'; // Assuming TextInput is a custom component
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';

const StrongPasswordInput = ({ isRegister, register, errors }) => {
  const [isPasswordHovered, setIsPasswordHovered] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return 'weak';
    } else if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}/.test(password)) {
      return 'strong';
    } else if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}/.test(password) || /(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}/.test(password) || /(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}/.test(password) || /(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{6,}/.test(password)) {
      return 'medium';
    } else {
      return 'weak';
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const strength = calculatePasswordStrength(newPassword);
    setPasswordStrength(strength);
    setIsPasswordValid(false);
  };

  return (
    <div className="max-w-sm">
      <div className="flex">
        <div className="relative flex-1">
          <TextInput
            name="password"
            label="Password"
            placeholder="Password"
            endContent={
              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? 'text' : 'password'}
            id="hs-strong-password-with-indicator-and-hint-in-popover"
            className="block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            onMouseEnter={() => setIsPasswordHovered(true)}
            onMouseLeave={() => setIsPasswordHovered(false)}
            onChange={handlePasswordChange}
            register={register('password', {
              required: 'Password is required!',
            })}
            error={errors.password ? errors.password.message : ''}
            required 
          />
          {isRegister && isPasswordHovered && password && (
            <div className="absolute z-10 w-full bg-white shadow-md rounded-lg p-4 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700">
              <h4 className="mt-3 text-sm font-semibold text-gray-800 dark:text-white">Password Strength:</h4>
              <ul className="space-y-1 text-sm text-gray-500 dark:text-neutral-500">
                <li
                  className={`hs-strong-password-active:text-teal-500 flex items-center gap-x-2 ${
                    password.length < 8 ? 'text-red-500' : 'text-green-500'
                  }`}
                  data-hs-strong-password-hints-rule-text="min-length"
                >
                  <span>{password.length < 8 ? '❌' : '✔'}</span>
                  <span>Minimum number of characters is 8.</span>
                </li>
                <li
                  className={`hs-strong-password-active:text-teal-500 flex items-center gap-x-2 ${
                    /(?=.*[a-z])(?=.*[A-Z])/.test(password) ? 'text-green-500' : 'text-red-500'
                  }`}
                  data-hs-strong-password-hints-rule-text="lowercase-uppercase"
                >
                  <span>{/(?=.*[a-z])(?=.*[A-Z])/.test(password) ? '✔' : '❌'}</span>
                  <span>Should contain both lowercase and uppercase letters.</span>
                </li>
                <li
                  className={`hs-strong-password-active:text-teal-500 flex items-center gap-x-2 ${
                    /(?=.*\d)/.test(password) ? 'text-green-500' : 'text-red-500'
                  }`}
                  data-hs-strong-password-hints-rule-text="numbers"
                >
                  <span>{/(?=.*\d)/.test(password) ? '✔' : '❌'}</span>
                  <span>Should contain at least one digit.</span>
                </li>
                <li
                  className={`hs-strong-password-active:text-teal-500 flex items-center gap-x-2 ${
                    /(?=.*[!@#$%^&*()_+}{"':;?/>.<,])/.test(password) ? 'text-green-500' : 'text-red-500'
                  }`}
                  data-hs-strong-password-hints-rule-text="special-characters"
                >
                  <span>{/(?=.*[!@#$%^&*()_+}{"':;?/>.<,])/.test(password) ? '✔' : '❌'}</span>
                  <span>Should contain at least one special character.</span>
                </li>
              </ul>
            </div>
          )}
          {isRegister && password && (
            <div className="mt-2 h-2 relative rounded-md overflow-hidden bg-gray-200">
              <div
                className={`absolute top-0 left-0 h-full ${
                  passwordStrength === 'weak'
                    ? 'bg-red-500'
                    : passwordStrength === 'medium'
                    ? 'bg-orange-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${passwordStrength === 'weak' ? 25 : passwordStrength === 'medium' ? 50 : 100}%` }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrongPasswordInput;
