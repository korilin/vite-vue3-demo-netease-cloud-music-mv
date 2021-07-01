export function getArtists(artists) {
    var i = 0;
    var name = artists[i].name;
    while (++i < artists.length) {
        name += ", " + artists[i].name;
    }
    return name;
}

export function getPlayCount(count) {
    let w = parseInt(count / 10000);
    if (w <= 0) return count;
    return w + "万";
}

export function getDuration(ms) {
    var duration = "";
    const second = parseInt(ms / 1000);
    var h = parseInt(second / 3600),
        m = parseInt((second % 3600) / 60),
        s = parseInt((second % 3600) % 60);
    if (h > 0) {
        duration += h + ":";
    }
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    duration += m + ":" + s;
    return duration;
}

export function getLocalTime(ms) {
    return new Date(ms).toLocaleDateString()
}
