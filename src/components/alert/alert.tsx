import React from 'react';
import classNames from 'classnames';
import Button from '../button/button'

export enum AlertType {
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning'
}

interface BaseAlertProps {
  className?: string;
  type?: AlertType | any;
  title?: string,
  content: string,
  showCloseBtn?: boolean,
  onClose?: Function
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { className, type, title, content, showCloseBtn } = props;
  const [show, setShow] = React.useState(false);

  const classes = classNames({
    'alert': true,
    [`alert-${type}`]: !!type,
    className: !!className,
    'show': show
  });

  const handleClick = () => {
    if (!show) {
      setShow(true);
    }
  };
  return (
    <div className={classes}>
      {
        showCloseBtn && <Button onClick={handleClick} className="close">关闭</Button>
      }
      <div className="title">{title}</div>
      <div className="content">{content}</div>
    </div>
  )
}

Alert.defaultProps = {
  type: AlertType.Default,
  showCloseBtn: true
}

export default Alert;