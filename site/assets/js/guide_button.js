document.getElementById('check').onclick = function () {
    let login = document.getElementById('login').value;
    let password = document.getElementById('password').value;

    if (login == 'kris' && password == '1') {
        window.open('guide_run.html', '_blank');
    }
    else if (login == 'kostya' && password == '1') {
        window.open('guide_run.html', '_blank');
    }
    else if (login == '1' && password == '1') {
        window.open('guide_run.html', '_blank');
    }
    else {
        alert('incorect login or password');
    }
}