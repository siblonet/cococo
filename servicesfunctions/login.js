if (sessionStorage.getItem('_id')) {
    window.location.href = "/";
}

setTimeout(() => {
    document.getElementById('phone').value = "";
    document.getElementById('password').value = "";
}, 1500);

async function Login() {
    const phone = thisiswhat(document.getElementById('phone').value);
    const password = thisiswhat(document.getElementById('password').value);
    const loading = document.getElementById('loading');

    if (phone && password) {
        loading.removeAttribute("onclick");
        loading.innerHTML = `
        En cours ...
        <i class="circle fa-thin fa-arrow-right"></i>
        `;

        const data = {
            phone: phone,
            password: password,

        };
        const response = await requesttoBackend('POST', 'copineconnexion', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "Login()");
            loading.innerHTML = `
            Connecter
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
        } else if (response.name) {
            sessionStorage.setItem('_id', response._id);
            await PostPeople(response);
            window.location.href = "profile";
        } else if (response.ee) {
            alert("Identifient inccorect");
            loading.setAttribute("onclick", "Login()");
            loading.innerHTML = `
            Connecter
            <i class="circle fa-thin fa-arrow-right"></i>
            `;
        }

    } else {
        alert("Renseignez tous.");
    }

};