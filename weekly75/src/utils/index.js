export function sum(a, b) {
  return a + b;
}

export function parseDoamin(url) {
  let domain = url.match(/https?:\/\/([^\/]+)\//i);
  if (domain) {
    if (domain[1]) {
      domain = domain[1];
    } else {
      domain = domain[0];
    }
  } else {
    domain = null;
  }
  return domain;
}
