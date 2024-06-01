async function getInitial() {
    const user_id = sessionStorage.getItem('_id');

    const connecta = document.getElementById('connecta');
    const connectb = document.getElementById('connectb');
    const connectc = document.getElementById('connectc');
    const connectd = document.getElementById('connectd');
    const htmloo = `
    Compte
    <figure class="mb-0">
        <i class="fa-solid fa-user"></i>
    </figure>

`;
    if (user_id) {
        connecta.innerHTML = htmloo;
        connecta.href = "profile";
        connectb.innerHTML = htmloo;
        connectb.href = "profile";
        connectc.classList = "";
        connectc.innerHTML = "";
        connectd.innerHTML = htmloo;
        connectd.href = "profile";
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

async function TeamData() {
    try {

        const dato = await requesttoBackend('GET', `team/show/giveaccess/Owner`);
        document.getElementById('profile-photo').src = dato[0].image[0].ima;
        document.getElementById('profile-photoa').src = dato[0].image[0].ima;
        document.getElementById('user_name').innerHTML = `
        ${whatisthis(dato[0].name)} 
         ${whatisthis(dato[0].role) === "Owner" ? ' <img  style="height: 12px; width: 12px; margin-top: 7px" src="assets/imo/verify.png">' : ''}`;
        document.getElementById('title_name').innerText = "@" + whatisthis(dato[0].role);
        document.getElementById('profile-photob').src = dato[0].image[0].ima;

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
TeamData();

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
//getInitial();