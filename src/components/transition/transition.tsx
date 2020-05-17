import React from 'react';
import {CSSTransition} from 'react-transition-group';
import {CSSTransitionProps} from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type transitionProps = CSSTransitionProps & {animation? : AnimationName};

const Transition: React.FC<transitionProps> = (props) => {
  const {classNames, children, animation, ...moreProps} = props;
  return (
    <CSSTransition className={classNames ? classNames: animation} {...moreProps}>
      {children}
    </CSSTransition>
  )
}

Transition.defaultProps = {
  animation: 'zoom-in-top'
}

export default Transition; 