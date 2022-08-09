function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function callapi(api) {
    fetch('https://api.ipgeolocation.io/ipgeo?apiKey=' + api + '&fields=country_code2,isp').then(function(response) {
            response.json().then(jsonData => {
                var country = jsonData.country_code2;
                var ISP = jsonData.isp;
                setCookie('VisitorLocation', country, 7);
                if (ISP == 'Google LLC') {
                    setCookie('GoogleLLCFound', true, 7);
                } else {
                    setCookie('GoogleLLCFound', false, 7);
                    if(country == 'US' || country == 'CA'){
                      window.location.href = 'Target location';
                    }
                }
            });
        })
        .catch(function(error) {
            console.log(error)
        });
}

var Getcountry = getCookie('VisitorLocation')?getCookie('VisitorLocation'):null;
var GetGoogleLLC = getCookie('GoogleLLCFound')?getCookie('GoogleLLCFound'):null;
var Ifcalled = false;

if (Getcountry == null && !Ifcalled) {
    callapi('API KEY');
    Ifcalled = true;
}
else {
  if (Getcountry == 'US' || Getcountry == 'CA') {
    window.location.href = 'Target location';
  }
}
