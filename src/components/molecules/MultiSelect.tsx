import { useEffect, useRef, useState } from "react";
import { X, ChevronDown } from "lucide-react";

interface Option {
    label: string;
    value: string;
}

interface MultiSelectProps {
    options: Option[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    disabled?: boolean;
}

const MultiSelect = ({ options, value, onChange, placeholder, disabled }: MultiSelectProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleValue = (val: string) => {
        if (value.includes(val)) {
            onChange(value.filter((v) => v !== val));
        } else {
            onChange([...value, val]);
        }
    };

    const removeValue = (val: string) => {
        onChange(value.filter((v) => v !== val));
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((o) => !o)}
                className="w-full min-h-9 flex items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm disabled:opacity-50"
            >
                <div className="flex flex-wrap gap-1 flex-1">
                    {value.length === 0 && (
                        <span className="text-muted-foreground">{placeholder ?? "Select..."}</span>
                    )}
                    {value.map((val) => {
                        const opt = options.find((o) => o.value === val);
                        return (
                            <span
                                key={val}
                                className="flex items-center gap-1 bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded"
                            >
                                {opt?.label ?? val}
                                <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeValue(val);
                                    }}
                                />
                            </span>
                        );
                    })}
                </div>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
            </button>

            {open && (
                <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-md border bg-popover shadow-md">
                    {options.length === 0 && (
                        <p className="px-3 py-2 text-sm text-muted-foreground">No options</p>
                    )}
                    {options.map((opt) => (
                        <label
                            key={opt.value}
                            className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-muted"
                        >
                            <input
                                type="checkbox"
                                checked={value.includes(opt.value)}
                                onChange={() => toggleValue(opt.value)}
                                className="cursor-pointer"
                            />
                            {opt.label}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
