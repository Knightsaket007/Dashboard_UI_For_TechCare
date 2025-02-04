
const loadComponent = (url, id_of_element) => {
    fetch(url)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id_of_element).innerHTML = data;
        })
        .catch(err => {
            console.error('Error found while loading navbar component :', err);
        });
}



loadComponent('./Components/navbar.html', 'navbar')
loadComponent('./Components/patients.html', 'Patients-sidebar')
loadComponent('./Components/diagnosisHistory.html', 'diagnosis-history')
loadComponent('./Components/diagnosisList.html', 'diagnosis-list')
loadComponent('./Components/profile.html', 'profile')
loadComponent('./Components/lab-result.html', 'lab-result')



