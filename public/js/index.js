document.addEventListener('DOMContentLoaded',()=>{
    const username = localStorage.getItem('username')
    const loginButton = document.getElementById('login')
    const signupButton = document.getElementById('signup')
    const logoutButton = document.getElementById('logout')

    if(username){
        const user = document.getElementById('user-welcome')
        user.style.display = "inline-block"
        logoutButton.style.display = "inline-block"
        loginButton.style.display = "none"
        signupButton.style.display = "none"
        user.textContent = `Welcome Back ${username}!`
    }

    logoutButton.addEventListener('click',()=>{
        localStorage.removeItem('username')
        window.location.reload()
    })
})

