import Twitter from 'twit';
import { merge, flatten, concat, splitEvery, join, map, pipe } from 'ramda';

function usersLookupPromise(client, ids) {
  const options = { user_id: join(',', ids), include_entities: false };
  return client.post('users/lookup', options).then(({ data }) => data);
}

function ids2userObjects(client, ids) {
  const userLookupPromises = pipe(splitEvery(100), map(usersLookupPromise.bind(null, client)));
  const handler = (...userObjects) => flatten(userObjects);
  return Promise.all(userLookupPromises(ids)).then(handler);
}

function accumulate(client, options, followersIds) {
  return client.get('followers/ids', options).then(({ data: { ids, next_cursor_str: cursor } }) => {
    const accumulatedFollowersIds = concat(followersIds, ids);
    if (cursor === '0') {
      return ids2userObjects(client, accumulatedFollowersIds);
    }
    return accumulate(client, merge(options, { cursor }), accumulatedFollowersIds);
  });
}

export default function getTwitterFollowers(tokens, username) {
  const client = new Twitter(tokens);
  const options = { screen_name: username, stringify_ids: true, count: 5000 };
  return accumulate(client, options, []);
}
