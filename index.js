import Twitter from 'twit';
import { merge, isEmpty, concat, last } from 'ramda';
import { map, splitEvery, join } from 'ramda';

const splitByHundreds = splitEvery(100);
const mapRetrieveUserObject = map(retrieveUserObjects);
const joinWithComma = join(',');

function lookupUserObjects(ids) {
  const client = new Twitter(tokens);
  const post = client.post.bind(client, 'users/lookup');
  const options = { user_id: joinWithComma(ids), include_entities: false };
  return post(options, (err, users) => {
    if (err) return cb(err);
    // TODO: implement with Promises and ramda.composeP
    resolve(users);
  });
}

function retrieveUserObjects(ids) {
  var splittedIds = splitByHundreds(ids);
  return splittedIds.map(lookupUserObjects);
}

function accumulate(get, options, followers, cb) {
  get(options, (err, { ids, next_cursor_str: cursor } = res) => {
    if (err) return cb(err);
    var accumulatedFollowers = concat(followers, ids);
    if (cursor === '0') {
      return cb(null, accumulatedFollowers);
    }
    return accumulate(get, merge(options, { cursor }), accumulatedFollowers, cb);
  });
}

export default function getTwitterFollowers(tokens, username, cb) {
  const client = new Twitter(tokens);
  const get = client.get.bind(client, 'followers/ids');
  const options = { screen_name: username, stringify_ids: true, count: 5000 };
  return accumulate(get, options, [], cb);
};
