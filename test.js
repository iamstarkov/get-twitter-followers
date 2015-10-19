import { equal } from 'assert';
import getTwitterFollowers from './index';
import getTwitterInfo from 'get-twitter-info';
import tokens from 'twitter-tokens';

it('should getTwitterFollowers', done => {
  getTwitterInfo(tokens, 'jsunderhood', (err, info) => {
    if (err) throw err;
    getTwitterFollowers(tokens, 'jsunderhood', (err, followers) => {
      if (err) throw err;
      console.log(followers.next_cursor_str);
      equal(followers.length, info.followers_count);
      done();
    });
  })
});
