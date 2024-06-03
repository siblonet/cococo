const DisplayInitJobs = async (job_content) => {
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



async function getInitial() {
    //sessionStorage.clear();
    const connected_u = document.getElementById('connected_u')
    const show_profile = document.getElementById('show_profile')
    const user_id = sessionStorage.getItem('_id');
    if (user_id) {
        const dato = await GetPersonByID(user_id);
        connected_u.innerHTML = `
            <a class="btn btn-primary" onclick="Disconnection()" style="cursor: pointer;">Sé deconnecter</a>
        `;

        show_profile.setAttribute("onclick", `getProfile('${user_id}')`);
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

        const jobs_dro = await GetAllJob();

        const job_display = document.getElementById('job_display');
        if (jobs_dro.length > 0) {
            DisplayInitJobs(jobs_dro)
        } else {
            //665ce006500a210e6975e91d
            const job_content = await requesttoBackend('GET', `Job/Creating/copine/${user_id}`);
            if (job_content.length > 0) {
                await deleteJob();
                await PostJob(job_content);
                DisplayInitJobs(job_content);
            } else {
                job_display.innerHTML = `
                <p>Pas d'offre</p>
              `;
            }


        }


    } else {
        await deletePeople();
        const dato = await requesttoBackend('GET', `team/show/giveaccess/Owner`);
        connected_u.innerHTML = `
            <a class="btn btn-primary" onclick="openAccountModal()" style="cursor: pointer;">Créer Compte</a>
            <div class="profile-photo">
                <img id="profile-photo" src="${dato[0].image[0] ? dato[0].image[0].ima : "assets/imo/avatay.png"}" alt="load">
            </div>
        `;
        //document.getElementById('profile-photo').src = dato[0].image[0].ima;
        document.getElementById('profile-photoa').src = dato[0].image[0].ima;
        document.getElementById('user_name').innerHTML = `
        ${whatisthis(dato[0].name)} 
         ${whatisthis(dato[0].role) === "Owner" ? ' <img  style="height: 12px; width: 12px; margin-top: 7px" src="assets/imo/verify.png">' : ''}`;
        document.getElementById('title_name').innerText = "@" + whatisthis(dato[0].role);
        document.getElementById('profile-photob').src = dato[0].image[0].ima;
        show_profile.setAttribute("onclick", `getProfilea('${dato[0]._id}')`);

    };

    await TeamData();

};


const OpenNave = (urlo) => {
    window.location.href = urlo
}

const CloseMessega = () => {
    document.getElementById('messaga').style = "";
    document.getElementById('messaga').classList = "";
    document.getElementById('messaga').innerHTML = "";
}

const Disconnection = async () => {
    var result = window.confirm("Etes vous sur ne vouloir, vous deconnectez?");
    if (result) {
        sessionStorage.clear();
        await deletePeople();
        getInitial()
    }

}


async function TeamData() {
    try {
        const user_content = await requesttoBackend('GET', `team/show/giveaccess/${'user'}`);
        //console.log(user_content);
        await deleteCandidat();
        await PostCandidate(user_content);
        if (user_content && user_content.length > 0) {
            const data = user_content.filter((re) => re.role !== "iVXIFGVFI" && re.image.length > 0 && re.allow).slice(0, 5);
            //console.log(data);
            const userContents = document.getElementById('stories_contenant');
            userContents.innerHTML = "";
            data.forEach((user, index) => {
                const styler = `
                    background: url('${user.image[0].ima}') no-repeat center center/cover;
                `;

                let contentHTML = '';

                if (index === 0) {
                    contentHTML = `
                        <div class="story transitb story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            
                            <a style="cursor: pointer;" class="story_naveab" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_navea" onclick="PreviousCandidates(0)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M34.52 238.48l176-176c9.37-9.37 24.57-9.37 33.94 0l22.62 22.62c9.37 9.37 9.37 24.57 0 33.94L125.26 256l141.82 141.94c9.37 9.37 9.37 24.57 0 33.94l-22.62 22.62c-9.37 9.37-24.57 9.37-33.94 0l-176-176c-9.37-9.37-9.37-24.57 0-33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else if (index + 1 === data.length) {
                    contentHTML = `
                        <div class="story transita story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p> 
                            <a style="cursor: pointer;" class="story_naveb" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_nave" onclick="NextCandidates(5)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M285.48 273.52l-176 176c-9.37 9.37-24.57 9.37-33.94 0l-22.62-22.62c-9.37-9.37-9.37-24.57 0-33.94L194.74 256 52.92 114.06c-9.37-9.37-9.37-24.57 0-33.94l22.62-22.62c9.37-9.37 24.57-9.37 33.94 0l176 176c9.37 9.37 9.37 24.57 0 33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else {
                    contentHTML = `
                        <div class="story story_showsa clika_over" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            <a style="cursor: pointer;" class="story_clika" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                        </div>
                    `;
                }

                userContents.innerHTML += contentHTML;
            });

        }
    } catch (error) {

    }

}

async function NextCandidates(curren) {
    try {
        let data = [];
        let counter = parseInt(curren) + 5;
        const user_content = await GetAllCandidat();
        if (user_content && user_content.length > 0) {
            const first_fil = user_content.filter((re) => re.role !== "iVXIFGVFI" && re.image.length > 0 && re.allow)
            if (first_fil.length >= parseInt(curren) + 5) {
                data = first_fil.slice(parseInt(curren), parseInt(curren) + 5);

            } else if (first_fil.length !== parseInt(curren)) {
                const first_cal = first_fil.length - parseInt(curren);
                const second_cal = parseInt(curren) - first_cal;
                const previuos_version = first_fil.slice(parseInt(curren) - 5, parseInt(curren));
                const previuos_left = previuos_version.slice(-second_cal);
                const next_complet = first_fil.slice(parseInt(curren), first_fil.length);
                counter = 0;
                data = [...previuos_left, ...next_complet];

            } else {

                counter = curren;
                data = first_fil.slice(parseInt(curren), parseInt(curren) + 5);

            }


            const userContents = document.getElementById('stories_contenant');
            userContents.innerHTML = "";
            data.forEach((user, index) => {
                const styler = `
                    background: url('${user.image[0].ima}') no-repeat center center/cover;
                `;

                let contentHTML = '';

                if (index === 0) {
                    contentHTML = `
                        <div class="story transitb story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            <a style="cursor: pointer;" class="story_naveab" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_navea" onclick="PreviousCandidates(${curren})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M34.52 238.48l176-176c9.37-9.37 24.57-9.37 33.94 0l22.62 22.62c9.37 9.37 9.37 24.57 0 33.94L125.26 256l141.82 141.94c9.37 9.37 9.37 24.57 0 33.94l-22.62 22.62c-9.37 9.37-24.57 9.37-33.94 0l-176-176c-9.37-9.37-9.37-24.57 0-33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else if (index + 1 === data.length) {
                    contentHTML = `
                        <div class="story transita story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p> 
                            <a style="cursor: pointer;" class="story_naveb" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_nave"  onclick="NextCandidates(${counter})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M285.48 273.52l-176 176c-9.37 9.37-24.57 9.37-33.94 0l-22.62-22.62c-9.37-9.37-9.37-24.57 0-33.94L194.74 256 52.92 114.06c-9.37-9.37-9.37-24.57 0-33.94l22.62-22.62c9.37-9.37 24.57-9.37 33.94 0l176 176c9.37 9.37 9.37 24.57 0 33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else {
                    contentHTML = `
                        <div class="story story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            <a style="cursor: pointer;" class="story_clika" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                        </div>
                    `;
                }

                userContents.innerHTML += contentHTML;
            });

        }
    } catch (error) {

    }

}

async function PreviousCandidates(curren) {
    try {
        let data = [];
        let counter = 0;
        let counter_pr = parseInt(curren) - 5;
        const user_content = await GetAllCandidat();
        if (user_content && user_content.length > 0) {
            const first_fil = user_content.filter((re) => re.role !== "iVXIFGVFI" && re.image.length > 0 && re.allow)
            if (parseInt(curren) - 5 > 0) {
                data = first_fil.slice(parseInt(curren) - 5, parseInt(curren));
                counter = curren;

            } else {
                counter = 5;
                counter_pr = 0;
                data = first_fil.slice(0, 5);
            }


            const userContents = document.getElementById('stories_contenant');
            userContents.innerHTML = "";
            data.forEach((user, index) => {
                const styler = `
                    background: url('${user.image[0].ima}') no-repeat center center/cover;
                `;

                let contentHTML = '';

                if (index === 0) {
                    contentHTML = `
                        <div class="story transitb story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            
                            <a style="cursor: pointer;" class="story_naveab" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_navea" onclick="PreviousCandidates(${counter_pr})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M34.52 238.48l176-176c9.37-9.37 24.57-9.37 33.94 0l22.62 22.62c9.37 9.37 9.37 24.57 0 33.94L125.26 256l141.82 141.94c9.37 9.37 9.37 24.57 0 33.94l-22.62 22.62c-9.37 9.37-24.57 9.37-33.94 0l-176-176c-9.37-9.37-9.37-24.57 0-33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else if (index + 1 === data.length) {
                    contentHTML = `
                        <div class="story transita story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p> 
                            <a style="cursor: pointer;" class="story_naveb" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                            <a style="cursor: pointer;" class="story_nave" onclick="NextCandidates(${counter})">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                    <path fill="currentColor"
                                        d="M285.48 273.52l-176 176c-9.37 9.37-24.57 9.37-33.94 0l-22.62-22.62c-9.37-9.37-9.37-24.57 0-33.94L194.74 256 52.92 114.06c-9.37-9.37-9.37-24.57 0-33.94l22.62-22.62c9.37-9.37 24.57-9.37 33.94 0l176 176c9.37 9.37 9.37 24.57 0 33.94z"/>
                                </svg>
                            </a>
                        </div>
                    `;
                } else {
                    contentHTML = `
                        <div class="story story_showsa" style="${styler}">
                            <div class="profile-photo">
                                <img src="${user.image[0].ima}">
                            </div>
                            <p class="name">${whatisthis(user.role)}</p>
                            <a style="cursor: pointer;" class="story_clika" onclick="openStoryModal('${user._id}')">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="45">
                                </svg>
                            </a>
                        </div>
                    `;
                }

                userContents.innerHTML += contentHTML;
            });

        }
    } catch (error) {

    }

}
getInitial();