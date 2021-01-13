export async function LoginRequest (data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return fetch('/login', requestOptions);
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

export function changePassword (data, setErrorMessage){
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        },
        body: JSON.stringify(data)
    }

    fetch('/api/users/', requestOptions)
        .then((response) => {
            if (response.status === 200){
                setErrorMessage("changed password, status: " + response.statusText);
                console.log("changed password");
            } else if(response.status === 409){
                // alert("Wrong password");
                setErrorMessage("Wrong password");
            } else if (response.status === 401){
                localStorage.removeItem("jwt");
                localStorage.removeItem("user");
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

export function deleteGroup (groupId, setChanged){

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
                console.log("usunięto");
                setChanged(true);
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

export function deleteJournalFromGroup (groupId, journalId, setChanged) {

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
                setChanged(true);
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

export function deleteUserFromGroup (groupId, userId, setChanged) {

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
                setChanged(true);
            }
        });
}

export function deleteMyselfFromGroup (groupId, setChanged) {

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt')
        }
    }

    fetch('/api/groups/' + groupId + '/users/', requestOptions)
        .then((response) => {
            if(response.status === 200){
                console.log("delete users( {} ) From Group ( {} )", groupId)
                setChanged(true);
            }
        });
}

export function addUserToGroup (email, groupId, setChanged) {

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
                setChanged(true);
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
