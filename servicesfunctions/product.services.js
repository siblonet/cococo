async function PostPeople(person) {
    const peopledb = await openCopineDatabase();
    const PpTransation = peopledb.transaction(["copineContent"], "readwrite");
    const PpStore = PpTransation.objectStore("copineContent");

    let added = false;
    const adding = PpStore.add(person);

    adding.onsuccess = () => {
        added = true;
    };

    adding.onerror = (event) => {
        console.log("PostPeople", event.target.error);
    };


    return added
}


async function PostCandidate(people) {
    const peopledb = await openCandidatDatabase();
    const PpTransation = peopledb.transaction(["candidatContent"], "readwrite");
    const PpStore = PpTransation.objectStore("candidatContent");

    let added = false;
    people.map(person => {
        const adding = PpStore.add(person);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostCandidate", event.target.error);
        };

    });

    return added
}


async function PostSingleCandidate(person) {
    return new Promise((resolve, reject) => {
        openCandidatDatabase().then(peopledb => {
            const PpTransaction = peopledb.transaction(["candidatContent"], "readwrite");
            const PpStore = PpTransaction.objectStore("candidatContent");

            const adding = PpStore.add(person);

            adding.onsuccess = () => {
                resolve(true);
            };

            adding.onerror = (event) => {
                console.error("Error adding object to PostSingleCandidate store:", event.target.error);
                reject(event.target.error);
            };

            PpTransaction.oncomplete = () => {
                console.log("Transaction completed: database modification finished.");
            };

            PpTransaction.onerror = (event) => {
                console.error("Transaction error:", event.target.error);
                reject(event.target.error);
            };

            PpTransaction.onabort = (event) => {
                console.error("Transaction aborted:", event.target.error);
                reject(event.target.error);
            };
        }).catch(error => {
            console.error("Error opening database:", error);
            reject(error);
        });
    });
}



async function PostJob(jobs) {
    const jobdb = await openJobDatabase();
    const JpTransation = jobdb.transaction(["jobContent"], "readwrite");
    const JpStore = JpTransation.objectStore("jobContent");

    let added = false;
    jobs.map(job => {
        const adding = JpStore.add(job);

        adding.onsuccess = () => {
            added = true;
        };

        adding.onerror = (event) => {
            console.log("PostJob", event.target.error);
        };

    });

    return added
}


async function PostSingleJob(job) {
    return new Promise((resolve, reject) => {
        openJobDatabase().then(jobdb => {
            const JpTransaction = jobdb.transaction(["jobContent"], "readwrite");
            const JpStore = JpTransaction.objectStore("jobContent");

            const adding = JpStore.add(job);

            adding.onsuccess = () => {
                resolve(true);
            };

            adding.onerror = (event) => {
                console.error("Error adding object to PostSingleJob store:", event.target.error);
                reject(event.target.error);
            };

            JpTransaction.oncomplete = () => {
                console.log("Transaction completed: database modification finished.");
            };

            JpTransaction.onerror = (event) => {
                console.error("Transaction error:", event.target.error);
                reject(event.target.error);
            };

            JpTransaction.onabort = (event) => {
                console.error("Transaction aborted:", event.target.error);
                reject(event.target.error);
            };
        }).catch(error => {
            console.error("Error opening database:", error);
            reject(error);
        });
    });
}

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ adding systme as post end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */



async function GetPersonByID(id) {
    return new Promise(async (resolve, reject) => {
        const peopledb = await openCopineDatabase();
        const GPTransation = peopledb.transaction(["copineContent"], "readonly");
        const GPStore = GPTransation.objectStore("copineContent");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const personphone = event.target.result;
            resolve(personphone);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetPersonByID store:", event.target.error);
            reject(event.target.error);
        };
    })

}

async function GetCandidatByID(id) {
    return new Promise(async (resolve, reject) => {
        const peopledb = await openCandidatDatabase();
        const GPTransation = peopledb.transaction(["candidatContent"], "readonly");
        const GPStore = GPTransation.objectStore("candidatContent");

        const requestingByID = GPStore.get(id);

        requestingByID.onsuccess = (event) => {
            const personphone = event.target.result;
            resolve(personphone);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetCandidatByID store:", event.target.error);
            reject(event.target.error);
        };
    })

}

async function GetAllCandidat() {
    const panierdb = await openCandidatDatabase();
    const GPTransation = panierdb.transaction(["candidatContent"], "readonly");
    const GPStore = GPTransation.objectStore("candidatContent");
    return new Promise((resolve, reject) => {
        const pannier = [];

        GPStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                pannier.push(cursor.value);
                cursor.continue();
            } else {
                resolve(pannier);
            }
        };

        GPTransation.onerror = (event) => {
            console.log("GetPannier error: " + event.target.errorCode);
            reject([]);
        };
    });

}




async function GetJobByID(id) {
    return new Promise(async (resolve, reject) => {
        const jobdb = await openJobDatabase();
        const GJTransation = jobdb.transaction(["jobContent"], "readonly");
        const GJStore = GJTransation.objectStore("jobContent");

        const requestingByID = GJStore.get(id);

        requestingByID.onsuccess = (event) => {
            const jobda = event.target.result;
            resolve(jobda);
        };

        requestingByID.onerror = (event) => {
            console.error("Error accessing object GetJobByID store:", event.target.error);
            reject(event.target.error);
        };
    })

}

async function GetAllJob() {
    const jobdb = await openJobDatabase();
    const GJTransation = jobdb.transaction(["jobContent"], "readonly");
    const GJStore = GJTransation.objectStore("jobContent");
    return new Promise((resolve, reject) => {
        const jobs = [];

        GJStore.openCursor().onsuccess = (event) => {
            const cursor = event.target.result;
            if (cursor) {
                jobs.push(cursor.value);
                cursor.continue();
            } else {
                resolve(jobs);
            }
        };

        GJTransation.onerror = (event) => {
            console.log("GetAllJob error: " + event.target.errorCode);
            reject([]);
        };
    });

}
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ getting systme as get end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ putting started @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

async function PutPeople(people) {
    return new Promise(async (resolve, reject) => {
        const panierdb = await openCopineDatabase();
        const PuPTransation = panierdb.transaction(["copineContent"], "readwrite");
        const PuPStore = PuPTransation.objectStore("copineContent");

        const update = PuPStore.put(people);

        update.onsuccess = () => {
            resolve(true);
        };

        update.onerror = (event) => {
            console.error("Error accessing object PutPeople store:", event.target.error);
            reject(false);
        };
    });
}


/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ putting systme as get end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */

/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete start @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */


async function deletePeople() {
    const peopledb = await openCopineDatabase();
    const CPTransation = peopledb.transaction(["copineContent"], "readwrite");
    const CPStore = CPTransation.objectStore("copineContent");

    const clearPeople = CPStore.clear();

    let deleted = false;
    clearPeople.onsuccess = () => {
        deleted = true;
    };

    clearPeople.onerror = (event) => {
        console.error("Error accessing object deletePeople store:", event.target.error);
    };

    return deleted
}

async function deleteCandidat() {
    const peopledb = await openCandidatDatabase();
    const CPTransation = peopledb.transaction(["candidatContent"], "readwrite");
    const CPStore = CPTransation.objectStore("candidatContent");

    const clearPeople = CPStore.clear();

    let deleted = false;
    clearPeople.onsuccess = () => {
        deleted = true;
    };

    clearPeople.onerror = (event) => {
        console.error("Error accessing object deletePeople store:", event.target.error);
    };

    return deleted
}

async function deleteJob() {
    const jobdb = await openJobDatabase();
    const CJTransation = jobdb.transaction(["jobContent"], "readwrite");
    const CJStore = CJTransation.objectStore("jobContent");

    const clearJob = CJStore.clear();

    let deleted = false;
    clearJob.onsuccess = () => {
        deleted = true;
    };

    clearJob.onerror = (event) => {
        console.error("Error accessing object deleteJob store:", event.target.error);
    };

    return deleted
}
/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ deleting systme as delete end @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */