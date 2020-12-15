const LoginRequest = (data) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/login', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log(response.headers.get('Authorization'));
                return response.headers.get('Authorization');
            }
    })
        // .then(response => console.log(response.json()))
}

export default LoginRequest;
