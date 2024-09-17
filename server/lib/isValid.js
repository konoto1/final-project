export function isValidUsername(text) {
    const minLength = 3;
    const maxLength = 20;
    if (typeof text !== 'string') {
        return 'Slapyvardis turi buti tekstinis.';
    }
    if (text.length < minLength) {
        return `Slapyvardins turi buti min ${minLength} simboliu ilgio.`;
    }
    if (text.length > maxLength) {
        return `Slapyvardins turi buti max ${maxLength} simboliu ilgio.`;
    }
    return '';
}