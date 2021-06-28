import get from 'lodash/get';
import defaultTo from 'lodash/defaultTo';

// NOTE: bad implementation with bug
// const factory = utils => {
//   let output;
//   const proxyObj = new Proxy({}, {
//     get: function(target, prop) {
//       if (prop === 'chain') {
//         return value => {
//           output = value;
//           return proxyObj;
//         }
//       }
//       else if (prop === 'value') {
//         return () => output;
//       }
//       const method = get(utils, prop);
//       if (method) {
//         return (...rest) => {
//           console.log('method,output,rest:', method, output, rest);
//           output = method(output, ...rest);
//           return proxyObj;
//         }
//       }
//       return Reflect.get(...arguments);
//     }
//   });
//   return proxyObj;
// };

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

const _ = factory({ get, defaultTo });

const a = {
  b: {
    c: {
      d: '100',
      e: '200',
    }
  }
}

console.log(_.chain(a).get('b.c.x').value());
console.log(_.chain(a).get('b.c.x').defaultTo(_.chain({ x: { y: { z: 777 } } }).get('x.y.z2').defaultTo(99).value()).value());
console.log(_.chain(a).get('b.c.x').defaultTo(_.chain({ x: { y: { z: 777 } } }).get('x.y.z').defaultTo(99).value()).value());
