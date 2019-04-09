var input = [
    '10',
    'a b d',
    'd e f',
    'r t a',
    'a c 5 6 r'
],
originalLength = input.length;

var calculateScore = function(a,b) {
    let sameHashtags        = a.filter(value => b.includes(value)).length,
        differentHashtags   = a.length + b.length - sameHashtags,
        score               = Math.min(sameHashtags, differentHashtags-sameHashtags);
    return score;
};

var calculateTotalScore = function(feed) {
    var totalScore = 0;
    for (let index = 0; index < feed.photos.length-1; index++) {
        totalScore += calculateScore(feed.photos[index].hash,feed.photos[index+1].hash);
    }

    return totalScore;
}

var sortFeed = function(feed, sortedFeed, totalScore) {
    var maxScore = 0,
        winId = -1;
    for (let i = 1; i < feed.length; i++) {
        for (let j = 1; j < input.length; j++) {
            let score = calculateScore(feed[i].hash,input[j]);

            if(score>maxScore)
            {
                maxScore = score;
                winId = i;
            }
        }
    }
    totalScore += maxScore;
    sortedFeed.push(feed[winId]);
    input.splice(feed[winId].id,1);
    feed.splice(winId,1);
    console.log((100 - (feed.length*100/originalLength))+'%');
    if(feed.length>1)
        sortFeed(feed, sortedFeed);
    else
        sortedFeed.push(feed[0]);
};

var readInput = function(given) {
    var toReturn = {
        photoNumber : parseInt(given[0]),
        photos : []
    },
    sortedFeed = [];

    toReturn.photos = given.slice(1,given.length);

    for (let index = 0; index < toReturn.photos.length; index++) {
        toReturn.photos[index] = {hash : toReturn.photos[index].split(' '), id : index};
    }

    sortFeed(toReturn.photos, sortedFeed, 0);
    toReturn.photos = sortedFeed;
    return toReturn;
}

console.log(new Date());
console.log('\n');
var sorted = readInput(input);
for (let index = 0; index < sorted.photos.length; index++) {
    console.log(sorted.photos[index].id, sorted.photos[index].hash);
}
console.log('TOTAL SCORE: ' + calculateTotalScore(sorted));
console.log('\n');
console.log(new Date());