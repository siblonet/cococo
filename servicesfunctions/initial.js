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
        const length = await requesttoBackend('GET', `suscribed/services/users`);
        if (length.getta) {
            document.getElementById('Nounou').innerText = length.Nounou;
            document.getElementById('Chauffeur').innerText = length.Chauffeur;
            document.getElementById('Menage').innerText = length.Menage;
            document.getElementById('Maitre_maison').innerText = length.Maitre_maison;
        };

        const dato = await requesttoBackend('GET', `team/show/giveaccess/Owner`);
        if (dato.length > 0) {
            const data = dato.filter((re) => re.allow);
            const userContents = document.getElementById('teamContents');
            userContents.innerHTML = "";
            data.forEach((user, index) => {

                const contenttHTML = `
                    <div class="carousel-item ${index == 0 ? "active" : ""}">
                        <div class="testimonial_content">
                            <div class="content-box">
                                <p>${whatisthis(user.bio)}</p>
                                <div class="content">
                                    <div class="circle">
                                        <figure class="testimonial-quote mb-0">
                                            <i class="fa-solid fa-quote-right"></i>
                                        </figure>
                                    </div>
                                    <div class="designation-outer">
                                        <span>${whatisthis(user.name)}</span>
                                        <p class="text-size-18 mb-0">${whatisthis(user.prof)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
            `;

                userContents.innerHTML += contenttHTML;

            });
        }
    } catch (error) {

    }

}

getInitial();