import React from 'react';
import classNames from 'classnames';

export enum ButtonSize {
    Large = 'large',
    Small = 'small'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Link = 'link'
}

interface BaseButtonProps {
    className ?: string;
    disabled ?: boolean;
    size ?: ButtonSize | any;
    type ?: ButtonType | any;
    danger ?: boolean;
    children: React.ReactNode;
    href ?: string;
    dashed ?: boolean;
}

export type buttonProps = Partial<BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLElement>>

const Button: React.FC<buttonProps> = (props) => {
    const {className, disabled, size, type, children, danger, dashed, href, ...other} = props;
    const classes = classNames(className, {
        'btn': true,
        [`btn-${type}`]: !!type,
        [`btn-${size}`]: !!size,
        'disabled': (type === ButtonType.Link) && disabled,
        'danger': !!danger,
        'dashed': !!dashed
    });
    if(type === ButtonType.Link && href){
        return (
            <a className={classes} href={href} {...other}>{children}</a>
        )
    }else{
        return (
            <button className={classes} disabled={disabled} {...other}>{children}</button>
        )
    }
}

Button.defaultProps = {
    disabled: false,
    type: ButtonType.Default
}

export default Button;