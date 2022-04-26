async function quickGet(url, handleError) {
  try {
    const response = await fetch(url, { credentials: 'include' });
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

async function quickPost(url, body, handleError) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
