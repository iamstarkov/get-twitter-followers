import { equal } from 'assert';
import getTwitterFollowers from './index';
import getTwitterInfo from 'get-twitter-info';
import tokens from 'twitter-tokens';

it('should getTwitterFollowers', done => {
  getTwitterInfo(tokens, 'jsunderhood', (err, info) => {
    if (err) throw err;
    console.log(info.followers_count)
    getTwitterFollowers(tokens, 'largescalejs_ru', (err, followers) => {
      if (err) throw err;
      equal(followers.length, info.followers_count);
      done();
    });

  })
});
