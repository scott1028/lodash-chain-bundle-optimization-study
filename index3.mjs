import get from 'lodash/get';
import parseInt from 'lodash/parseInt';

// NOTE: correct one
const factory = utils => ({
  chain: target => {
    let value = target;
    const proxyObj = new Proxy({}, {
      get: function(target, prop) {
        if (prop === 'value') {
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
  }
});

const _ = factory({ get, parseInt });

const a = {
  b: {
    c: {
      d: '100',
      e: '200',
    }
  }
}

console.log(_.chain(a).get('b.c.d').parseInt().value());
console.log(_.chain(a).get('b.c').value());
console.log(_.chain(a).get('b').value());
console.log(_.chain(a).get('b.c.e').parseInt().value());
