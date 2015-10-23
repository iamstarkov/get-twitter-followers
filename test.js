import { equal } from 'assert';
import getTwitterFollowers from './index';
import getTwitterInfo from 'get-twitter-info';
import tokens from 'twitter-tokens';

it('should getTwitterFollowers', done => {
  getTwitterInfo(tokens, 'vjeux', (err, { followers_count } = info) => {
    if (err) throw err;
    getTwitterFollowers(tokens, 'vjeux', (err, followers) => {
      if (err) throw err;
      console.log(followers_count);
      equal(followers.length, followers_count);
      equal(typeof followers[0], 'object');
      done();
    });
  })
});
