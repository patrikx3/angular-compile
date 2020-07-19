export * from './log';

export function decodeEntities(encodedString: string) {
    var div = document.createElement('div');
    div.innerHTML = encodedString;
    return div.textContent;
}
