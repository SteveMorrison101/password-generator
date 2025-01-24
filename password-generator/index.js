#!/usr/bin/env node

let length = 8;
let includeUppercase = false;
let showHelp = false;

// Function to print help instructions
function printHelp() {
    console.log(`
Usage: password-generator [options]

Options:
  --help            Show this help message
  --length <num>    Specify the password length (default is 8)
  --uppercase       Include uppercase letters in the password

Examples:
  password-generator --length 12
  password-generator --uppercase
  password-generator --length 12 --uppercase
  password-generator --help
  `);
}

// Parse command-line arguments
const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
    const argument = args[i];

    switch (argument) {
        case '--help':
            showHelp = true;
            break;

        case '--length': {
            const nextValue = args[i + 1];
            if (nextValue && !isNaN(nextValue)) {
                length = parseInt(nextValue, 10);
                i++;
            } else {
                console.error('Error: --length flag requires a valid number.');
                process.exit(1);
            }
            break;
        }

        case '--uppercase':
            includeUppercase = true;
            break;

        default:
            if (argument.startsWith('--')) {
                console.error(`Error: Unknown flag "${argument}".`);
                process.exit(1);
            }
            break;
    }
}

if (showHelp) {
    printHelp();
    process.exit(0);
}

// Ensure the length is valid
if (length <= 0) {
    console.error('Error: Password length must be a positive number.');
    process.exit(1);
}

// Function to generate a password
function generatePassword(length, includeUppercase) {
    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let validCharacters = lowercaseCharacters;
    if (includeUppercase) {
        validCharacters += uppercaseCharacters;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * validCharacters.length);
        password += validCharacters.charAt(randomIndex);
    }
    return password;
}

// Generate and display the password
const password = generatePassword(length, includeUppercase);
console.log(`Password: ${password}`);






