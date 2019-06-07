var fire = []
// once everything is loaded, we run our Three.js stuff
window.onload = function init() {

    /*********************
 * SCENE 
 * *******************/
    // create an empty scene, that will hold all our elements such as objects, cameras and lights
    scene = new THREE.Scene();


    /*********************
     * CAMERA 
     * *******************/
    // create a camera, which defines where we're looking at
    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
    camera.position.z = 11.5;
    camera.position.y = 4;


    controls = new THREE.OrbitControls(camera);
    controls.addEventListener('change', function () { renderer.render(scene, camera); });
    /*********************
     * RENDERER 
     * *******************/
    // create a render and set the size
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // configure renderer clear color
    renderer.setClearColor("#000000");

    // add the output of the renderer to an HTML element (this case, the body)
    document.body.appendChild(renderer.domElement);

    createParticle()
    console.log(Math.random() * 0.02 - 0.01);
    animate()
}


function createParticle(w, h, color) {
    var geometry = new THREE.PlaneGeometry(0.5, 0.5, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    fire.push(plane)
}


function animate() {

    fire[0].position.z += 0.1
    fire[0].position.x += Math.random() * 0.02 - 0.01
    fire[0].rotateY(0.009)
    fire[0].rotateZ(0.009)

    if (fire[0].position.z > 4) {
        fire[0].position.z = 0

    }
    
    if (fire[0].position.x > 4) {
        fire[0].position.x = 0

    }

    // animate using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}