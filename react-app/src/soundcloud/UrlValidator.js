import {extractUrls} from "../helpers/UrlParser";
import _ from "lodash";

export function containsSoundCloudUrl(comment) {
  return _.filter(extractUrls(comment), u => isSoundCloudUrl(u)).length > 0;
}

export function isSoundCloudUrl(url) {
  return url.includes("soundcloud.com")
}