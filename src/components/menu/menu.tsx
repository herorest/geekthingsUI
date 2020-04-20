import React, {useState, createContext, FunctionComponentElement} from 'react';
import classNames from 'classnames';
import MenuItem, {MenuItemProps} from './menuItem';

type menuWay = 'horizontal' | 'vertical';
type onSelect = (selectedIndex: string) => void;

interface MenuProps {
    defaultIndex ?: string;
    className ?: string;
    way ?: menuWay;
    style ?: React.CSSProperties;
    onSelect ?: onSelect;
    children: React.ReactNode;
}

interface MenuContent {
    index : string;
    onSelect ?: onSelect;
    way ?: string
}

export const MenuContext = createContext<MenuContent>({index: '0'})

const Menu: React.FC<MenuProps> = (props) => {
    const {className, defaultIndex, way, style, onSelect, children} = props;
    const [currentIndex, setIndex] = useState(defaultIndex);
    const classes = classNames({
        'menu': true,
        [`menu-${way}`]: !!way,
        className: !!className
    });
    const context: MenuContent = {
        index: currentIndex ? currentIndex : '0',
        onSelect: (index: string) => {
            setIndex(index);
            if(onSelect){
                onSelect(index);
            }
        },
        way
    }
    const sublist = React.Children.map(children, (child, i) => {
        const ele = child as FunctionComponentElement<MenuItemProps>;
        if(ele.type.displayName === 'MenuItem' || ele.type.displayName === 'SubMenu'){
            return React.cloneElement(ele, {
                index: i + ''
            });
        }else{
            console.log('error, need menuitem');
        }
    });
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={context}>
                {sublist}
            </MenuContext.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    way: 'vertical',
    defaultIndex: '0'
}

// Menu.item = MenuItem;

console.log(Menu);

export default Menu;