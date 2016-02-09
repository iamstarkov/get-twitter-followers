import test from 'tape';
import getTwitterFollowers from './index';
import getTwitterInfo from 'get-twitter-info';
import tokens from 'twitter-tokens';

test('getTwitterFollowers', { timeout: 30000 }, ({ equal, end }) => {
  getTwitterInfo(tokens, 'vjeux').then(({ followers_count }) => {
    getTwitterFollowers(tokens, 'vjeux').then(followers => {
      equal(followers.length, followers_count, 'should getTwitterFollowers exactly');
      equal(typeof followers[0], 'object', 'should getTwitterFollowers in `User Object` format');
      end();
    });
  });
});
