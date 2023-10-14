function encrypt(step) {
    // filter out incorrect data
    if (step == 0) {
        alert("Brak wartości przeskoku!")
        return
    }


    let toEncrypt = document.getElementById("before-encryption").value.toLowerCase().split('')

    for (let i = 0; i < toEncrypt.length;) {
        // remove invalid chars
        if (!alphabet.includes(toEncrypt[i])) {
            console.log(toEncrypt.splice(i, 1))
            continue;
        }

        // get index
        let index = (alphabet.indexOf(toEncrypt[i]) + step) % alphabet.length
        if (index < 0) index += alphabet.length

        // encrypt
        toEncrypt[i] = alphabet[index]

        // goto next char
        i++
    }
    document.getElementById("after-encryption").value = toEncrypt.join('')
}

function getStep() {
    return parseInt(document.getElementById("step-setting").value)
}

const alphabet = "aąbcćdeęfghijklmnoópqrsśtuwvxyzźż";