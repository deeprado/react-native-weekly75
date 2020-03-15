import {API_ADDRESS} from '../config';

function fetchAction(url, options) {
  return fetch(url, Object.assign({}, options)).then(response =>
    response.json(),
  );
}

export default {
  getNewest() {
    return fetchAction(`${API_ADDRESS}/issue/latest`, {
      method: 'get',
    });
  },
  getDetail(iid) {
    return fetchAction(`${API_ADDRESS}/issue/detail`, {
      method: 'get',
      data: {
        iid,
      },
    });
  },
  getList(page) {
    return fetchAction(`${API_ADDRESS}/issue/list`, {
      method: 'get',
      data: {
        page,
      },
    });
  },
  getSearch(keywords, page) {
    return fetchAction(`${API_ADDRESS}/article/search`, {
      method: 'get',
      data: {
        keywords: encodeURIComponent(keywords),
        page,
      },
    });
  },
  postAdd(data) {
    return fetchAction(`${API_ADDRESS}/article/admin`, {
      method: 'post',
      body: data,
    });
  },
  getTitle(url) {
    return fetchAction(`${API_ADDRESS}/article/title`, {
      method: 'get',
      data: {
        url: encodeURIComponent(url),
      },
    });
  },
};
