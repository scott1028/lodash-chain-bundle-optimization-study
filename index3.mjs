import get from 'lodash/get';
import parseInt from 'lodash/parseInt';

const factory = utils => {
  let value;
  var proxyObj = new Proxy({}, {
    get: function(target, prop) {
      if (prop === 'chain') {
        return v => {
            value = v;
            return proxyObj;
        }
      }
      else if (prop === 'value') {
        return () => value;
      }
      const method = get(utils, prop);
      if (method) {
        return (...rest) => {
          value = method(value, ...rest);
          return proxyObj;
        }
      }
      return Reflect.get(...arguments);
    }
  });
  return proxyObj;
};

const _ = factory({ get, parseInt });

const a = {
  b: {
    c: {
      d: '100',
    }
  }
}

console.log(_.chain(a).get('b.c.d').parseInt().value());
