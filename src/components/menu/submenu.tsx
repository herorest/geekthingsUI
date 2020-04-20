import React, {useContext, FunctionComponentElement, useState} from 'react';
import classNames from 'classnames';
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'

interface SubMenuProps {
    index ?: string;
    className ?: string;
    title: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
    const {className, index, title, children} = props;
    const context = useContext(MenuContext);
    const isActive = () => {
        if(context.index === index){
          return true;
        }
        if(typeof index !== 'undefined'){
          const indexlist = context.index.split('-');
          if(indexlist.length > 0 && indexlist[0] === index){
            return true;
          }
        }
        
        return false;
      }
    const classes = classNames({
        'menu-item': true,
        'has-submenu': true,
        'active': isActive(),
        className: !!className
    });
    const [open, setOpen] = useState(context.index === index);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(!open);
    }

    let timer: any;

    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 100)
    }

    const mouseAction = context.way === 'vertical' ? {} : {
        onMouseEnter: (e: React.MouseEvent) => {handleMouse(e, true)},
        onMouseLeave: (e: React.MouseEvent) => {handleMouse(e, false)}
    }

    const handleClickMenu = (e: React.MouseEvent) => {
        if (context.onSelect && !open) {
            context.onSelect(index || '0');
        }
    }

    const sublist = () => {
        const classes = classNames('submenu', {
            'opened' : open
        });
        const list = React.Children.map(children, (child, i) => {
            const ele = child as FunctionComponentElement<MenuItemProps>;
            if(ele.type.displayName === 'MenuItem'){
                return React.cloneElement(ele, {
                    index: `${index}-${i}`
                });
            }else{
                console.log('error, need menuitem');
            }
        });

        return <ul className={classes}>{list}</ul>
    }

    return (
        <li key={index} className={classes} onClick={handleClickMenu}>
            <div className="sub-title" onClick={handleClick} {...mouseAction}>
                {title}
            </div>
            {sublist()}
        </li>
    )
}

// Menu.item = MenuItem;

SubMenu.displayName = 'SubMenu';

export default SubMenu;