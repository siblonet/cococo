/*setTimeout(() => {
    document.getElementById('phone').value = "";
    document.getElementById('password').value = "";
}, 1500);*/

async function Login() {
    const phone = thisiswhat(document.getElementById('phonea').value);
    const loading = document.getElementById('loading');

    if (phone) {
        loading.removeAttribute("onclick");
        loading.innerText = `En cours ...`;

        const data = {
            phone: phone,
            password: "1234",
        };


        const response = await requesttoBackend('POST', 'copineconnexion', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "Login()");
            loading.innerText = `Connecter`;

        } else if (response.name) {
            sessionStorage.setItem('_id', response._id);
            await PostPeople(response);
            ProfileDataSet(response);




        } else if (response.ee) {
            alert("Identifient inccorect");
            loading.setAttribute("onclick", "Login()");
            loading.innerText = `Connecter`;
        } else if (response.con) {


            document.getElementById('password_hidden').style.display = "block";
            loading.setAttribute("onclick", "LoginWithPass()");
            loading.innerText = `Connecter`;

        }

    } else {
        alert("Renseignez tous.");
    }

};


async function LoginWithPass() {
    const phone = thisiswhat(document.getElementById('phonea').value);
    const password = thisiswhat(document.getElementById('pre-password').value);
    const loading = document.getElementById('loading');
    if (phone && password) {
        loading.removeAttribute("onclick");
        loading.innerText = `En cours ...`;

        const data = {
            phone: phone,
            password: password,

        };
        const response = await requesttoBackend('POST', 'copineconnexion', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");
            loading.setAttribute("onclick", "LoginWithPass()");
            loading.innerText = `Connecter`;

        } else if (response.name) {
            sessionStorage.setItem('_id', response._id);
            await PostPeople(response);
            ProfileDataSet(response);



        } else if (response.ee) {
            alert("Identifient inccorect");
            loading.setAttribute("onclick", "LoginWithPass()");
            loading.innerText = `Connecter`;

        }

    } else {
        alert("Renseignez tous.");
    }

};


async function SignUp() {
    const full_name = thisiswhat(document.getElementById('user-name').value);
    const phone = thisiswhat(document.getElementById('phone').value);
    const loading = document.getElementById('loadinga');


    if (full_name && phone) {
        loading.removeAttribute("onclick");
        loading.innerText = `En Cours ...`;

        const data = {
            name: full_name,
            phone: phone,
            password: "1234",
            role: "vide",
            address: "vide",
            email: "vide",
            pushtoken: "null",
            allow: true,
            ville: "vide",
            bio: "vide",
            sex: "vide",
            availability: true,
            situation: "vide",
            age: "2000-01-01",
            wapp: "vide",
            natinalite: "vide",
            religion: "vide",
            etudient: "vide",
            prof: "vide",
        };

        const response = await requesttoBackend('POST', '', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loading.setAttribute("onclick", "SignUp()");
            loading.innerText = "Valider";
        } else if (response.name) {
            sessionStorage.setItem('_id', response._id);
            await PostPeople(response);
            ProfileDataSet(response);



        } else if (response.ee) {
            alert(`Le ${phone} est déjà associé à un compte`);
            loading.setAttribute("onclick", "SignUp()");
            loading.innerText = "Valider";

        }

    } else {
        alert("Renseignez tous.");
    }
};



async function ProfileDataSet(dato) {
    const connected_u = document.getElementById('connected_u')
    const show_profile = document.getElementById('show_profile')
    show_profile.setAttribute("onclick", `getProfile('${dato._id}')`);
    connected_u.innerHTML = `
    <a class="btn btn-primary" onclick="Disconnection()" style="cursor: pointer;">Sé deconnecter</a>
`;

    //document.getElementById('profile-photo').src = dato.image[0] ? dato.image[0].ima : "assets/imo/avatay.png";
    document.getElementById('profile-photoa').src = dato.image[0] ? dato.image[0].ima : "assets/imo/avatay.png";
    document.getElementById('user_name').innerHTML = `
    ${whatisthis(dato.name)} 
    <img style="height: 12px; width: 12px; margin-top: 7px" src="assets/imo/${dato.status ? whatisthis(dato.role) === "Owner" ? 'verify.png' : 'verified.png' : whatisthis(dato.role) === "Owner" ? 'verify.png' : 'bad_verify.png'}">
     `;
    document.getElementById('title_name').innerText = "@" + whatisthis(dato.role);
    document.getElementById('profile-photob').src = dato.image[0] ? dato.image[0].ima : "assets/imo/avatay.png";
    if (dato.role === "iVXIFGVFI") {
        document.getElementById('travail_demand').innerText = "Vos Récrutements";
    }

    const job_content = await requesttoBackend('GET', `Job/Creating/copine/${dato._id}`);
    //console.log(user_content);
    await deleteJob();
    await PostJob(job_content);
    DisplayInitJobs(job_content);
    closeAccountModala()
};