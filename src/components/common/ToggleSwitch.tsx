import React from 'react';

import './ToggleSwitch.scss';

interface Props {
    size?: string;
    checked: boolean;
    disabled?: boolean;
    onChange(value: boolean): void;
    offstyle?: string;
    onstyle?: string;
    className?: string;
    children?: React.ReactNode;
}

const ToggleSwitch = ({
    size = 'default',
    checked,
    disabled = false,
    onChange,
    offstyle = 'btn-danger',
    onstyle = 'btn-success',
    className,
    children,
}: Props) => {
    let displayStyle = checked ? onstyle : offstyle;
    return (
        <>
            <label className={`toggle-switch ${className}`}>
                <span className={`${size} switch-wrapper`}>
                    <input type='checkbox' checked={checked} disabled={disabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e?.target?.checked ?? false)} />
                    <span className={`${displayStyle} switch`}>
                        <span className='switch-handle' />
                    </span>
                </span>
                <span className={`switch-label ${checked ? 'checked' : ''}`}>{children}</span>
            </label>
        </>
    );
}

export default ToggleSwitch;
