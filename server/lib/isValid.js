export function isValidUsername(text) {
    const minLength = 3;
    const maxLength = 20;

    if (typeof text !== 'string') {
        return 'Slapyvardis turi buti tekstinis';
    }

    if (text.length < minLength) {
        return `Slapyvardis turi buti minimum ${minLength} simboliu ilgio`;
    }

    if (text.length > maxLength) {
        return `Slapyvardis turi buti maximum ${minLength} simboliu ilgio`;
    }

    return '';
}

export function isValidPassword(text) {
    const minLength = 12;
    const maxLength = 100;

    if (typeof text !== 'string') {
        return 'Slaptazodis turi buti tekstinis';
    }

    if (text.length < minLength) {
        return `Slaptazodis turi buti minimum ${minLength} simboliu ilgio`;
    }

    if (text.length > maxLength) {
        return `Slaptazodis turi buti maximum ${minLength} simboliu ilgio`;
    }

    return '';
}