
const username = "coalition";
const password = "skills-test";
const auth = btoa(`${username}:${password}`);
async function data() {
    try {
        const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
            method: "GET",
            headers: {
                "Authorization": `Basic ${auth}`
            }
        });

        let alldata = await response.json();

        let patient = alldata.find(person => person.name === "Jessica Taylor");
        //=========================//
        //=========================//
        const interval = setInterval(() => {
            const component = document.querySelector(".sider-container");
            if (component) {
                populatePatients(alldata);
                diagnosisHistory(patient);
                diagnosisList(patient);
                profile(patient);
                labResult(patient);
                clearInterval(interval);
            }
        }, 100);
        //=========================//
        //=========================//

    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
data()

//======= Patients======//
const populatePatients = (data) => {
    let p1 = document.querySelector('.patients-list-container');


    p1.innerHTML = data.map(patient =>
        `
             <div class="list-flexer">
                <div class="pic-wrapper">
                    <img src="${patient.profile_picture
        }" alt="">
                </div>

                <div class="name-wrapper">
                    <h2>${patient.name}</h2>
                    <p>${patient.gender}, ${patient.age}</p>
                </div>

                <div class="ellipse-wrapper">
                    <img src="../assests/ellipseX.svg" alt="">
                </div>

            </div>
        `
    ).join('');

}

//======= diagnosisHistory======//
const diagnosisHistory = (data) => {

    //=================== Chart Js==============//
    //=================== Chart Js==============//
    Chart.defaults.font.size = 12;
    function setResponsiveFontSize() {
        if (window.innerWidth < 800) {
            Chart.defaults.font.size = 4;
        } else if (window.innerWidth < 1200) {
            Chart.defaults.font.size = 8;
        } else if (window.innerWidth < 2000) {
            Chart.defaults.font.size = 12;
        }
        else {
            Chart.defaults.font.size = 17;
        }
    }
    setResponsiveFontSize();


    let diagnosis_history = data.diagnosis_history;
    const firstSixMonths = diagnosis_history.slice(0, 6).reverse().map(entry => `${entry.month}, ${entry.year}`);

    const systolic = diagnosis_history.slice(0, 6).reverse().map(entry =>
        `${entry.blood_pressure.systolic.value}`
    );

    const diastolic = diagnosis_history.slice(0, 6).reverse().map(entry =>
        `${entry.blood_pressure.diastolic.value}`
    );


    const ctx = document.getElementById('myChart').getContext('2d');

    const jsonData = {
        labels: firstSixMonths,
        dataset1: systolic,
        dataset2: diastolic
    };

    const abbreviatedLabels = jsonData.labels.map(label => {
        const [month, year] = label.split(", ");
        const shortMonth = month.slice(0, 3);
        return `${shortMonth}, ${year}`;
    });

    function runchart() {
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: abbreviatedLabels,
                datasets: [
                    {
                        data: jsonData.dataset1,
                        backgroundColor: '#E66FD2',
                        borderColor: '#E66FD2',
                        borderWidth: 2
                    },
                    {
                        data: jsonData.dataset2,
                        backgroundColor: '#8C6FE6',
                        borderColor: '#8C6FE6',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },

                },
                tension: .4,
                scales: {
                    x: {
                        grid: {
                            display: false,
                        }
                    },


                }
            }
        });

    }

    runchart()

    window.addEventListener('resize', () => {
        setResponsiveFontSize();
        runchart();
    });


    //=================== Chart Js Ended==============//
    //=================== Chart Js Ended==============//


    document.getElementById('last_systolic').innerHTML = `${systolic[5]}`
    document.getElementById('systolicStatus').innerHTML = `${diagnosis_history[0].blood_pressure.systolic.levels}`

    document.getElementById('last_diastalic').innerHTML = `${diastolic[5]}`
    document.getElementById('diastalicStatus').innerHTML = `${diagnosis_history[0].blood_pressure.diastolic.levels}`



    document.querySelector('.respiratory-rate').innerHTML = `${diagnosis_history[0].respiratory_rate.value} bpm`
    document.querySelector('.rr-level').innerHTML = `${diagnosis_history[0].respiratory_rate.levels} `


    document.querySelector('.temperature').innerHTML = `${diagnosis_history[0].temperature
        .value}°F`
    document.querySelector('.temp-level').innerHTML = `${diagnosis_history[0].temperature
        .levels}`


    document.querySelector('.heart-rate').innerHTML = `${diagnosis_history[0].heart_rate
        .value} bpm`
    document.querySelector('.hr-level').innerHTML = `${diagnosis_history[0].heart_rate
        .levels}`


}

//======= diagnosisList======//
const diagnosisList = (data) => {

    let list_data = data.diagnostic_list;

    let element_conatiner = document.querySelector('.dl-col-flexer');
    // element_conatiner.innerHTML=data.map
    element_conatiner.innerHTML = list_data.map(problem => 
        `
        <div class="sub-row-flexer">
        <p id="dl-1">${problem.name}</p>
        <p id="dl-2">${problem.description}</p>
        <p id="dl-3">${problem.status}</p>
    </div>
        `
    ).join('')
}

//======= profile======//
const profile=(data)=>{
let profile_pic=document.querySelector('.profile-img');
let profile_name=document.getElementById('profile-heading');
let p1=document.querySelector('.profile-value1');
let p2=document.querySelector('.profile-value2');
let p3=document.querySelector('.profile-value3');
let p4=document.querySelector('.profile-value4');
let p5=document.querySelector('.profile-value5');


profile_pic.src=data.profile_picture;
profile_name.innerHTML=data.name;
p1.innerHTML=data.date_of_birth;
p2.innerHTML=data.gender;
p3.innerHTML=data.phone_number;
p4.innerHTML=data.emergency_contact;
p5.innerHTML=data.insurance_type;

}

//======= labResult======//
const labResult=(data)=>{
    let lab_data=data.lab_results;

    let container=document.querySelector('.lr-col-flexer');
    container.innerHTML=lab_data.map(row =>
        `
         <div class="lr-row-flexer">
            <p id="results">${row}</p>

            <div class="lr-img-wrapper">
                <img src="../assests/download_icon.svg" alt="">
            </div>
        </div>
        `
    ).join('')
}