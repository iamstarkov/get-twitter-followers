import test from 'tape';
import getTwitterFollowers from './index';
import getTwitterInfo from 'get-twitter-info';
import tokens from 'twitter-tokens';

test('getTwitterFollowers', { timeout: 30000 }, ({ equal, end } = t) => {
  getTwitterInfo(tokens, 'vjeux', (err, { followers_count } = info) => {
    if (err) done(new Error(err));
    getTwitterFollowers(tokens, 'vjeux', (err, followers) => {
      if (err) done(new Error(err));
      equal(followers.length, followers_count);
      equal(typeof followers[0], 'object');
      end();
    });
  });
});
