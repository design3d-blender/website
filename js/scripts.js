var content = document.getElementById("content");
var i;
var speed;
var txt = "";
var isModelLoaded = false;
var engine;
function startWriting(file, clear) {
    i = 0;
    speed = 0;
    content.innerHTML = "";
    if (clear) {
        if (!!document.getElementById("renderCanvas")) {
            document.getElementById("renderCanvas").style.display = 'none';
        }
        if (!!document.getElementById("slider")) {
            document.getElementById("slider").style.display = 'none';
        }
        if (!!document.getElementById("canvas3D")) {
            document.getElementById("canvas3D").style.display = 'none';
        }
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
    }
    fetch(file).then(r => r.text()).then(text => {
        txt = text;
        typeWriter();
    });
}

function typeWriter() {
    //TODO this could be a switch-case style block, if i add more thinks I should rewrite it.
    if (i < txt.length) {
        if (txt.charAt(i) == '?') {
            i++;
            if (txt.charAt(i) == ' ') {
                content.innerHTML += '<span class="bracket">[</span><span class="user">user</span><span class="at">@</span><span class="design3d">DESIGN3D </span><span class="directory">~</span><span class="bracket">]</span>$ ';
            } else {
                let directory = "";
                while (txt.charAt(i) !== ' ' && i < txt.length) {
                    directory += txt.charAt(i);
                    i++;
                }
                content.innerHTML += '<span class="bracket">[</span><span class="user">user</span><span class="at">@</span><span class="design3d">DESIGN3D </span><span class="directory">~/' + directory + '</span><span class="bracket">]</span>$ ';
            }
        } else {
            if (txt.charAt(i) == '%') {
                i++;
                if (txt.charAt(i) == '1') {
                    content.innerHTML += '<a class="links" target="_blank" href="https://github.com/design3d-blender">Click Here!</a>';
                    i++;
                } else {
                    content.innerHTML += '<a class="links" target="_blank" href="https://www.linkedin.com/in/juan-luis-mu%C3%B1oz-ioannidis/">Click Here!</a>';
                    i++;
                }
            } else {
                if (txt.charAt(i) == '#') {
                    i++;
                    let bold = "";
                    while (txt.charAt(i) !== '#' && i < txt.length) {
                        bold += txt.charAt(i);
                        i++;
                    }
                    content.innerHTML += '<span class="bold">'+ bold +'</span>';
                    i++;
                }
            }
            content.innerHTML += txt.charAt(i).replace("\n", "<br/>").replace(/\s/g, '&nbsp;');
        }
        i++;
        setTimeout(typeWriter, speed);
    }
}

function drawPortfolio(file, clear) {
    startWriting(file, clear);
    setTimeout(function () {
        var container = document.getElementById("links");
        var foo = window.getComputedStyle(container, null);
        if (foo.getPropertyValue("display") == 'none') {
            container.style.display = 'block';
        }
    }, 300);
    var items = [...document.getElementsByClassName("item")];
    var i = 0;
    var total = items.length;
    displayItem();

    function displayItem() {
        setTimeout(function () {
            var item = items[i];
            foo = window.getComputedStyle(item, null);
            if (foo.getPropertyValue("display") == 'none') {
                item.style.display = 'inline-block';
            }
            i++;
            if (i < total) {
                displayItem();
            }
        }, 50);
    }
}

function drawShowcase(file, clear) {
    startWriting(file, clear);
    setTimeout(function () {
        var element = document.getElementById("renderCanvas");
        var foo = window.getComputedStyle(element, null);
        if (foo.getPropertyValue("display") == 'none') {
            element.style.display = 'block';
            document.getElementById("canvas3D").style.display = 'block';
            if (!isModelLoaded) {
                start3D();
                isModelLoaded = true;
            } else {
                document.getElementById("slider").style.display = 'block';
                engine.resize();
            }
        }
    }, 300);
}

window.addEventListener("orientationchange", function () {
    if(isModelLoaded){
        engine.resize();
    }
    // alert(window.orientation);
}, false);

function start3D() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    BABYLON.SceneLoader.Load("/demo/", "scene-opt.glb", engine, function (scene) {
        var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("img/hdr/environment.env", scene);
        scene.environmentTexture = hdrTexture;
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
        scene.clearColor = new BABYLON.Color4(0, 0, 0, 0.0000000000000001);
        // Positions the camera overwriting alpha, beta, radius
        camera.setPosition(new BABYLON.Vector3(0, 0, 20));
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);
        // Register a render loop to repeatedly render the scene
        engine.runRenderLoop(function () {
            scene.render();
        });
        // Watch for browser/canvas resize events
        window.addEventListener("resize", function () {
            engine.resize();
        });

        var animation = scene.getAnimationGroupByName("Animation");
        animation.pause();
        var div = document.createElement("div");
        div.id = 'slider';
        var slider = document.createElement("input");
        slider.type = 'range';
        slider.min = 0;
        slider.max = 1.8;
        slider.step = 0.01;
        slider.value = 0;

        document.getElementById('canvas3D').appendChild(div);
        document.getElementById('slider').appendChild(slider);

        slider.oninput = function () {
            animation.goToFrame(this.value);
            console.log(this.value);
        }

        return scene;
    });
}