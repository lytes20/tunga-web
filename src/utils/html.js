import _ from 'lodash';
import striptags from 'striptags'

export function nl_to_br(str) {
    if(str) {
        return str.replace(/\n/g, "<br />");
    }
    return str;
}

export function render_excerpt(excerpt) {
    return nl_to_br(excerpt);
}

export function objectToQueryString (obj) {
    var qs = _.reduce(obj, function(result, value, key) {
        return (!_.isNull(value) && !_.isUndefined(value)) ? (result += key + '=' + value + '&') : result;
    }, '').slice(0, -1);
    return qs;
}

export function render_summary(body, length=200) {
    return _.truncate(striptags((body || "").trim().replace('&nbsp;', '')), {length: length, separator: ''});
}
