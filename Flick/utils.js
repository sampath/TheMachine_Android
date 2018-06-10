import React from 'react';

const postRequest = async (url, formData) => {
    var formBody = [];
    for ( var property in formData) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(formData[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log("FB", formBody)

    fetch('https://flick-prod.herokuapp.com/' + url, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    })
    .done();
}

export { postRequest, };