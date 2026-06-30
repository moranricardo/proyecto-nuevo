export function cleanGerritResponse(responseText) {
    if (responseText.startsWith(")]}'")) {
        return responseText.substring(4);
    }
    return responseText;
}

