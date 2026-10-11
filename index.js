const usertext = document.getElementById("userInput");
const submit = document.getElementById("send");
const chatbox = document.getElementById("chat")
const historic = [];
submit.addEventListener("click", async function () {
    const paragraph = document.createElement("p");
    const text = usertext.value;
    if (text.trim() === "") {
        return;
    }
    paragraph.innerText = text;
    chatbox.appendChild(paragraph);
    usertext.value = "";
    historic.push({role:"user",content: text})


    const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({messages: historic})
    });
    const data = await response.json();

    historic.push({role:"assistant",content:data.reply})

    const botparagraph = document.createElement("p");
    console.log(data)
    botparagraph.innerText = data.reply;
    
    chatbox.appendChild(botparagraph);
    
});
