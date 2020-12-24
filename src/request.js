export const LoginRequest = (data) => {

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
                const token = response.headers.get('Authorization').toString();
                // console.log(token);
                localStorage.setItem('jwt', token);
                localStorage.setItem('user', data.email);
                console.log("token storage: " + localStorage.getItem('jwt'))
            }
    })
}

export const RegisterRequest = (data) => {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('/api/register', requestOptions)
        .then((response) => {
            if (response.ok){
                console.log("add user");
                //show sucessfull register and navigate to link
            }
        })
}

export async function getAllJournals ({page, sortColumn, direction, setFetchedData}) {

    await fetch('/api/journals?page=' + page + '&column=' + sortColumn + '&direction=' + direction)
        .then((response) => response.json())
        .then((response) => {
            setFetchedData(response);
        });
}

export const AddGroupRequest = (data) => {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify(data)
    }

    fetch('/api/groups', requestOptions)
        .then((response) => {
            if (response.status === 401){
                console.log("Zaloguj się ponownie");
            } else if (response.ok){
                console.log("add group");
                //show sucessfull register and navigate to link
            }
        })
}

export async function getGroupsByUser (setFetchedData) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    await fetch('/api//users/groups', requestOptions)
        .then((response) => response.json())
        .then((response) => {
            console.log("Grupki xD");
            setFetchedData(response);
            console.log("Po grupkach xD");
        });
}
