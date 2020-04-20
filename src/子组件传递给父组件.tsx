import React, { FC, Fragment, useRef, MutableRefObject, forwardRef, ForwardRefExoticComponent, Ref, useImperativeHandle, ChangeEvent, SyntheticEvent, memo } from "react";
const Test: FC = (): JSX.Element => {
    const testRef: MutableRefObject<any> = useRef('test');
    const handleClick = (e:SyntheticEvent<HTMLButtonElement>):void =>{
        console.log('自身button的内容：',e.currentTarget.innerText);
        console.log('子组件input的对象:',testRef.current);
        console.log('子组件input的value值：',testRef.current.value);
        console.log('子组件input的类型：',testRef.current.type());
    }
    return (
        <Fragment>
            <TestChildForward ref={testRef} />
            <button onClick={handleClick}>获取子组件的input的value和type</button>
        </Fragment>
    );
}
export default Test;
function TestChild(props:{},ref: Ref<any>): JSX.Element {
    const testRef: MutableRefObject<any> = useRef();
    useImperativeHandle(ref,()=>{
        return {
            value:(testRef.current as HTMLInputElement).value,
            type:()=>(testRef.current as HTMLInputElement).type
        }
    });
    return (
        <>
            <input type="text" value={'input的内容'} ref={testRef} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                console.log(e.currentTarget.value);
                console.log(e.currentTarget.type);
            }}/>
        </>
    );
}
const TestChildForward:ForwardRefExoticComponent<any> = memo(forwardRef(TestChild));