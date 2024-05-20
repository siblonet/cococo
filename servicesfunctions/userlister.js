function recentProduct(user_content, what) {
    //console.log(user_content);
    const userContainer = document.getElementById('rendadata');

    if (user_content.length > 0) {
        userContainer.classList.remove("offer-section");
        userContainer.classList.add("project-section");
        userContainer.classList.add("projectpage-section");
        userContainer.innerHTML = `
        
        
            <figure class="offer-top-layout mb-0">
                <img src="assets/images/offer-top-layout.png" alt="" class="img-fluid">
            </figure>


            <div class="container">
                <div class="project_wrapper">
                    <div class="row" id="userContents">
                               
                    </div>
                </div>
            </div>
            <figure class="offer-bottomlayer mb-0">
                <img src="assets/images/offer-bottomlayer.png" alt="" class="img-fluid">
            </figure>
        
        `;

        const userContents = document.getElementById('userContents');
        user_content.forEach((user, index) => {
            const contenttHTML = `
                <div class="col-lg-4 col-md-4 col-sm-6 col-12 candidatspace">
                    <a class="case-box overlay" href="viewdata?svc=${user._id}">
                        <div class="overlay-image">
                            <figure class="image mb-0">
                                <img src="${user.image[0] ? user.image[0].ima : "assets/images/baby1.webp"}" alt="" class="">
                            </figure>
                        </div>
                        <div class="content" style="cursor: pointer;">
                            <img src="assets/images/love.png" style="height: 10px; width: 10px;" alt="love">
                            <img src="assets/images/love.png" style="height: 10px; width: 10px;" alt="love">
                            <img src="assets/images/love.png" style="height: 10px; width: 10px;" alt="love">
                            <img src="assets/images/love.png" style="height: 10px; width: 10px; filter: grayscale(100%);" alt="love">
                            <img src="assets/images/love.png" style="height: 10px; width: 10px; filter: grayscale(100%);" alt="love">
                        </div>
                        <span class="text-white" style="filter: blur(2px);">${user.name}</span>
                    </a>
                </div>   
        `;

            userContents.innerHTML += contenttHTML;

        });
    } else {
        const userContainera = document.getElementById('rendadatb');

        userContainera.innerHTML = `
                            <h6>Bienvenue</h6>
                            <h2>Aucun ${what} ne s'est inscrit pour l'instant</h2>
                            <p>Nous n'avons pour l'instant aucun candidat inscrit. Revenez plus tard ou inscrivez-vous.</p>
            
        `;
    };

};


async function SearchData() {
    const search_data = document.getElementById('search_data');
    document.getElementById('sel_service_a').innerText = search_data.value;
    document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${search_data.value}. Cliquez ensuite sur les différents ${search_data.value} pour obtenir plus de détails les concernant
    `;
    document.getElementById('sel_service_d').innerText = search_data.value;
    document.getElementById('sel_service_c').innerText = '0';
    recentProduct([], search_data.value)
}

async function SuggestionSelected(ssd) {
    document.getElementById('sel_service_a').innerText = ssd;
    document.getElementById('sel_service_b').innerText = `
     Veuillez faire défiler vers le bas pour accéder à la liste des ${ssd}. Cliquez ensuite sur les différents ${ssd} pour obtenir plus de détails les concernant
    `;
    document.getElementById('sel_service_d').innerText = ssd;



    const tags_id = document.getElementById('tags_id')
    tags_id.innerHTML = "";
    tags_id.innerHTML = `
                <a class="suggestion_table Nounou" onclick="SuggestionSelected('Nounou')">Nounou</a>
                <a class="suggestion_table Chauffeur" onclick="SuggestionSelected('Chauffeur')">Chauffeur</a>
                <a class="suggestion_table Menage" onclick="SuggestionSelected('Menage')">Menange</a>
                <a class="suggestion_table Chef_Cuisinier" onclick="SuggestionSelected('Chef_Cuisinier')">Chef
                    Cuisinier</a>
                <a class="suggestion_table Maitre_maison" onclick="SuggestionSelected('Maitre_maison')">Maitre de
                    maison</a>
                <a class="suggestion_table Coiffeur" onclick="SuggestionSelected('Coiffeur')">Coiffeur</a>
                <a class="suggestion_table Coiffeuse" onclick="SuggestionSelected('Coiffeuse')">Coiffeuse</a>
                <a class="suggestion_table Coursier" onclick="SuggestionSelected('Coursier')">Coursier</a>
                <a class="suggestion_table Vendeuse" onclick="SuggestionSelected('Vendeuse')">Vendeuse</a>

                <a class="suggestion_table Rayonniste" onclick="SuggestionSelected('Rayonniste')">Rayonniste</a>
                <a class="suggestion_table Rayonnist" onclick="SuggestionSelected('Rayonnist')">Rayonnist</a>
                <a class="suggestion_table Technicien_de_surface"
                    onclick="SuggestionSelected('Technicien_de_surface')">Technicien de surface</a>
                <a class="suggestion_table esthticienne" onclick="SuggestionSelected('esthticienne')">Esthéticienne</a>
                <a class="suggestion_table Teleconseilleur"
                    onclick="SuggestionSelected('Teleconseilleur')">Téléconseilleur</a>

    `;





    $(`.${ssd}`).css("background-color", "#145fb8");
    $(`.${ssd}`).css("color", "#ffffff");

    let sentence = '.Nounou .Rayonnist .Technicien_de_surface .esthticienne .Menage .Chef_Cuisinier .Maitre_maison .Coiffeuse .Coursier .Vendeuse .Teleconseilleur .Coiffeur .Chauffeur .Rayonniste';
    let wordsArray = sentence.split(" ");
    let indexToRemove = wordsArray.indexOf(`.${ssd}`);
    if (indexToRemove !== -1) {
        wordsArray.splice(indexToRemove, 1);
    }
    const listofclassit = wordsArray.join(", ");


    $(`${listofclassit}`).css("background-color", "#eeeeee");
    $(`${listofclassit}`).css("color", "#aaaaaa");

    $(`${listofclassit}`).hover(
        function () {
            // Mouse enter: Change background color and text color
            $(this).css("background-color", "#145fb8");
            $(this).css("color", "#ffffff");
        },
        function () {
            // Mouse leave: Restore initial styles
            $(this).css("background-color", "#eeeeee");
            $(this).css("color", "#aaaaaa");
        }
    );




    try {
        await deleteCandidat();
        const data = await requesttoBackend('GET', `${ssd === "Owner" ? "Nounou" : ssd}`);
        document.getElementById('sel_service_c').innerText = data.length;

        if (data.length > 0) {
            await PostCandidate(data);
            recentProduct(data, ssd)
        } else {
            recentProduct([], ssd)
        }
    } catch (error) {
        console.log(error);

    }

}