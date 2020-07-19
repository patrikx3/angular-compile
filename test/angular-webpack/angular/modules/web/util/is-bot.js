const pattern = new RegExp('spider|bot|yahoo|bing|google|yandex|lynx|curl|embedly|quora|outbrain|pinterest|vkShare|W3C_Validator|crawl|borg|slurp|archiver|netresearch|lycos|scooter|altavista|teoma|oegp|charlotte|http client|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|semanticdiscovery|snappy|speedy|voila|vortex|voyager|zao|zeal|dataparksearch|findlinks|browsermob|httpmonitor|bingpreview|pagepeeker|webthumb|url2png|zooshot|gomeza|google sketchup|read later|pingdom|facebook|rackspace|scan|link|ezine|preview|dig|tarantula|urllib|jakarta|wget|rget|monitor|libwww|moozilla|seer|spice|snoopy|feedfetcher|wordpress|java|netfront|archive|xenu|feed|appmanager|covario|perl|host|lwp|page speed|ptst|digext|nutch|sleuth|yottaamonitor|bubing|corifeus', 'i');

module.exports = () => {
    return pattern.test(navigator.userAgent);
};
