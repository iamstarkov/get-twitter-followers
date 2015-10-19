import Twitter from 'twit';
import { merge, isEmpty, concat, last } from 'ramda';

function accumulate(get, options, followers, cb) {
  console.log('accumulate');
  get(options, (err, { users, next_cursor_str: cursor } = res) => {
    console.log('get');
    if (err) return cb(err);
    console.log('users.length', users.length);
    if (cursor === '0') {
      return cb(null, followers);
    }
    var accumulatedFollowers = concat(followers, users);
    var nextOptions = merge(options, { cursor });
    console.log('accumulatedFollowers length', accumulatedFollowers.length);
    console.log('last accumulatedFollowers screen_name', last(accumulatedFollowers).screen_name);
    console.log('new cursor', cursor);
    console.log('nextOptions cursor', nextOptions.cursor);
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
