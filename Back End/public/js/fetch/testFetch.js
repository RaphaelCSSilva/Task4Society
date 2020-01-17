function loginUser() {
    let myForm = document.getElementById('loginForm');

    myform.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch('127.0.0.1:5500/api/v1/signin', {
            method: 'post',
            body: formData
        }).then(function(response) {
            console.log(response);
        })

    })
}

loginUser();