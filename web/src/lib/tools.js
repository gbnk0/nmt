import Moment from 'moment';

var Address4 = require('ip-address').Address4;

export function formatDate(date,locale) {
    Moment.locale(locale);
    return Moment(date).format('D MMM YYYY H:m')
}

export function ValidateIPaddress(ipaddress)
{
   var address = new Address4(ipaddress);
    return(address.isValid())
}

export function renderOs(host) {
    var os = '-'
    if ('details' in host) {
        if ('osfamily' in host.details) {
            var os = host.details.osfamily + ' ' + host.details.osgen;
        }
    }
    return os;
}