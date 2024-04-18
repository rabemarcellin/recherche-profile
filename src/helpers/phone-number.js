export const formatRenderedPhonenumber = (phoneNumber) => {
    const countryCode = phoneNumber.substring(0, 4); // +261
    const regionalCode = phoneNumber.substring(4, 6); // 32/3/4
    const firstPart = phoneNumber.substring(6, 8); // XX
    const secondPart = phoneNumber.substring(8, 11); // XXX
    const thirdPart = phoneNumber.substring(11); // XX

    // Concaténer les parties avec des espaces pour former le numéro formaté
    const formattedPhoneNumber = `${countryCode} ${regionalCode} ${firstPart} ${secondPart} ${thirdPart}`;

    return formattedPhoneNumber
}

export const phoneFormData = (stringPhoneNumber) => {
    const phoneNumber = stringPhoneNumber;

// Extracting parts of the phone number
const operatorSuffix = phoneNumber.slice(4, 6); // Extracts '32/33/34/38'
const firstTwo = phoneNumber.slice(6, 8); // Extracts two first number of the phone number
const middleThree = phoneNumber.slice(8, 11); // Extracts next three middle number of the phone number
const lastTwo = phoneNumber.slice(11); // Extracts two last number of the phone number

// Creating the object
const phoneNumberObject = {
    operatorSuffix: operatorSuffix,
    firstTwo: firstTwo,
    middleThree: middleThree,
    lastTwo: lastTwo
};

return phoneNumberObject;

}