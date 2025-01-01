'use client';
import { Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

interface ICounterProps {
    value?: number
    disabled?: boolean
    minValue?: number
    maxValue?: number
    onChange?: (val: number) => void
    onIncrement?: (val: number) => void
    onDecrement?: (val: number) => void
}

const Counter: React.FC<ICounterProps> = ({ value: val = 1, disabled = false, minValue, maxValue, onChange, onIncrement, onDecrement }) => {
    const [value, setValue] = React.useState(val);
    return (
        <div className="bg-white border border-gray-200 rounded-lg w-36">
            <div className="w-full flex justify-between items-center gap-x-1">
                <div className="grow py-2 px-3">
                    <input
                        disabled={disabled}
                        className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        type="number"
                        min={minValue}
                        max={maxValue}
                        value={value}
                        onChange={(e) => {
                            let temp_value = parseInt(e.target.value);
                            if (minValue !== undefined && isNaN(temp_value)) temp_value = minValue;
                            if (minValue !== undefined && temp_value < minValue) {
                                temp_value = minValue;
                            }
                            if (maxValue !== undefined && temp_value > maxValue) {
                                temp_value = maxValue;
                            }
                            setValue(temp_value);
                            if(onChange) onChange(temp_value);
                        }}
                    />
                </div>
                <div
                    className="flex items-center -gap-y-px divide-x divide-gray-200 border-s border-gray-200"
                >
                    <button
                        disabled={disabled || value === maxValue}
                        onClick={() => {
                            if (maxValue !== undefined) {
                                setValue((prev) => (value < maxValue ? prev + 1 : maxValue));
                                if(onIncrement) onIncrement(value < maxValue ? value + 1 : maxValue);
                            } else {
                                setValue((prev) => prev + 1);
                                if(onIncrement) onIncrement(value + 1);
                            }

                        }}
                        type="button"
                        className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Plus size={16} />
                    </button>

                    <button
                        disabled={disabled || value === minValue}
                        onClick={() => {
                            if (minValue !== undefined) {
                                setValue((prev) => (value > minValue ? prev - 1 : minValue));
                                if(onDecrement) onDecrement(value > minValue ? value - 1 : minValue);
                            } else {
                                setValue((prev) => prev - 1);
                                if(onDecrement) onDecrement(value - 1);
                            }
                        }}
                        type="button"
                        className="w-10 h-10 inline-flex justify-center items-center gap-x-2 text-sm font-medium last:rounded-e-lg bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        <Minus size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Counter