
batStatus();

const cs = document.getElementById("charge-status");
const csa = document.getElementById("charge-status-ani");
const cp = document.getElementById('charge-path');

function batStatus(){

	navigator.getBattery()
		.then(function(battery){

		const status = document.getElementById("status-info");
		const chargePath = document.getElementById('charge-path');

		let batLevel = battery.level * 100,

			// something to do with the height of the battery? i think?
			batPercent = battery.level * 281;

		//set battery status color
		batColors();

		// full charge width = 281
		cs.setAttribute('data-full', batPercent );
		csa.setAttribute('to', batPercent);
		cs.setAttribute('width', batPercent);


		battery.charging ? chargePath.classList.toggle('hidden') : '';

		// show hide the charging indicator
		updateCharge();

		function updateCharge(){

			battery.charging ? cp.classList.remove('hidden') : cp.classList.add('hidden');

		}

		function levelChange(){

			cs.setAttribute('width', batPercent);

			cs.classList.add('bat-change');

			setTimeout(function(){
				cs.classList.remove('bat-change');
			},300);

		}

		function batColors() {

			switch( true ) {
				case (batPercent <= 56):
					cs.setAttribute('fill', '#c0392b');
					break;

				case (batPercent  >= 56 && batPercent <= 125):
					cs.setAttribute('fill', '#f39c12');
					break;

				case (batPercent > 125):
					cs.setAttribute('fill', '#2ecc71');
			}
		}

		battery.addEventListener('chargingchange', updateCharge);
		//battery.addEventListener('levelchange', levelChange);


	}
);
}


function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    
    var time = h + ":" + m + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();
