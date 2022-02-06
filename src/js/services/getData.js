async function getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Could not get ${url}, status ${response.status}`);
    }

    return await response.json();
}

export default getData;