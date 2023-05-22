const data = document.currentScript.dataset;
const honestGeneral = parseInt(data.honestGeneral, 10);
const traitorGeneral = parseInt(data.traitorGeneral, 10);
const totalGeneral = parseInt(data.totalGeneral, 10);
const isSupremeTraitor = data.isSupremeTraitor === "True";
const order = parseInt(data.order, 10);
const log = JSON.parse(document.getElementById('log').textContent);
const decided_action = JSON.parse(document.getElementById('decided_action').textContent);

const nodeCount = totalGeneral;

mainAnimation()

async function mainAnimation() {
    console.log("TESTSETESTESTES")
    console.log(decided_action)
    console.log("TESTSETESTESTES")

    if (nodeCount <= 4) {
        // console.log(nodeCount)
        const nodesPositionX = [0, 200, 200, 0];
        const nodesPositionY = [0, 0, 200, 200];
        // console.log(nodesPositionX)
        // console.log(nodesPositionY)
        generateNode(nodeCount, nodesPositionX, nodesPositionY, 500, 200)
        sendMail(nodeCount, nodesPositionX, nodesPositionY, 500, 200)
        await delay(12000);
        hideMail()
        attackRetreatPosition(nodeCount, nodesPositionX, nodesPositionY, 500, 200)

    } else if (nodeCount <= 8) {
        // console.log(nodeCount)
        const nodesPositionX = [0, 100, 200, 250, 200, 100, 0, -50];
        const nodesPositionY = [0, -50, 0, 100, 200, 250, 200, 100];
        // console.log(nodesPositionX)
        // console.log(nodesPositionY)
        generateNode(nodeCount, nodesPositionX, nodesPositionY, 500, 200)
        sendMail(nodeCount, nodesPositionX, nodesPositionY, 500, 200)
        await delay(12000);
        hideMail()
        attackRetreatPosition(nodeCount, nodesPositionX, nodesPositionY, 500, 200)

    } else if (nodeCount <= 12) {
        // console.log(nodeCount)
        const nodesPositionX = [0, 200, 200, 0];
        const nodesPositionY = [0, 0, 200, 200];
        // console.log(nodesPositionX)
        // console.log(nodesPositionY)
    } else if (nodeCount <= 16) {
        // console.log(nodeCount)
        const nodesPositionX = [0, 200, 200, 0];
        const nodesPositionY = [0, 0, 200, 200];
        // console.log(nodesPositionX)
        // console.log(nodesPositionY)
    }
}

function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function generateNode(nodeCount, nodesPositionX, nodesPositionY, startPointX = 0, startPointY = 0) {

    let text = ""
    let traitorCount = traitorGeneral;

    // sementara
    console.log(isSupremeTraitor)
    console.log(log)

    if(isSupremeTraitor){
        for (let i = 0; i < nodeCount; i++) {
            if(traitorCount > 0){
                const nodeIdDiv = "<div class='nodes tnode' id='node-" + i + "'></div>"
                text += nodeIdDiv
                traitorCount -= 1;
            }
            else{
                const nodeIdDiv = "<div class='nodes' id='node-" + i + "'></div>"
                text += nodeIdDiv
            }
        }
        traitorCount = traitorGeneral;
        for (let i = 0; i < nodeCount; i++) {
            const nodemlay = "<div class='mail-layout mlay-" + i + "'>"
            text += nodemlay
            
            if( i === 0){
                const dataBoard = "<div class='data-board' id=db-" + i +"'>"+
                "<p>Supreme General</p>"+
                "<p>Action: retreat</p>"+
                "</div>"
                text += dataBoard
            }
            else{
                const generalNum = ("general_"+i)
                const generalData = log[generalNum]
                console.log(generalData)
                const dataBoard = "<div class='data-board' id=db-" + i +"'>"+
                "<p>Attack: "+ generalData["attack_count"] + "</p>"+
                "<p>Retreat: "+ generalData["retreat_count"] + "</p>"+
                "<p>Action: "+ (decided_action[generalNum]?"attack":"retreat") + "</p>"+
                "</div>"
                text += dataBoard
            }
            

            if(i !== 0 && traitorCount > 0){
                let mOrderClass = (order === 1) ? "mretreat" : "mattack";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail "+mOrderClass+" node-" + i + " mail-" + j + "'></div>"
                        text += mailDiv
                    }
                }
                traitorCount -= 1;
            }
    
            else{
                let mOrderClass = (order === 1) ? "mattack" : "mretreat";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail "+mOrderClass+" node-" + i + " mail-" + j + "'></div>"
                        text += mailDiv
                    }
                }
            }
    
            text += "</div>"
        }
    }
    else{
        for (let i = 0; i < nodeCount; i++) {
            if(i !== 0 && traitorCount > 0){
                const nodeIdDiv = "<div class='nodes tnode' id='node-" + i + "'></div>"
                text += nodeIdDiv
                traitorCount -= 1;
            }
            else{
                const nodeIdDiv = "<div class='nodes' id='node-" + i + "'></div>"
                text += nodeIdDiv
            }
        }
    
        traitorCount = traitorGeneral;
        for (let i = 0; i < nodeCount; i++) {
            const nodemlay = "<div class='mail-layout mlay-" + i + "'>"
            text += nodemlay
            
            if( i === 0){
                const dataBoard = "<div class='data-board' id=db-" + i +"'>"+
                "<p>Supreme General</p>"+
                "<p>Action: "+ (order?"attack":"retreat") + "</p>"+
                "</div>"
                text += dataBoard
            }
            else{
                const generalNum = ("general_"+i)
                const generalData = log[generalNum]
                const dataBoard = "<div class='data-board' id=db-" + i +"'>"+
                "<p>Attack: "+ generalData["attack_count"] + "</p>"+
                "<p>Retreat: "+ generalData["retreat_count"] + "</p>"+
                "<p>Action: "+ (decided_action[generalNum]?"attack":"retreat") + "</p>"+
                "</div>"
                text += dataBoard
            }
           
    
            if(i !== 0 && traitorCount > 0){
                let mOrderClass = (order === 1) ? "mretreat" : "mattack";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail "+mOrderClass+" node-" + i + " mail-" + j + "'></div>"
                        text += mailDiv
                    }
                }
                traitorCount -= 1;
            }
    
            else{
                let mOrderClass = (order === 1) ? "mattack" : "mretreat";
                for (let j = 0; j < nodeCount; j++) {
                    if (i !== j) {
                        const mailDiv = "<div class='mail "+mOrderClass+" node-" + i + " mail-" + j + "'></div>"
                        text += mailDiv
                    }
                }
            }
    
            text += "</div>"
        }
    }

    document.getElementById("nodes-box").innerHTML += text;
    // console.log(text)

    // adjust position
    for (let i = 0; i < nodeCount; i++) {
        const nodeID = "node-" + i
        console.log(nodeID)

        xnodepos = nodesPositionX[i] + startPointX
        ynodepos = nodesPositionY[i] + startPointY

        document.getElementById(nodeID).style.left = (xnodepos + "px");
        document.getElementById(nodeID).style.top = (ynodepos + "px");

        const maillay = document.getElementsByClassName(("mlay-" + i));
        console.log(maillay)
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
        console.log(decided_action[("general_"+(i+1))])

          const nodeID = "node-" + i
        console.log(nodeID)

        const xnodepos = decided_action[i] === 1? (400 + startPointX): (-100 + startPointX)
        const ynodepos = nodesPositionY[i] + (i*5) + startPointY

        console.log(ynodepos)

        document.getElementById(nodeID).style.left = (xnodepos + "px");
        document.getElementById(nodeID).style.top = (ynodepos + "px");

        const maillay = document.getElementsByClassName(("mlay-" + i));
        console.log(maillay)
        Object.values(maillay).forEach(lay => {
            lay.style.left = (xnodepos + "px");
            lay.style.top = (ynodepos + "px");
        });
    }
}