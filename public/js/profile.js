const username = localStorage.getItem('username')

if(!username){
    alert("You need to Login first")
    window.location.href = 'login.html'
}

fetch(`http://localhost:9090/api/user/${username}`)
.then(res => res.json())
.then(user =>{
    console.log("User data received : "+user)
    document.getElementById('username').textContent = `Username : ${username}`
    document.getElementById('email').textContent =    `Email : ${user.email}`
    document.getElementById('password').textContent = `Password : ${user.password}`
})
.catch(err=>{
    console.log("Error : "+err.message)
})

const editPass = document.getElementById('editPass')

editPass.addEventListener('click', async function(req) {
    const newPass = window.prompt("Enter new Password : ");
    if (newPass) {
        fetch('http://localhost:9090/update-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: newPass, username: username})
        })
        .then(response => {
            if (response.ok) {
                alert('Password updated successfully!');
            } else {
                alert('Failed to update password.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred.');
        });
    } else {
        alert('Password is required!');
    }
});
