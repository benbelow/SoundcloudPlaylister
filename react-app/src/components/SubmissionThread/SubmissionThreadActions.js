import _ from 'lodash';
import {containsUrl, extractUrls} from "../../helpers/UrlParser";
import {isSoundCloudUrl} from "../../soundcloud/UrlValidator";

export const UPDATE_SUBMISSIONS = 'UPDATE_SUBMISSIONS';

export function updateSubmissions(threadSubmissions) {
  return {
    type: UPDATE_SUBMISSIONS,
    threadSubmissions,
  }
}

export function fetchSubmissions(threadId, url) {
  return dispatch => {
    fetch(url + ".json?", { method: 'get', mode: 'cors' })
      .then(function(response) {
        return response.json();
      })
      .then(data => {
        return _.map(data[1].data.children, i => {
          return {
            comment: i.data.body,
            author: i.data.author,
          }
        });
      })
      .then(results => _.filter(results, r => containsUrl(r.comment)))
      .then(results => _.flatMap(results, r => extractUrls(r.comment)))
      .then(urls => _.filter(urls, u => isSoundCloudUrl(u)))
      .then(scUrls => dispatch(updateSubmissions({threadId: threadId, submissions: scUrls})))
  }
}