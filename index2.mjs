import get from 'lodash/get';
import parseInt from 'lodash/parseInt';

const a = {
  b: {
    c: {
      d: '100',
    }
  }
}

console.log(parseInt(get(a, 'b.c.d')));
