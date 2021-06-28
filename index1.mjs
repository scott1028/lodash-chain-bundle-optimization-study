import _ from 'lodash';

const a = {
  b: {
    c: {
      d: '100',
    }
  }
}

console.log(_.chain(a).get('b.c.d').parseInt().value());
