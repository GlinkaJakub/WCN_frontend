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
                return token;
            }
            return 'bad request';
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

export async function getSearchingJournals ({page, sortColumn, direction, setFetchedData}, searchWord) {

    await fetch('/api/journals/word?word=' + searchWord + '&page=' + page + '&column=' + sortColumn + '&direction=' + direction)
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

export function deleteGroup (groupId){

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId, requestOptions)
        .then((response) => {
            if (response.status === 200){
                alert("usunięto");
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

    await fetch('/api/users/groups', requestOptions)
        .then((response) => response.json())
        .then((response) => {
            setFetchedData(response);
        });
}

export async function getSimpleGroupsByUser (setFetchedData) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    await fetch('/api/users/groups/names', requestOptions)
        .then((response) => response.json())
        .then((response) => {
            setFetchedData(response);
        });
}

export function deleteJournalFromGroup (groupId, journalId) {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId + '/journals/' + journalId, requestOptions)
        .then((response) => {
            if(response.status === 200){
                console.log("deleteJournal( {} ) From Group ( {} )", journalId, groupId)
            }
        });
}

export function addJournalToGroup (groupId, journalId) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId + '/journals/' + journalId, requestOptions)
        .then((response) => {
            if(response.status === 200){
                console.log("deleteJournal( {} ) From Group ( {} )", journalId, groupId)
            }
        });
}

export function deleteUserFromGroup (groupId, userId) {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId + '/users/' + userId, requestOptions)
        .then((response) => {
            if(response.status === 200){
                console.log("delete users( {} ) From Group ( {} )", userId, groupId)
            }
        });
}

export function addUserToGroup (email, groupId) {

    console.log("added user( ", email, " ) From Group (", groupId, ")")

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId + '/users/' + email, requestOptions)
        .then((response) => {
            if(response.status === 200){
                console.log("added user( {} ) From Group ( {} )", email, groupId)
            }
        });
}

export async function getAllCategories (setCategoriesData) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    await fetch('/api/categories', requestOptions)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            setCategoriesData(response);
        });
}

export async function getAllJournalsByCategory ({page, sortColumn, direction, setFetchedData}, categoryId, setSearchWord) {
    console.log("categoryID: ", categoryId);

    await fetch('/api/categories/' + categoryId + '/journals?page=' + page + '&column=' + sortColumn + '&direction=' + direction)
        .then((response) => response.json())
        .then((response) => {
            setSearchWord('');
            setFetchedData(response);
        });
}
