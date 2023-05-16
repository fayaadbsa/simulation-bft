

const nodeCount = 7;

if (nodeCount <= 4) {
    console.log(nodeCount)
    const nodesPositionX = [0, 200, 200, 0];
    const nodesPositionY = [0, 0, 200, 200];
    console.log(nodesPositionX)
    console.log(nodesPositionY)
    generateNode(nodeCount, nodesPositionX, nodesPositionY, 500, 200)

} else if (nodeCount <= 8) {
    console.log(nodeCount)
    const nodesPositionX = [0, 100, 200, 250, 200, 100, 0, -50];
    const nodesPositionY = [0, -50, 0, 100, 200, 250, 200, 100];
    console.log(nodesPositionX)
    console.log(nodesPositionY)
    generateNode(nodeCount, nodesPositionX, nodesPositionY, 500, 200)

} else if (nodeCount <= 12) {
    console.log(nodeCount)
    const nodesPositionX = [0, 200, 200, 0];
    const nodesPositionY = [0, 0, 200, 200];
    console.log(nodesPositionX)
    console.log(nodesPositionY)
} else if (nodeCount <= 16) {
    console.log(nodeCount)
    const nodesPositionX = [0, 200, 200, 0];
    const nodesPositionY = [0, 0, 200, 200];
    console.log(nodesPositionX)
    console.log(nodesPositionY)
}


function generateNode(nodeCount, nodesPositionX, nodesPositionY, startPointX = 0, startPointY = 0) {

    let text = ""

    for (let i = 0; i < nodeCount; i++) {
        const nodemlay = "<div class='mail-layout mlay-"+i+"'>"
        text += nodemlay
        const nodeIdDiv = "<div class='nodes' id='node-" + i + "'></div>"
        text += nodeIdDiv

        for (let j = 0; j < nodeCount; j++) {
            if (i !== j){
                const mailDiv = "<div class='mail node-" + i + " mail-" + j + "'></div>"
                text += mailDiv
            }
        }

        text += "</div>"
    }

    document.getElementById("nodes-box").innerHTML += text;
    console.log(text)

    for (let i = 0; i < nodeCount; i++) {
        const nodeID = "node-" + i
        console.log(nodeID)

        xnodepos = nodesPositionX[i] + startPointX
        ynodepos = nodesPositionY[i] + startPointY 

        document.getElementById(nodeID).style.left = (xnodepos + "px");
        document.getElementById(nodeID).style.top = (ynodepos + "px");
        
        const maillay = document.getElementsByClassName(("mlay-"+i));
        console.log(maillay)
        Object.values(maillay).forEach(lay => {
            lay.style.left = (xnodepos+ "px");
            lay.style.top = (ynodepos+ "px");
        });
        
        const mails = document.getElementsByClassName(nodeID);
        // console.log(mails)
        Object.values(mails).forEach(mail => {
            mail.style.left = ((xnodepos + 10)+ "px");
            mail.style.top = ((ynodepos + 10)+ "px");
        });
        
    }

    setTimeout(function() {
        for(let i = 0; i<nodeCount; i++){
            const mailClass = "mail-"+i;
            xnodepos = nodesPositionX[i] + startPointX
            ynodepos = nodesPositionY[i] + startPointY
            
            if(document.getElementsByClassName(mailClass)){
                const mails = document.getElementsByClassName(mailClass);
                console.log(mails)
                
                Object.values(mails).forEach(mail => {
                    mail.style.left = ((xnodepos + 10) + "px");
                    mail.style.top = ((ynodepos + 10) + "px");
                })
            }
        }
    }, 1000);

}