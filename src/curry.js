// 有限个数
const createCurry = function(func, args = []){
  let argLength = func.length;
  return function(){
    let _args = [].slice.call(arguments);
    if(args.length > 0){
      _args.push(args);
    }
    if(argLength > _args.length){
      return createCurry.call(this, func, _args);
    }else{
      return func.apply(this, _args);
    }
  }
}

// 无限个数
const unlimitCurry = function(){
  let _args = [].slice.call(arguments);

  function inside(){
    var _adder = function() {
        _args.push(...arguments);
        return _adder;
    };

    _adder.toString = function () {
        return _args.reduce(function (a, b) {
            return a + b;
        });
    }

    return _adder;
  }

  return inside(..._args);
}


const testCurry = function(){
  const regfunc = function(str, reg){
    return (str + '').match(reg);
  }
  const regcurry = createCurry(regfunc);
  const phoneReg = regcurry(/1(3|7|5|8)\d+/);
  phoneReg(13522334445);

  console.log(unlimitCurry(1)(3)(4));
}


export default {
  curry: testCurry
}