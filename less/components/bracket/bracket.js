/**
 * Bracket
 * 
 * Zápasový pavouk 
 * author: eSports.cz, s.r.o. - Petr Kysela petr@kysela.biz
 *********************************************************/
(function($){
	
	function getMatchesData(matches) {
		var matches = matches;
		var matchesData = [];
		var matchesCount = [];
		var emptyMatch = [{
						name: '',
						id: 'match-is-empty',
						score: ''
					},{
						name: '',
						id: 'match-is-empty',
						score: ''
					}];
		
		for (round in matches) {
			matchesCount[round] = 0;
			for (match in matches[round]) {
				matchesCount[round]++;
			}
		}
		
		for (var i = matchesCount.length - 1; i >= 0; i--) {
			if(matchesCount[i-1]) {
				matchesCount[i-1] = parseInt(matchesCount[i], 10) * 2;
			}
		};

		
		for (round in matches) {
			roundData = [];
			for (match in matches[round]) {
				var match = matches[round][match];
				var matchData = [];
				if (match[0] === undefined) {
					matchData = emptyMatch;	
				} else {
					matchData.push({
						name: match[0].name,
						id: match[0].id,
						score: match[0].score,
					});
					matchData.push({
						name: match[1].name,
						id: match[1].id,
						score: match[1].score
					});
				}
				roundData.push(matchData);
			}

			while (roundData.length < matchesCount[round]){
				roundData.push(emptyMatch);
			}
			matchesData.push(roundData);
		}

		if ( !matchesData.length ) {
			return false;
		}

		var lastRoundMatches = matchesData[matchesData.length-1].length;
		
		while (lastRoundMatches > 1) { 
			var emptyRoundMatches = [];
			var thisRoundMatchesCount = lastRoundMatches / 2;
			for (var i = 0; i < thisRoundMatchesCount; i++) {
				emptyRoundMatches.push(emptyMatch);
			}
			matchesData.push(emptyRoundMatches);
			lastRoundMatches = matchesData[matchesData.length-1].length;
		}

		if (lastRoundMatches === 1) {
			var winner = [{
						name: '',
						id: 'match-is-empty',
						score: ''
					}];
			matchesData.push([winner]);
		}

		console.log(matchesData);

		while (matchesData.length > 6) {
			matchesData.splice(0,1);
		}

		return matchesData;
	}

	$(function(){
		var treeContainer = $('#matches-tree');
		
		var testData = [
			[
				[ {"name" : "Erik Zettersten", "id" : "erik-zettersten", "seed" : 1, "displaySeed": "D1", "score" : 47 }, {"name" : "Andrew Miller", "id" : "andrew-miller", "seed" : 2} ],
				[ {"name" : "James Coutry", "id" : "james-coutry", "seed" : 3}, {"name" : "Sam Merrill", "id" : "sam-merrill", "seed" : 4}],
				[ {"name" : "Anothy Hopkins", "id" : "anthony-hopkins", "seed" : 5}, {"name" : "Everett Zettersten", "id" : "everett-zettersten", "seed" : 6} ],
				[ {"name" : "John Scott", "id" : "john-scott", "seed" : 7}, {"name" : "Teddy Koufus", "id" : "teddy-koufus", "seed" : 8}],
				[ {"name" : "Arnold Palmer", "id" : "arnold-palmer", "seed" : 9}, {"name" : "Ryan Anderson", "id" : "ryan-anderson", "seed" : 10} ],
				[ {"name" : "Jesse James", "id" : "jesse-james", "seed" : 1}, {"name" : "Scott Anderson", "id" : "scott-anderson", "seed" : 12}],
				[ {"name" : "Josh Groben", "id" : "josh-groben", "seed" : 13}, {"name" : "Sammy Zettersten", "id" : "sammy-zettersten", "seed" : 14} ],
				[ {"name" : "Jake Coutry", "id" : "jake-coutry", "seed" : 15}, {"name" : "Spencer Zettersten", "id" : "spencer-zettersten", "seed" : 16}]
			], 
			[
				[ {"name" : "Erik Zettersten", "id" : "erik-zettersten", "seed" : 1}, {"name" : "James Coutry", "id" : "james-coutry", "seed" : 3} ],
				[ {"name" : "Anothy Hopkins", "id" : "anthony-hopkins", "seed" : 5}, {"name" : "Teddy Koufus", "id" : "teddy-koufus", "seed" : 8} ],
				[ {"name" : "Ryan Anderson", "id" : "ryan-anderson", "seed" : 10}, {"name" : "Scott Anderson", "id" : "scott-anderson", "seed" : 12} ],
				[ {"name" : "Sammy Zettersten", "id" : "sammy-zettersten", "seed" : 14}, {"name" : "Jake Coutry", "id" : "jake-coutry", "seed" : 15} ]
			],
			[
				[ {"name" : "Erik Zettersten", "id" : "erik-zettersten", "seed" : 1}, {"name" : "Anothy Hopkins", "id" : "anthony-hopkins", "seed" : 5} ],
				[ {"name" : "Ryan Anderson", "id" : "ryan-anderson", "seed" : 10}, {"name" : "Sammy Zettersten", "id" : "sammy-zettersten", "seed" : 14} ]
			],
			[
				[ {"name" : "Erik Zettersten", "id" : "erik-zettersten", "seed" : 1}, {"name" : "Ryan Anderson", "id" : "ryan-anderson", "seed" : 10} ]
			],
			[
				[ {"name" : "Erik Zettersten", "id" : "erik-zettersten", "seed" : 1, "score": 2} ]
			]
		];
		//console.log(getMatchesData(treeContainer.data('events')));
		treeContainer.gracket({
			src : /*testData,//*/getMatchesData(treeContainer.data('events')),
			roundLabels : ["3. kolo", "osmifinále", "čtvrtfinále", "semifinále", "finále","Vítěz"],
		    canvasLineWidth : 2,      // adjusts the thickness of a line
		    canvasLineGap : 9,        // adjusts the gap between element and line
		    cornerRadius : 4,         // adjusts edges of line
		    canvasLineCap : "round",  // or "square"
		    canvasLineColor : "#666" // or #HEX
		});

		treeContainer.find('.match-is-empty').each(function(){
			var team = $(this);
			team.parent().addClass('g_no_current');
		});

	});

})(jQuery);