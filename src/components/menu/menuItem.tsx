import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSelect?: (selectedIndex: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { className, index, disabled, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames({
    'menu-item': true,
    'disabled': disabled,
    'active': context.index === index,
    className: !!className
  });
  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index || '0');
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>{children}</li>
  )
}

MenuItem.defaultProps = {
  index: '-1'
}

MenuItem.displayName = 'MenuItem';

export default MenuItem;