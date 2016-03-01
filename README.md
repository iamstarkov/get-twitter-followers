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

getTwitterFollowers(tokens, 'jsunderhood').then(followers => {
  console.log(followers); // "User Objects" array https://dev.twitter.com/overview/api/users
});
```

## API

### getTwitterFollowers(tokens, username)

Return a promise that resolves to followers.

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

## Related

* [get-tweets][get-tweets] — get latest tweets
* [get-twitter-info][get-twitter-info] — get info about target username
* [tweet-links][tweet-links] — extract links from tweet
* [tweets-stats][tweets-stats] — get statistics from array of tweets
* [twitter-mentions][twitter-mentions] — get latest mentions for target username
* [twitter-profile-media][twitter-profile-media] — get twitter profile image and banner
* [twitter-tokens][twitter-tokens] — get twitter tokens

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

[get-tweets]: https://github.com/iamstarkov/get-tweets
[get-twitter-info]: https://github.com/iamstarkov/get-twitter-info
[tweet-links]: https://github.com/iamstarkov/tweet-links
[tweets-stats]: https://github.com/iamstarkov/tweets-stats
[twitter-mentions]: https://github.com/iamstarkov/twitter-mentions
[twitter-profile-media]: https://github.com/andrepolischuk/twitter-profile-media
[twitter-tokens]: https://github.com/iamstarkov/twitter-tokens
