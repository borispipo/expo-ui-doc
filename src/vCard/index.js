/********************************************************************************
    vCards-js, Eric J Nesser, November 2014
********************************************************************************/
/*jslint node: true */
'use strict';
import DateLib from "$lib/date";
import {isPlainObject} from "$cutils/extendObj";
import isNonNullString from "$cutils/isNonNullString";

let majorVersion = '3';

/**
     * Encode string
     * @param  {String}     value to encode
     * @return {String}     encoded string
     */
export function encodeValue (value) {
    if (value && typeof value !=='undefined') {
        if (typeof(value) !== 'string') {
            value = '' + value;
        }
        return value.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    }
    return '';
}


/**
 * Return new line characters
 * @return {String} new line characters
 */
export function newLIne() {
    return '\r\n';
}

/**
     * Get formatted photo
     * @param  {String} photoType       Photo type (PHOTO, LOGO)
     * @param  {String} url             URL to attach photo from
     * @param  {String} mediaType       Media-type of photo (JPEG, PNG, GIF)
     * @return {String}                 Formatted photo
     */
export function getFormattedPhoto(photoType, url, mediaType, base64) {

    let params;

    if (majorVersion >= 4) {
        params = base64 ? ';ENCODING=b;MEDIATYPE=image/' : ';MEDIATYPE=image/';
    } else if (majorVersion === 3) {
        params = base64 ? ';ENCODING=b;TYPE=' : ';TYPE=';
    } else {
        params = base64 ? ';ENCODING=BASE64;' : ';';
    }

    let formattedPhoto = photoType + params + mediaType + ':' + encodeValue(url) + newLIne();
    return formattedPhoto;
}

/**
     * Get formatted address
     * @param  {object}         address
     * @param  {object}         encoding prefix
     * @return {String}         Formatted address
     */
export function getFormattedAddress(encodingPrefix, address) {
    if(!isPlainObject(address) || !isPlainObject(address?.details)) return "";
    let formattedAddress = '';

    if (address.details.label ||
        address.details.street ||
        address.details.city ||
        address.details.stateProvince ||
        address.details.postalCode ||
        address.details.countryRegion) {

        if (majorVersion >= 4) {
            formattedAddress = 'ADR' + encodingPrefix + ';TYPE=' + address.type +
                (address.details.label ? ';LABEL="' + encodeValue(address.details.label) + '"' : '') + ':;;' +
                encodeValue(address.details.street) + ';' +
                encodeValue(address.details.city) + ';' +
                encodeValue(address.details.stateProvince) + ';' +
                encodeValue(address.details.postalCode) + ';' +
                encodeValue(address.details.countryRegion) + newLIne();
        } else {
            if (address.details.label) {
                formattedAddress = 'LABEL' + encodingPrefix + ';TYPE=' + address.type + ':' + encodeValue(address.details.label) + newLIne();
            }
            formattedAddress += 'ADR' + encodingPrefix + ';TYPE=' + address.type + ':;;' +
                encodeValue(address.details.street) + ';' +
                encodeValue(address.details.city) + ';' +
                encodeValue(address.details.stateProvince) + ';' +
                encodeValue(address.details.postalCode) + ';' +
                encodeValue(address.details.countryRegion) + newLIne();

        }
    }

    return formattedAddress;
}

export const fieldWidth = 180;

export const fields = {
    version : {
        type : "select",
        label : "Version",
        items : [2,3,4],
        itemValue : ({item,index})=>item,
        renderItem : ({item,index})=>item,
        renderText : ({item,index})=> `Version ${item}`,
        defaultValue : 3,
        multiple : false,
        required : true,
        width : fieldWidth,
    },
    firstName : {
        type : "text",
        label : "First Name",
        width : fieldWidth,
    },
    middleName : {
        type : "text",
        label : "Middle name",
        width : fieldWidth,
    },
    lastName : {
        type : "text",
        label : "Last name",
        width : fieldWidth,
    },
    namePrefix : {
        type : "text",
        label : "Name prefix",
        width : fieldWidth,
    },
    nameSuffix : {
        type :"text",
        label : "Name suffix",
        width : fieldWidth,
    },
    nickname : {
        type : "text",
        label : "Nickname",
        width : fieldWidth,
    },
    gender : {
        type : "text",
        label : "Gender",
        width : fieldWidth,
    },
    birthday : {
        type : "date",
        label : "Birthday",
        width : fieldWidth,
    },
    anniversary : {
        type : "date",
        label : "Aniversary",
        width : fieldWidth,
    },
    email : {
        type : "email",
        label : "Email",
        width : fieldWidth,
    },
    workEmail : {
        type : "email",
        label : "Work Email",
        width : fieldWidth,
    },
    /*logo : {
        url  : {},
    },
    photo : {
        url : {},
    },*/
    cellPhone : {
        type :"tel",
        label : "Cell Phone",
        width : fieldWidth,
    },
    homePhone : {
        type : "tel",
        label : "Home phone",
        width : fieldWidth,
    },
    workPhone : {
        type : "tel",
        label : "Work phone",
        width : fieldWidth,
    },
    pagerPhone : {
        type : "tel",
        label : "Pager phone",
        width : fieldWidth,
    },
    homeFax : {
        type : "text",
        label : "Home fax",
        width : fieldWidth,
    },
    workFax : {
        type : "text",
        label : "Work fax",
        width : fieldWidth,
    },
    homeAddress : {
        type : "text",
        label : "Home Address",
        width : fieldWidth,
    },
    workAddress : {
        type : "text",
        label : "Work Address",
        width : fieldWidth,
    },
    title : {
        type : "text",
        label : "Title",
        width : fieldWidth,
    },
    role : {
        type : "text",
        label : "Role/Position",
        width : fieldWidth,
    },
    organization : {
        type : "text",
        label : "Organisation/Company",
        width : fieldWidth,
    },
    url : {
        type : "text",
        validType : "url",
        label : "Contact Url",
        width : fieldWidth,
    },
    workUrl : {
        type : "text",
        validType : "url",
        label : "Work Url",
        width : fieldWidth,
    },
    note : {
        type : "text",
        validType : "url",
        label : "Note",
        width : fieldWidth,
    },
}

/**
 * Get formatted vCard in VCF format
 * @param  {object}     vCard object
        vCard object : {
            firstName : {string}, firstName,
            middleName : {string}, MiddleName,
            lastName : {string}, LastName,
            namePrefix : {string}, le Préfixe de nom
            nameSuffix : {string}, le suffix de nom
            nickname : {string},
            gender : {string}, le genre
            birthday : {date}, date de naissance
            anniversary : {date}, date d'aniversaire
            email : {string|email}
            workEmail : {string|email}, email pro
            logo : {
                url {string}, url du logo
            },
            photo : {
                url : {string}, url de la photo
            },
            cellPhone : {string|tel} : téléphone,
            pagerPhone : {string},
            homePhone : {string|tel}, domicile
            workPhone : {string|tel}, tel pro,
            homeFax : {string}, Fax : domicile,
            workFax : {string}, Fax : bureau,
            homeAddress : {string}, Adrese domicile,
            workAddress : {string}, Adresse bureau,
            title : {string}, Titre,
            role : {string}, Rôle ou position,
            organization : {string}, Organisation/Société,
            url : {string} : Lien du contact,
            workUrl : {string}, Url professionnel,
            note : {string}, Notes complémentaire
        }
 
 * @return {String}     Formatted vCard in VCF format
 */
export default function format(vCard) {
    if(!isPlainObject(vCard)) return "";
    majorVersion = typeof vCard.version =="number" && vCard.version || 3;
    
    let formattedVCardString = '';
    formattedVCardString += 'BEGIN:VCARD' + newLIne();
    formattedVCardString += 'VERSION:' + vCard.version + newLIne();

    let encodingPrefix = majorVersion >= 4 ? '' : ';CHARSET=UTF-8';
    let formattedName = vCard.formattedName;

    if (!isNonNullString(formattedName)) {
        formattedName = '';
        [vCard.firstName, vCard.middleName, vCard.lastName].map(function(name) {
            if (isNonNullString(name)) {
                if (formattedName) {
                    formattedName += ' ';
                }
                formattedName += name;
            }
        });
    }

    formattedVCardString += 'FN' + encodingPrefix + ':' + encodeValue(formattedName) + newLIne();
    formattedVCardString += 'N' + encodingPrefix + ':' +
        encodeValue(vCard.lastName) + ';' +
        encodeValue(vCard.firstName) + ';' +
        encodeValue(vCard.middleName) + ';' +
        encodeValue(vCard.namePrefix) + ';' +
        encodeValue(vCard.nameSuffix) + newLIne();

    if (vCard.nickname && majorVersion >= 3) {
        formattedVCardString += 'NICKNAME' + encodingPrefix + ':' + encodeValue(vCard.nickname) + newLIne();
    }

    if (vCard.gender) {
        formattedVCardString += 'GENDER:' + encodeValue(vCard.gender) + newLIne();
    }

    if (vCard.birthday) {
        formattedVCardString += 'BDAY:' + DateLib.format(vCard.birthday,'yyyymmdd') + newLIne();
    }

    if (vCard.anniversary) {
        formattedVCardString += 'ANNIVERSARY:' + DateLib.format(vCard.anniversary,'yyyymmdd') + newLIne();
    }

    if (vCard.email) {
        if (majorVersion >= 4) {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';type=HOME:' + encodeValue(vCard.email) + newLIne();
        } else if (majorVersion >= 3 && majorVersion < 4) {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';type=HOME,INTERNET:' + encodeValue(vCard.email) + newLIne();
        } else {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';HOME;INTERNET:' + encodeValue(vCard.email) + newLIne();
        }
    }

    if (vCard.workEmail) {
        if (majorVersion >= 4) {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';type=WORK:' + encodeValue(vCard.workEmail) + newLIne();
        } else if (majorVersion >= 3 && majorVersion < 4) {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';type=WORK,INTERNET:' + encodeValue(vCard.workEmail) + newLIne();
        } else {
            formattedVCardString += 'EMAIL' + encodingPrefix + ';WORK;INTERNET:' + encodeValue(vCard.workEmail) + newLIne();
        }
    }

    if (vCard.logo?.url) {
        formattedVCardString += getFormattedPhoto('LOGO', vCard.logo.url, vCard.logo.mediaType, vCard.logo.base64);
    }

    if (vCard.photo?.url) {
        formattedVCardString += getFormattedPhoto('PHOTO', vCard.photo.url, vCard.photo.mediaType, vCard.photo.base64);
    }

    if (vCard.cellPhone) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,cell":tel:' + encodeValue(vCard.cellPhone) + newLIne();
        } else {
            formattedVCardString += 'TEL;TYPE=CELL:' + encodeValue(vCard.cellPhone) + newLIne();
        }
    }

    if (vCard.pagerPhone) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="pager,cell":tel:' + encodeValue(vCard.pagerPhone) + newLIne();
        } else {
            formattedVCardString += 'TEL;TYPE=PAGER:' + encodeValue(vCard.pagerPhone) + newLIne();
        }
    }

    if (vCard.homePhone) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,home":tel:' + encodeValue(vCard.homePhone) + newLIne();
        } else {
            formattedVCardString += 'TEL;TYPE=HOME,VOICE:' + encodeValue(vCard.homePhone) + newLIne();
        }
    }

    if (vCard.workPhone) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="voice,work":tel:' + encodeValue(vCard.workPhone) + newLIne();

        } else {
            formattedVCardString += 'TEL;TYPE=WORK,VOICE:' + encodeValue(vCard.workPhone) + newLIne();
        }
    }

    if (vCard.homeFax) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,home":tel:' + encodeValue(vCard.homeFax) + newLIne();

        } else {
            formattedVCardString += 'TEL;TYPE=HOME,FAX:' + encodeValue(vCard.homeFax) + newLIne();
        }
    }

    if (vCard.workFax) {
        if (majorVersion >= 4) {
            formattedVCardString += 'TEL;VALUE=uri;TYPE="fax,work":tel:' + encodeValue(vCard.workFax) + newLIne();

        } else {
            formattedVCardString += 'TEL;TYPE=WORK,FAX:' + encodeValue(vCard.workFax) + newLIne();
        }
    }

    [
        ...(Array.isArray(vCard.addresses)? vCard.addresses : []),
    {
        details: vCard.homeAddress,
        type: 'HOME'
    }, {
        details: vCard.workAddress,
        type: 'WORK'
    }].forEach(
        function(address) {
            const add = getFormattedAddress(encodingPrefix, address);
            if(add){
                formattedVCardString += add;
            }
        }
    );

    if (vCard.title) {
        formattedVCardString += 'TITLE' + encodingPrefix + ':' + encodeValue(vCard.title) + newLIne();
    }

    if (vCard.role) {
        formattedVCardString += 'ROLE' + encodingPrefix + ':' + encodeValue(vCard.role) + newLIne();
    }

    if (vCard.organization) {
        formattedVCardString += 'ORG' + encodingPrefix + ':' + encodeValue(vCard.organization) + newLIne();
    }

    if (vCard.url) {
        formattedVCardString += 'URL' + encodingPrefix + ':' + encodeValue(vCard.url) + newLIne();
    }

    if (vCard.workUrl) {
        formattedVCardString += 'URL;type=WORK' + encodingPrefix + ':' + encodeValue(vCard.workUrl) + newLIne();
    }

    if (vCard.note) {
        formattedVCardString += 'NOTE' + encodingPrefix + ':' + encodeValue(vCard.note) + newLIne();
    }

    if (vCard.socialUrls) {
        for (let key in vCard.socialUrls) {
            if (vCard.socialUrls.hasOwnProperty(key) &&
                vCard.socialUrls[key]) {
                formattedVCardString += 'X-SOCIALPROFILE' + encodingPrefix + ';TYPE=' + key + ':' + encodeValue(vCard.socialUrls[key]) + newLIne();
            }
        }
    }

    if (vCard.source) {
        formattedVCardString += 'SOURCE' + encodingPrefix + ':' + encodeValue(vCard.source) + newLIne();
    }

    formattedVCardString += 'REV:' + DateLib.format(new Date(),'yyyymmdd HH:MM:ss') + newLIne();
    formattedVCardString += 'END:VCARD' + newLIne();
    return formattedVCardString;
}

export {format}