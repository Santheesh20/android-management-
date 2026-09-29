const crypto = require('crypto');

const TEMPORARY_PASSWORD_LENGTH = 16;

const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBER_CHARACTERS = '0123456789';
const SPECIAL_CHARACTERS = '@#$%&*!';

const ALL_CHARACTERS =
    LOWERCASE_CHARACTERS +
    UPPERCASE_CHARACTERS +
    NUMBER_CHARACTERS +
    SPECIAL_CHARACTERS;

function getRandomCharacter(characters) {
    const randomIndex = crypto.randomInt(
        0,
        characters.length
    );

    return characters[randomIndex];
}

function shuffleCharacters(characters) {
    const characterArray = characters.split('');

    for (
        let currentIndex = characterArray.length - 1;
        currentIndex > 0;
        currentIndex--
    ) {
        const randomIndex = crypto.randomInt(
            0,
            currentIndex + 1
        );

        const temporaryCharacter =
            characterArray[currentIndex];

        characterArray[currentIndex] =
            characterArray[randomIndex];

        characterArray[randomIndex] =
            temporaryCharacter;
    }

    return characterArray.join('');
}

function generateTemporaryPassword() {
    const characters = [
        getRandomCharacter(LOWERCASE_CHARACTERS),
        getRandomCharacter(UPPERCASE_CHARACTERS),
        getRandomCharacter(NUMBER_CHARACTERS),
        getRandomCharacter(SPECIAL_CHARACTERS)
    ];

    while (
        characters.length <
        TEMPORARY_PASSWORD_LENGTH
    ) {
        characters.push(
            getRandomCharacter(ALL_CHARACTERS)
        );
    }

    return shuffleCharacters(characters.join(''));
}

module.exports = {
    TEMPORARY_PASSWORD_LENGTH,
    generateTemporaryPassword
};
