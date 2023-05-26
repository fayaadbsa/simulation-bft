const data = document.currentScript.dataset;
const honestGeneral = parseInt(data.honestGeneral, 10);
const traitorGeneral = parseInt(data.traitorGeneral, 10);
const totalGeneral = parseInt(data.totalGeneral, 10);
const isSupremeTraitor = data.isSupremeTraitor === "True";
const order = parseInt(data.order, 10);
const log = JSON.parse(document.getElementById('log').textContent);
const decided_action = JSON.parse(document.getElementById('decided_action').textContent);

const nodeCount = totalGeneral;
let phase = 0;




// console.log("TESTSETESTESTES")
// console.log(log)
// console.log("TESTSETESTESTES")

const nodesPositionX = 
    nodeCount <= 4 ? [0, 200, 200, 0] :
    nodeCount <= 8 ? [0, 100, 200, 250, 200, 100, 0, -50] :
    nodeCount <= 12 ?[0, 25, 75, 150, 225, 275, 300, 275, 225, 150, 75, 25] :
    [0, 25, 50,100, 150, 200,250, 275, 300, 275, 250, 200,150 , 100, 50,25] 


const nodesPositionY = 
    nodeCount <= 4 ? [0, 0, 200, 200] :
    nodeCount <= 8 ? [0, -50, 0, 100, 200, 250, 200, 100] :
    nodeCount <= 12 ?[0, -75, -125, -150, -125, -75, 0, 75, 125, 150, 125, 75]:
    [0, -50, -100, -125, -150, -125,-100, -50, 0, 50,100, 125, 150, 125,100, 50]

const xcenter = 500


const ycenter = 
    nodeCount <= 8 ? 200 : 300 


generateNode(nodeCount, nodesPositionX, nodesPositionY, xcenter, ycenter)

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

async function buttonPhase(){
    // console.log("button work")
    if(phase === 1){
        document.getElementById("phase-button").disabled = true; 
        sendMail(nodeCount, nodesPositionX, nodesPositionY, xcenter, ycenter)
        await delay(12000)
        hideMail()
        phase += 1;
        document.getElementById("phase-button").disabled = false; 
        document.getElementById("phase-button").innerHTML = "Conclusion"; 
    }
    else if(phase === 2){
        phase += 1;
        attackRetreatPosition(nodeCount, nodesPositionX, nodesPositionY, xcenter, ycenter)
        document.getElementById("phase-button").disabled = true; 
    }
}

function generateNode(nodeCount, nodesPositionX, nodesPositionY, startPointX = 0, startPointY = 0) {

    let text = ""
    let traitorCount = traitorGeneral;

    if (isSupremeTraitor) {
        for (let i = 0; i < nodeCount; i++) {
            if (traitorCount > 0) {
                const nodeIdDiv = "<div class='nodes tnode' id='node-" + i + "'><i class='fa-regular fa-user'></i></div>"
                text += nodeIdDiv
                traitorCount -= 1;
            }
            else {
                const nodeIdDiv = "<div class='nodes' id='node-" + i + "'><i class='fa-regular fa-user'></i></div>"
                text += nodeIdDiv
            }
        }
        traitorCount = traitorGeneral;
        for (let i = 0; i < nodeCount; i++) {
            const nodemlay = "<div class='mail-layout mlay-" + i + "'>"
            text += nodemlay

            if (i === 0) {
                const dataBoard = "<div class='data-board' id=db-" + i + "'>" +
                    "<p>Supreme General</p>" +
                    "<p class='db-action-r-word'>Action: retreat</p>" +
                    "</div>"
                text += dataBoard
            }
            else {
                const generalNum = ("general_" + i)
                const generalData = log[generalNum]
                // console.log(generalData)
                const dataBoard = "<div class='data-board' id=db-" + i + "'>" +
                    "<p class='db-attack-word'>Attack: " + generalData["attack_count"] + "</p>" +
                    "<p class='db-reatreat-word'>Retreat: " + generalData["retreat_count"] + "</p>" +
                    "<p class='"+ (decided_action[generalNum] ?"db-action-a-word":"db-action-r-word") +"'>Action: " + (decided_action[generalNum] ? "attack" : "retreat") + "</p>" +
                    "</div>"
                text += dataBoard
            }


            if (traitorCount > 0) {
                // console.log("traitor: " + traitorCount)
                if (i === 0) {
                    for (let j = 0; j < nodeCount; j++) {
                        let mOrderClass = (j % 2 === 0) ? "mretreat" : "mattack";
                        if (i !== j) {
                            const mailDiv = "<div class='mail " + mOrderClass + " node-" + i + " mail-" + j + "'><i class='fa-regular fa-envelope'></i></div>"
                            text += mailDiv
                        }
                    }
                }
                else {
                    let mOrderClass = (i % 2 === 0) ? "mattack" : "mretreat";
                    for (let j = 0; j < nodeCount; j++) {
                        if (i !== j) {
                            const mailDiv = "<div class='mail " + mOrderClass + " node-" + i + " mail-" + j + "'><i class='fa-regular fa-envelope'></i></div>"
                            text += mailDiv
                        }
                    }
                }
                traitorCount -= 1;
            }

            else {
                let mOrderClass = (i % 2 === 0) ? "mretreat" : "mattack";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail " + mOrderClass + " node-" + i + " mail-" + j + "'><i class='fa-regular fa-envelope'></i></div>"
                        text += mailDiv
                    }
                }
            }

            text += "</div>"
        }
    }
    else {
        for (let i = 0; i < nodeCount; i++) {
            if (i !== 0 && traitorCount > 0) {
                const nodeIdDiv = "<div class='nodes tnode' id='node-" + i + "'><i class='fa-regular fa-user'></i></div>"
                text += nodeIdDiv
                traitorCount -= 1;
            }
            else {
                const nodeIdDiv = "<div class='nodes' id='node-" + i + "'><i class='fa-regular fa-user'></i></div>"
                text += nodeIdDiv
            }
        }

        traitorCount = traitorGeneral;
        for (let i = 0; i < nodeCount; i++) {
            const nodemlay = "<div class='mail-layout mlay-" + i + "'>"
            text += nodemlay

            if (i === 0) {
                const dataBoard = "<div class='data-board' id=db-" + i + "'>" +
                    "<p>Supreme General</p>" +
                    "<p class='"+ (order ?"db-action-a-word":"db-action-r-word") +"'>Action: " + (order ? "attack" : "retreat") + "</p>" +
                    "</div>"
                text += dataBoard
            }
            else {
                const generalNum = ("general_" + i)
                const generalData = log[generalNum]
                const dataBoard = "<div class='data-board' id=db-" + i + "'>" +
                    "<p class='db-attack-word'>Attack: " + generalData["attack_count"] + "</p>" +
                    "<p class='db-retreat-word'>Retreat: " + generalData["retreat_count"] + "</p>" +
                    "<p class='"+ (decided_action[generalNum] ?"db-action-a-word":"db-action-r-word") +"'>Action: " + (decided_action[generalNum] ? "attack" : "retreat") + "</p>" +
                    "</div>"
                text += dataBoard
            }


            if (i !== 0 && traitorCount > 0) {
                let mOrderClass = (order === 1) ? "mretreat" : "mattack";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail " + mOrderClass + " node-" + i + " mail-" + j + "'><i class='fa-regular fa-envelope'></i></div>"
                        text += mailDiv
                    }
                }
                traitorCount -= 1;
            }

            else {
                let mOrderClass = (order === 1) ? "mattack" : "mretreat";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail " + mOrderClass + " node-" + i + " mail-" + j + "'><i class='fa-regular fa-envelope'></i></div>"
                        text += mailDiv
                    }
                }
            }

            text += "</div>"
        }
    }

    document.getElementById("nodes-box").innerHTML += text;
    // console.log(text)

    document.getElementById("node-0").innerHTML = "<i class='fa-regular fa-chess-king'></i>";

    // adjust position
    for (let i = 0; i < nodeCount; i++) {
        const nodeID = "node-" + i
        // console.log(nodeID)

        xnodepos = nodesPositionX[i] + startPointX
        ynodepos = nodesPositionY[i] + startPointY

        document.getElementById(nodeID).style.left = (xnodepos + "px");
        document.getElementById(nodeID).style.top = (ynodepos + "px");

        const maillay = document.getElementsByClassName(("mlay-" + i));
        // console.log(maillay)
        Object.values(maillay).forEach(lay => {
            lay.style.left = (xnodepos + "px");
            lay.style.top = (ynodepos + "px");
        });

        const mails = document.getElementsByClassName(nodeID);
        // console.log(mails)
        Object.values(mails).forEach(mail => {
            mail.style.left = ((xnodepos + 10) + "px");
            mail.style.top = ((ynodepos + 10) + "px");
        });
    }
    const buttonText = "<button type='button' id='phase-button' onclick='buttonPhase();'>Send Mail</button><a href='/'><button type='button'>New Simulation</button></a>";
    document.getElementById("button-box").innerHTML += buttonText;
    phase += 1;
}

function sendMail(nodeCount, nodesPositionX, nodesPositionY, startPointX = 0, startPointY = 0) {
    for (let i = 0; i < nodeCount; i++) {
        const mailClass = "node-" + i;
        if (document.getElementsByClassName(mailClass)) {
            const mails = document.getElementsByClassName(mailClass);
            // console.log(mails)
            let counter = 0;
            let delayTime = 5500;
            Object.values(mails).forEach(mail => {
                if (i == 0) { delayTime = 0 }
                setTimeout(function () {
                    mail.style.opacity = "0.6";
                    if (i === counter) { counter += 1 }
                    xnodepos = nodesPositionX[counter] + startPointX
                    ynodepos = nodesPositionY[counter] + startPointY
                    // console.log(mail)
                    mail.style.left = ((xnodepos + 10) + "px");
                    mail.style.top = ((ynodepos + 10) + "px");
                    // console.log(i)
                    // console.log(counter)
                    counter += 1;
                }, delayTime)

            })
        }
    }
}

function hideMail() {
    const allmail = document.getElementsByClassName("mail");
    Object.values(allmail).forEach(mail => {
        mail.style.display = "none";
    })

    const allDb = document.getElementsByClassName("data-board");
    Object.values(allDb).forEach(db => {
        db.style.display = "block";
    })
}

function attackRetreatPosition(nodeCount, nodesPositionX, nodesPositionY, startPointX = 0, startPointY = 0) {
    for (let i = 0; i < nodeCount; i++) {
        const nodeID = "node-" + i
        const decide_act = i === 0 ? decided_action["supreme_general"] : decided_action[("general_" + i)]

        // console.log(nodeID + " " + decide_act)
        // console.log(decided_action)

        const xnodepos = decide_act === 1 ? (400 + startPointX) : (-100 + startPointX)
        const ynodepos = nodesPositionY[i] + (i * 10) + startPointY


        document.getElementById(nodeID).style.left = (xnodepos + "px");
        document.getElementById(nodeID).style.top = (ynodepos + "px");

        const maillay = document.getElementsByClassName(("mlay-" + i));
        Object.values(maillay).forEach(lay => {
            lay.style.left = (xnodepos + "px");
            lay.style.top = (ynodepos + "px");
        });
    }
}