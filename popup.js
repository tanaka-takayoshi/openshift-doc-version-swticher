function reply_click(clicked_id)
{
    console.log(clicked_id + " : clicked");
    chrome.extension.sendMessage({
        action: "changeVer",
        ver: clicked_id
    });
    window.close();
}

var divs = document.body.querySelectorAll('button.btnOpen');
for (var i = 0; i < divs.length; i++) {
    const id = divs[i].id;
    divs[i].onclick = () => {reply_click(id);}
}