# get-twitter-followers

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> get followers for target username

## Install

    npm install --save get-twitter-followers

## Usage

```js
import getTwitterFollowers from 'get-twitter-followers';

getTwitterFollowers(tokens, 'jsunderhood', (err, followers) => {
  if (err) throw err;
  console.log(followers);
});
```

**Limitation:** as far as Twitter API allow you only [15 requests per 15 minute
window][rates-limit] for this [endpoint][endpoint], then this module
will allow you to grab [3000 (15*200)][calc] followers with information about
them before you will face `Rate limit exceeded` error.

[calc]: https://www.google.com/search?q=180*200%3D&ie=utf-8&oe=utf-8&gws_rd=cr&ei=FwIlVpzbE8aCygP9roioCg
[rates-limit]: https://dev.twitter.com/rest/public/rate-limits
[endpoint]: https://dev.twitter.com/rest/reference/get/followers/list

## API

### getTwitterFollowers(tokens, username, cb)

#### tokens

*Required*  
Type: `Object`

Valid [Twitter developer credentials (tokens)][how-to-get]
in the form of a set of consumer and access tokens/keys.
You can use [twitter-tokens][tokens], to simplify getting tokens.

[how-to-get]: https://iamstarkov.com/get-twitter-tokens/
[tokens]: https://www.npmjs.com/package/twitter-tokens

#### username

*Required*  
Type: `String`

Twitter username.

#### cb(err, info)

*Required*  
Type: `Function`

Callback for you.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/get-twitter-followers
[npm-image]: https://img.shields.io/npm/v/get-twitter-followers.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/get-twitter-followers
[travis-image]: https://img.shields.io/travis/iamstarkov/get-twitter-followers.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/get-twitter-followers
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/get-twitter-followers.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/get-twitter-followers
[depstat-image]: https://david-dm.org/iamstarkov/get-twitter-followers.svg?style=flat-square
