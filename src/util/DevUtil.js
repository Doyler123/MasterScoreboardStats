export const getQueryParam = (param) => {
    let searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(param);
}