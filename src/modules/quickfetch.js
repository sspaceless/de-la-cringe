async function quickGet(url, handleError) {
  if (typeof url === URL) {
    // eslint-disable-next-line no-param-reassign
    url = url.href;
  }

  try {
    const response = await fetch(url, { credentials: 'include', cache: 'default' });

    if (response.headers.get('Content-Type').startsWith('application/json')) {
      return await response.json();
    }

    return response.body;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`GET to ${url}: ${err}`);

    if (handleError) {
      handleError(err);
    }
    return undefined;
  }
}

async function quickPost(url, body, handleError) {
  if (typeof url === URL) {
    // eslint-disable-next-line no-param-reassign
    url = url.href;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'default'
      },
      body: JSON.stringify(body),
      credentials: 'include'
    });
    const json = await response.json();

    return json;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`GET to ${url}: ${err}`);

    if (handleError) {
      handleError(err);
    }
    return undefined;
  }
}

export { quickGet, quickPost };
