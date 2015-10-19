import Twitter from 'twit';
import { merge, isEmpty, concat } from 'ramda';

function accumulate(get, options, followers, cb) {
  console.log('accumulate');
  get(options, (err, { users, next_cursor_str }=res) => {
    console.log('get');
    if (err) return cb(err);

    if (next_cursor_str === '0') {
      return cb(null, followers);
    }

    const accumulatedFollowers = concat(followers, users);
    const nextOptions = merge({ cursor: next_cursor_str }, options);
    console.log(nextOptions);
    return accumulate(get, nextOptions, accumulatedFollowers, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  console.log('getTwitterFollowers');
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/list');
  const options = { screen_name: username, count: 200 };
  return accumulate(get, options, [], cb);
};
