const channelNames = require('./defaultChannels');

const CLIENT_ID = 'c8a3wkkb56yqjhlcui7tcfyjvs65dy6';
const ROOT_URL = 'https://api.twitch.tv/kraken/';

function fetchUrl(url) {
  return fetch(url, {
    headers: {
      'Accept': 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID
    }
  })
  .then(res => res.json())
}

function getUserIds(names) {
  const url = ROOT_URL + `users?login=${names.join()}`;

  return fetchUrl(url)
  .then(json => fillEmptyChannels(names, json))
}

function getStreamInfo(id) {
  const url = ROOT_URL + `streams/${id}`;
  return fetchUrl(url);
}

function fillEmptyChannels(names, response) {
  const channelList = [...names];
  const channels = [];

  channels.push(...response.users);

  channels.forEach(ch => {
    const ind = channelList.indexOf(ch.name);
    channelList.splice(ind, 1);
  });

  if (channelList.length) {
    channelList.forEach(name => {
      channels.push({
        name,
        _id: null
      })
    })
  }

  return channels;
}

module.exports = {
  fillEmptyChannels,
  getUserIds,
  getStreamInfo
}
