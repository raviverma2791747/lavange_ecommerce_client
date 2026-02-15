'use client';
import { Minus, Plus } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/input"

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
        <div className="bg-white border border-gray-200 rounded-lg w-36 flex items-center">
            <div className="grow">
                <Input
                    disabled={disabled}
                    className="w-full text-center border-0 shadow-none focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                        if (onChange) onChange(temp_value);
                    }}
                />
            </div>
            <div
                className="flex items-center gap-x-1 pr-1"
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={disabled || (maxValue !== undefined && value === maxValue)}
                    onClick={() => {
                        if (maxValue !== undefined) {
                            const newValue = value < maxValue ? value + 1 : maxValue
                            setValue(newValue);
                            if (onIncrement) onIncrement(newValue);
                        } else {
                            setValue((prev) => prev + 1);
                            if (onIncrement) onIncrement(value + 1);
                        }

                    }}
                    type="button"
                >
                    <Plus size={16} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={disabled || (minValue !== undefined && value === minValue)}
                    onClick={() => {
                        if (minValue !== undefined) {
                            const newValue = value > minValue ? value - 1 : minValue
                            setValue(newValue);
                            if (onDecrement) onDecrement(newValue);
                        } else {
                            setValue((prev) => prev - 1);
                            if (onDecrement) onDecrement(value - 1);
                        }
                    }}
                    type="button"
                >
                    <Minus size={16} />
                </Button>
            </div>
        </div>
    )
}

export default Counter