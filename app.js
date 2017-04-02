var request = require('request'), 
	cheerio = require('cheerio'),
	fs = require('fs');

var searchTerm = process.argv[2] || "motivation";

request('https://unsplash.com/search/'+searchTerm, function(err, res, body) {
	if(!err && res.statusCode === 200) {
		var $ = cheerio.load(body);
		var images = [];
		$('#gridMulti ._1OvAL ._3RJ4c ._1hz5D').each(function() {
			var imgSrc = $(this).attr("style");
			images.push(imgSrc.split('("')[1].split("?")[0]);
		});
		
		if(images.length) {
			for(let i=0; i < images.length; i++) {
				request(images[i]).pipe(fs.createWriteStream('images/'+searchTerm+'_img_' + i + '.jpg'));
			}
		} else {
			console.log("No images found");
		}
	}	
});