function encrypt() {
    // filter out incorrect data
    if (!verifyKey()) {
        alert("Incorrect Key Value!")
        return
    }

    // prep vars
    let toEncrypt = document.getElementById("before-encryption").value.toLowerCase().split('')
    let encryptionKey = document.getElementById("key-setting").value

    // encrypt
    for (let i = 0; i < toEncrypt.length;) {
        // remove invalid chars
        if (!alphabet.includes(toEncrypt[i])) {
            console.log(toEncrypt.splice(i, 1))
            continue
        }

        // encrypt char
        let index = encryptionKey.indexOf(toEncrypt[i])
        let code = []
        code.push(Math.floor(index / 7) + 1)
        code.push((index % 7) + 1)

        // modify code at indexes with prime number (12 -> 21)
        if (isPrimeNumber(i + 1)) {
            code.push(code.shift())
        }

        // modify code at indexes divisible by DIVISOR by modifying them by a STEP
        if ((i + 1) % 7 == 0) code[0]++
        if ((i + 1) % 13 == 0) code[1]--

        // goto next char
        toEncrypt[i] = code.join('')
        i++
    }
    document.getElementById("after-encryption").value = toEncrypt.join('')
}

function decrypt() {
    // filter out incorrect data
    if (!verifyKey()) {
        alert("Incorrect Key Value!")
        return
    }

    // prep vars
    let toDecrypt = document.getElementById("before-encryption").value.split('')
    let encryptionKey = document.getElementById("key-setting").value

    // format toDecrypt
    for (let i = 0; i < toDecrypt.length;) {
        // remove invalid chars
        if (!cyphr.includes(toDecrypt[i])) {
            console.log(toDecrypt.splice(i, 1))
            continue
        }
        i++
    }
    for (let i = 0; i < toDecrypt.length; i++) {
        // pack the numbers together into arrays of two
        let arrayOfTwo = [toDecrypt[i], toDecrypt[i + 1]]
        toDecrypt[i] = arrayOfTwo
        toDecrypt.splice(i + 1, 1)
    }
    if (toDecrypt[toDecrypt.length - 1].length == 1 || toDecrypt[toDecrypt.length - 1][1] == undefined) toDecrypt.pop()

    // decrypt
    for (let i = 0; i < toDecrypt.length; i++) {
        // modify code at indexes divisible by DIVISOR by modifying them by a STEP
        if ((i + 1) % 7 == 0) toDecrypt[i][0]--
        if ((i + 1) % 13 == 0) toDecrypt[i][1]++

        // modify code at indexes with prime number (12 -> 21)
        if (isPrimeNumber(i + 1)) {
            toDecrypt[i].push(toDecrypt[i].shift())
        }

        // decrypt char
        let index = ((toDecrypt[i][0] - 1) * 7) + (toDecrypt[i][1] - 1)
        toDecrypt[i] = encryptionKey[index]
        if (toDecrypt[i] == undefined) toDecrypt[i] = "#"
    }

    document.getElementById("after-encryption").value = toDecrypt.join('')
}

function isPrimeNumber(num) {
    // Check if the number is less than 2 (which is not a prime number)
    if (num < 2) {
        return false;
    }

    // Check for factors from 2 to the square root of the number
    for (let i = 2; i <= Math.sqrt(num); i++) {
        // If the number is divisible by any other number, it's not a prime number
        if (num % i === 0) {
            return false;
        }
    }

    // If no factors are found, the number is a prime number
    return true;
}

function generateKey() {
    let randomKey = []
    let allChars = alphabet.split('')

    while (allChars.length != 0) {
        randomKey.push(allChars.splice(Math.floor(Math.random() * allChars.length), 1))
    }

    document.getElementById("key-setting").value = randomKey.join('')
}

function verifyKey() {
    let keyToVerify = document.getElementById("key-setting").value

    if (keyToVerify.length != alphabet.length) return false
    for (let i = 0; i < alphabet.length; i++) {
        if (!keyToVerify.includes(alphabet[i])) return false
    }

    return true
}

const alphabet = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż"
const cyphr = "012345678"

generateKey()