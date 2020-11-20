var content = document.getElementById("content");
var i;
var speed;
var txt = "";

function startWriting(file) {
    i = 0;
    speed = 0;
    content.innerHTML = "";
    var container = document.getElementById("links");
    var foo = window.getComputedStyle(container, null);
    if (foo.getPropertyValue("display") == 'block') {
        container.style.display = 'none';
        var items = document.getElementsByClassName("item");
        for (let item of items) {
            foo = window.getComputedStyle(item, null);
            if (foo.getPropertyValue("display") == 'inline-block') {
                item.style.display = 'none';
            }
        }
    }
    fetch(file).then(r => r.text()).then(text => {
        txt = text;
        typeWriter();
        // console.log(txt);
    });
}

function typeWriter() {
    if (i < txt.length) {
        content.innerHTML += txt.charAt(i).replace("\n", "<br/>").replace(/\s/g, '&nbsp;');
        i++;
        setTimeout(typeWriter, speed);
    }
}

// function drawPortfolio(){
//     docReady(drawPortfolio);
// }

function drawPortfolio(file) {
    startWriting(file);
    setTimeout(function () {
        var container = document.getElementById("links");
        var foo = window.getComputedStyle(container, null);
        if (foo.getPropertyValue("display") == 'none') {
            container.style.display = 'block';
            // var items = document.getElementsByClassName("item");
            // for (let item of items) {
            //     foo = window.getComputedStyle(item, null);
            //     if (foo.getPropertyValue("display") == 'none') {
            //         displayItem(item);
            //     }
            // }
        }
    }, 250);
    var items = [...document.getElementsByClassName("item")];
    var i = 0;
    var total=items.length;
    // for (let item of items) {
    //     foo = window.getComputedStyle(item, null);
    //     if (foo.getPropertyValue("display") == 'none') {
    //         displayItem(item);
    //     }
    // }
    displayItem();
    function displayItem() {
        setTimeout(function () {
            foo = window.getComputedStyle(items[i], null);
            if (foo.getPropertyValue("display") == 'none') {
                item[i].style.display = 'inline-block';
            }
            i++;
            if(i<total){
                displayItem();
            }
        }, 500);
    }
}

// function docReady(fn) {
//     // see if DOM is already available
//     if (document.readyState === "complete" || document.readyState === "interactive") {
//         // call on next available tick
//         setTimeout(fn, 1);
//     } else {
//         document.addEventListener("DOMContentLoaded", fn);
//     }
// } 