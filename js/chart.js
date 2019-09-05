//  Trafiic Line Graph
const trafficCanvas = document.querySelector('#line-canvas').getContext('2d');

//Global Options
Chart.defaults.global.elements.point.borderWidth = 10;


let trafficData = {
    labels: ["", "16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"
    ],
    datasets: [{
        data: [0,750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
            2500
    ],
    backgroundColor: 'rgba(116, 119, 191, .3)',
    borderWidth: 2,
    borderColor: 'rgba(116, 119, 191, .5)',
    pointRadius: 0,
    pointHoverRadius: 8,
    pointBackgroundColor: 'white',
    pointBorderColor: '#7477bf',
    pointBorderWidth: 3
    }] 
};


let trafficDataMonthly = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"],
    datasets: [
            11943, 12825, 13464, 13029,
            11390, 12060, 14598, 10475,
            13056, 11423, 14528, 10359            
        ]
};

let trafficDataWeekly = {
    labels: ["", "16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3",
        "4-10", "11-17", "18-24", "25-31"
    ],
    datasets: [0,750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500,
                2500
        ]
};

let trafficDataDaily = {
    labels: ["S","M","T","W","T","F","S"],
    datasets: [75, 115, 175, 125, 225, 200, 100]
};

let trafficDataHourly = {
    labels: ["1-3AM", "4-6AM", "7-9AM", "9-12PM", "1-3PM", "4-6PM", "7-9PM", "9-12AM"],
    datasets: [25, 75, 125, 50, 100, 25, 45, 15]
};

let trafficOptions = {
    responsive: true,
    elements: {
        line: {
            tension: 0
        },
    },
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true,
            }
        }]
    },
    legend: {
      display: false
    },
};

//Gets rid of line graph points in mobile version when less than 768px
const getWindowWidth = e => window.innerWidth;
const responsivePoint = e => {
    if(getWindowWidth() < 768){
        trafficData.datasets[0].pointRadius = 0;
    } else {
        trafficData.datasets[0].pointRadius = 6;
    }
}
window.addEventListener('resize', responsivePoint);

//Call responsive point
responsivePoint();

//Create the graph in canvas
let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData,
    options: trafficOptions
});

// Daily traffic bar graph
const dailyCanvas = document.querySelector('#daily-canvas').getContext('2d');

let dailyTrafficData = {
    labels: ["S","M","T","W","T","F","S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }] 
};

const dailyOptions = {
    responsive: true,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
    tooltips: {
        enabled: false
    },
    legend : {
        display: false
    }
}

let dailyGraph = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyTrafficData,
    options: dailyOptions
});

// Mobile users doughnut graph
const mobileCanvas = document.getElementById("mobile-canvas");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        label: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ],
    }]
};

const mobileOptions = {
    responsive: true,
    rotation: 0,
    legend: {
        position: 'right',
        labels: {
            boxWidth: 20,
                fontStyle: 'bold'
        }
    }
}

let mobileGraph = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

// Chart.js update functions, I customized them to work with my objects

function addData(chart, label, data) {
    for(let i = 0; i < label.length; i++){
        chart.data.labels[i] = label[i];
    }

    for(let i = 0; i < data.length; i++){
        chart.data.datasets[0].data[i] = data[i];
    }
}

function removeData(chart) {
    chart.data.labels.splice(0,chart.data.labels.length);
    chart.data.datasets[0].data.splice(0,chart.data.datasets[0].data.length);
}

function replaceData(chart, label, data) {
    removeData(chart);
    addData(chart, label, data);
    chart.update();
}
    
// Scale
const scale = document.querySelector('.traffic ul');

scale.addEventListener('click', e => {
    const trafficCanvas = document.querySelector('.traffic-div canvas');

    if(e.target.textContent.toLowerCase() === 'hourly') {
        replaceData(trafficChart, trafficDataHourly.labels, trafficDataHourly.datasets);
    } else if(e.target.textContent.toLowerCase() === 'daily') {
        replaceData(trafficChart, trafficDataDaily.labels, trafficDataDaily.datasets);
    } else if(e.target.textContent.toLowerCase() === 'weekly') {
        replaceData(trafficChart, trafficDataWeekly.labels, trafficDataWeekly.datasets);
    } else if(e.target.textContent.toLowerCase() === 'monthly') {
        replaceData(trafficChart, trafficDataMonthly.labels, trafficDataMonthly.datasets);
    }
});