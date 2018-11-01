const lnormc = (x, mu=1, sd=1) =>
	// CDF(x) of lognormal(mean, standard deviation)
	1/2 + 1/2*math.erf( (math.log(x)-mu)/2**.5/sd )

const stock = (mu, v) =>
	// takes the expected return (e.g. 1.1) and volitility of a stock
	// returns a cumulative density fn: the lognormal approximation for the stock
	x => lnormc(x, math.log(mu) - v/2, v**.5)

$( () => {

const ctx = document.getElementById("chart")
let s = stock(1.1, .18)
let x = [...Array(31)].map((_,i) => i/10)
//let y = [0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1, 1.1]
//let d = x.map(x => lnormc(x, .1, .18))
let d = x.map(s)
let myChart = new Chart(ctx, {
	type: 'line',
	data: {
		labels: x,
		datasets: [ { data: d } ]
	},
	options: {
		scales: {
			xAxes: [{
				ticks: { fontSize: 20 },
				scaleLabel: { display: true, labelString: "x", fontSize: 20 }
			}],
			yAxes: [{
				ticks: { callback: v => v*100 + "%", fontSize: 20 },
				scaleLabel: { display: true, labelString: "Chance of having less than x", fontSize: 20 }
			}]
		}
	}
})

})
