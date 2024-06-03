
// Opens Modal for shows styry
const openStoryModal = async (_id) => {
    //console.log(_id);
    modala.style.zIndex = '7777';

    line_runner1.style.transition = 'width 10s linear';
    line_runner2.style.transition = 'width 10s linear';
    line_runner3.style.transition = 'width 10s linear';

    const user_content = await GetCandidatByID(_id);

    change_to_next.src = user_content.image[0].ima;

    modala.style.pointerEvents = 'auto';
    modala.style.opacity = '1';
    modala.style.transition = 'all 300ms ease-in-out';

    modala_wrap.style.pointerEvents = 'auto';
    modala_wrap.style.opacity = '1';
    modala_wrap.style.transform = 'scale(1)';
    modala_wrap.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
    line_runner1.style.width = '100%';
    profile_link.setAttribute("onclick", `getProfile('${_id}')`);
    profil_img.src = user_content.image[0].ima
    profil_rol.innerHTML = `
        ${whatisthis(user_content.role)}
        <img style="height: 12px; width: 12px; margin-top: 3px" src="assets/imo/${user_content.status ? whatisthis(user_content.role) === "Owner" ? 'verify.png' : 'verified.png' : whatisthis(user_content.role) === "Owner" ? 'verify.png' : 'bad_verify.png'}">
    `;



    timerId = setTimeout(() => {
        line_runner2.style.width = '100%';
        if (user_content.image.length > 1) {
            change_to_next.src = user_content.image[1].ima;
        }
    }, 10010);

    timerIa = setTimeout(() => {
        line_runner3.style.width = '100%';
        if (user_content.image.length > 2) {
            change_to_next.src = user_content.image[2].ima;
        }
    }, 20025);

    timerIb = setTimeout(() => {
        closeStoryModala()
    }, 30026);
};


// Opens Modal for account 
const openAccountModal = async () => {
    modala_compte.style.zIndex = '7777';

    modala_compte.style.pointerEvents = 'auto';
    modala_compte.style.opacity = '1';
    modala_compte.style.transition = 'all 300ms ease-in-out';

    modala_wrapa_compte.style.pointerEvents = 'auto';
    modala_wrapa_compte.style.opacity = '1';
    modala_wrapa_compte.style.transform = 'scale(1)';
    modala_wrapa_compte.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
};


// account view changing
const AccountView = async (what) => {
    const aoount_view_contaner = document.getElementById('aoount_view_contaner');
    modala_compte.style.zIndex = '7777';

    if (what === "create") {
        aoount_view_contaner.innerHTML = `
        
                    <div style="">
                        <label for="user-name" style="color: #aaaaaa; font-size: 12px;">
                            Nom complet à l'état civil
                        </label>
                        <input type="text" placeholder="Nom complet à l'état civil" id="user-name" autocomplete="off"
                            style="width: 100%; height: 2rem; background-color: #ffffff; border-radius: 7px; padding-left: 2%; padding-right: 2%;">

                        <div style="height: 15px;"></div>

                        <label for="phone" style="color: #aaaaaa; font-size: 12px;">Numéro de téléphone</label>
                        <input type="number" placeholder="Numéro" id="phone" autocomplete="off"
                            style="width: 100%; height: 2rem; background-color: #ffffff; border-radius: 7px; padding-left: 2%; padding-right: 2%;">

                        <div style="height: 10px;"></div>

                        <a id="loadinga" class="btn btn-primary" onclick="SignUp()" style="cursor: pointer;">
                            Valider
                        </a>
                    </div>


        `;

    } else if (what === "connect") {
        aoount_view_contaner.innerHTML = `

            <div style="">
                    <label for="phonea" style="color: #aaaaaa; font-size: 12px;">Numéro de téléphone</label>
                    <input type="number" placeholder="Numéro" id="phonea" autocomplete="off"
                        style="width: 100%; height: 2rem; background-color: #ffffff; border-radius: 7px; padding-left: 2%; padding-right: 2%;">


                    <div style="height: 15px;"></div>

                    <div style="display: none;" id="password_hidden">
                        <label for="pre-password" style="color: #aaaaaa; font-size: 12px;">Mot de passe</label>
                        <input type="password" placeholder="******" id="pre-password" autocomplete="off"
                            style="width: 100%; height: 2rem; background-color: #ffffff; border-radius: 7px; padding-left: 2%; padding-right: 2%;">
                    </div>


                    <div style="height: 10px;"></div>

                    <a id="loading" class="btn btn-primary" onclick="Login()" style="cursor: pointer;">
                        Connecter
                    </a>
            </div>  

        `;

    } else if (what === "") {

    } else if (what === "") {

    } else {

    }



    modala_compte.style.pointerEvents = 'auto';
    modala_compte.style.opacity = '1';
    modala_compte.style.transition = 'all 300ms ease-in-out';

    modala_wrapa_compte.style.pointerEvents = 'auto';
    modala_wrapa_compte.style.opacity = '1';
    modala_wrapa_compte.style.transform = 'scale(1)';
    modala_wrapa_compte.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
};


const openRecrutementForm = () => {
    //const recrutement_form_view_contaner = document.getElementById('recrutement_form_view_contaner');
    modala_recrutement_form.style.zIndex = '7777';

    modala_recrutement_form.style.pointerEvents = 'auto';
    modala_recrutement_form.style.opacity = '1';
    modala_recrutement_form.style.transition = 'all 300ms ease-in-out';

    modala_wrapa_recrutement_form.style.pointerEvents = 'auto';
    modala_wrapa_recrutement_form.style.opacity = '1';
    modala_wrapa_recrutement_form.style.transform = 'scale(1)';
    modala_wrapa_recrutement_form.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
}
let selecrole;
let matrimonial;
let sex_choi;
const selectrolea = document.getElementById('selecrole');
selectrolea.addEventListener('change', function () {
    selecrole = this.value;
});


const matrimonials = document.getElementById('matrimonial');
matrimonials.addEventListener('change', function () {
    matrimonial = this.value;
});

const sex_choix = document.getElementById('sex_choi');
sex_choix.addEventListener('change', function () {
    sex_choi = this.value;
});

async function CreateJob() {
    const Lundi = document.getElementById('Lundi').checked;
    const Mardi = document.getElementById('Mardi').checked;
    const Mercredi = document.getElementById('Mercredi').checked;
    const Jeudi = document.getElementById('Jeudi').checked;
    const Vendredi = document.getElementById('Vendredi').checked;
    const Samedi = document.getElementById('Samedi').checked;
    const Dimanche = document.getElementById('Dimanche').checked;
    const sevent_d = document.getElementById('sevent_d').checked;

    const selectedDays = `${Lundi ? 'Lundi ' : ''}${Mardi ? 'Mardi ' : ''}${Mercredi ? 'Mercredi ' : ''}${Jeudi ? 'Jeudi ' : ''}${Vendredi ? 'Vendredi ' : ''}${Samedi ? 'Samedi ' : ''}${sevent_d ? '7/7 ' : ''}${Dimanche ? "Dimanche" : ''}`;



    const heur_debute = document.getElementById('heur_debute').value;
    const heur_descente = document.getElementById('heur_descente').value;
    const Ville = document.getElementById('Ville').value;
    const Commune = document.getElementById('Commune').value;
    const Salaire = document.getElementById('Salaire').value;
    const Description = document.getElementById('Description').value;
    const age = document.getElementById('Age-range').value;


    const loadingb = document.getElementById('loadingb');


    if (selecrole && selectedDays && heur_debute && heur_descente && Ville && Commune && Salaire && Description && age && sex_choi && matrimonial) {
        loadingb.removeAttribute("onclick");
        loadingb.innerHTML = `En Cours ...`;

        const data = {
            role: selecrole,
            days: selectedDays,
            heurstart: heur_debute,
            heurend: heur_descente,
            ville: Ville,
            commune: Commune,
            salaire: Salaire,
            descip: Description,
            matrimonial: matrimonial,
            age: age,
        };

        const response = await requesttoBackend('POST', 'JobcopineCreating', data);

        if (!response) {
            alert("Échec, vérifiez votre connexion ou essayez plus tard.");

            loadingb.setAttribute("onclick", "CreateJob()");
            loadingb.innerText = "Submet";
        } else if (response.role) {
            await PostSingleJob(response);
            loadingb.setAttribute("onclick", "CreateJob()");
            loadingb.innerText = "Submet";
            DisplayJobs()
        }

    } else {
        alert("Renseignez tous.");
    }
}


const OpenJob = async (job_id) => {
    const job_content = await GetJobByID(job_id);
    const loadingc = document.getElementById('loadingc');
    loadingc.setAttribute("onclick", `AcceptJob('${job_id}')`);
    const days_job = job_content.days.split(" ");
    document.getElementById('role_job').innerText = job_content.role;

    const jour_de_travail = document.getElementById('jour_de_travail');
    jour_de_travail.innerHTML = ""

    days_job.forEach((day, index) => {
        const day_html = `
                        <div class="check_boxa">
                            <label style="color: #aaaaaa; font-size: 12px;">${day}</label>
                        </div>
                        `;

        jour_de_travail.innerHTML += day_html;

    });


    document.getElementById('debute_job').innerText = job_content.heurstart;
    document.getElementById('descente_job').innerText = job_content.heurend;
    document.getElementById('Ville_job').innerText = job_content.ville;
    document.getElementById('Commune_job').innerText = job_content.commune;
    document.getElementById('Salaire_job').innerText = job_content.salaire;
    document.getElementById('Age-range').innerText = job_content.age;
    document.getElementById('Celibataire_job').innerText = job_content.matrimonial;
    document.getElementById('sex-range').innerText = job_content.sex;
    document.getElementById('Description-range').innerText = job_content.descip;


    modala_job_open_view.style.zIndex = '7777';
    modala_job_open_view.style.pointerEvents = 'auto';
    modala_job_open_view.style.opacity = '1';
    modala_job_open_view.style.transition = 'all 300ms ease-in-out';

    modala_wrapa_job_open_view.style.pointerEvents = 'auto';
    modala_wrapa_job_open_view.style.opacity = '1';
    modala_wrapa_job_open_view.style.transform = 'scale(1)';
    modala_wrapa_job_open_view.style.transition = 'opacity 250ms 500ms ease, transform 350ms 500ms ease';
}

const OpenModifieJob = async (job_id) => {

}


const AcceptJob = async (job_id) => {

}

const RejectJob = async (job_id) => {

}

const DisplayJobs = async () => {
    const job_content = await GetAllJob();
    const connected_id = sessionStorage.getItem('_id');


    const job_display = document.getElementById('job_display');
    job_display.innerHTML = "";
    const job_peop = 1;

    job_content.forEach((job, index) => {
        const job_html = `

                      <div class="request">
                            <div class="info">
                                <div class="profile-photo">
                                    <img src="./assets/imo/job.png">
                                </div>

                                <div>
                                    <h5>${job.role}</h5>
                                    <p class="text-muted">${job_peop} persone(s) invité</p>
                                </div>
                            </div>
                            ${connected_id === job.recruter ?
                `
                                <div class="action">
                                    <button class="btn btn-primary" onclick="OpenModifieJob('${job._id}')">
                                        Modifier
                                    </button>
                                    <button class="btn"  onclick="DeleteJob(${job._id})">
                                        Annuler
                                    </button>
                                </div>

                            `
                :
                `
                                <div class="action">
                                    <button class="btn btn-primary" onclick="OpenJob('${job._id}')">
                                        Accepter
                                    </button>
                                    <button class="btn" onclick="RejectJob(${job._id})">
                                        Refuser
                                    </button>
                                </div>

                            `
            }
                            
                        </div>
                        `;

        job_display.innerHTML += job_html;

    });
}


