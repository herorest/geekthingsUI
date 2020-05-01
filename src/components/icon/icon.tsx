import React from 'react';
import classNames from 'classnames';
import {FontAwesomeIcon, FontAwesomeIconProps} from '@fortawesome/react-fontawesome';

export type themeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';

export interface IconProps extends FontAwesomeIconProps {
  theme? : themeProps,
}

const Icon: React.FC<IconProps> = (props) => {
  const {className, theme, icon, ...moreProps} = props;
  const classes = classNames('gk-icon', className, {
    [`icon-${theme}`]: theme
  });
  return (
    <FontAwesomeIcon className={classes} icon={icon} {...moreProps} />
  )
}

export default Icon; 