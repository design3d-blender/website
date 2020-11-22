var content = document.getElementById("content");
var i;
var speed;
var txt = "";
var isModelLoaded = false;

function startWriting(file, clear) {
    i = 0;
    speed = 0;
    content.innerHTML = "";
    if (clear) {
        if (!!document.getElementById("renderCanvas")) {
            document.getElementById("renderCanvas").style.display = 'none';
        }
        // if(!!document.getElementById("showcase")){
        //     document.getElementById("showcase").remove();
        // }
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
            if (!isModelLoaded) {
                start3D();
                isModelLoaded = true;
            }
        }
        // element = document.getElementById("modelo");
        // foo = window.getComputedStyle(element, null);
        // if (foo.getPropertyValue("display") == 'none') {
        //     element.style.display = 'block';
        // }
    }, 300);
}

function createScene(engine) {
    var scene = new BABYLON.Scene(engine);

    // Create a default skybox with an environment.
    // var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment.dds", scene);
    // var currentSkybox = scene.createDefaultSkybox(hdrTexture, true);

    // Append glTF model to scene.
    BABYLON.SceneLoader.Append("model/", "scene.glb", scene, function (scene) {
        // Create a default arc rotate camera and light.
        scene.createDefaultCameraOrLight(true, true, true);

        // The default camera looks at the back of the asset.
        // Rotate the camera by 180 degrees to the front of the asset.
        scene.activeCamera.alpha += Math.PI;
    });

    return scene;
}

function start3D() {
    const canvas = document.getElementById("renderCanvas"); // Get the canvas element
    const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    // Add your code here matching the playground format
    BABYLON.SceneLoader.Load("model/", "scene.glb", engine, function (scene) {
        var hdrTexture = new BABYLON.CubeTexture.CreateFromPrefilteredData("img/hdr/environment.env", scene);
        scene.environmentTexture = hdrTexture;
        var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
        scene.clearColor = new BABYLON.Color4(0,0,0,0.0000000000000001);
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
    });
}