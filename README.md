# Lodash chain issue

- Ref: https://medium.com/bootstart/why-using-chain-is-a-mistake-9bc1f80d51ba
- Ref: https://nolanlawson.com/2018/03/20/smaller-lodash-bundles-with-webpack-and-babel/

```
import _ from "lodash"; // Import everything. It causes a large output.
```

#### Quick generate report

```
yarn test
```
