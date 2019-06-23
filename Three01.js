var house1;
var house2;
var house3;
var plane;
var controls;
var renderer, scene, camera;
var moving;
var movingLeft, movingRight, movingDown, movingUp;
var gummiPivot = new THREE.Object3D();
var aim;
var levelPivot = new THREE.Object3D();
var sphere;
var plateRock;
var enemy = new THREE.Object3D();
var enemies = []
var enemyBoxes = []
var shooting = 0;
var shot;
var shots = []
var box;
var box2
var shotBoxes = []
var shootControl = 0;
var enemies = []
var score = 0
var scoreText;
var spawnControl = 1
var gummiBox;
var hurtbox;

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

    // Add key handling
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;

    createSpace()
    createGummi()
    createCrossair()

    //Score

    scoreText = document.createElement('div');
    scoreText.style.position = 'absolute';
    //scoreText.style.zIndex = 1;    // if you still don't see the label, try uncommenting this
    scoreText.style.width = 100;
    scoreText.style.height = 100;
    scoreText.style.color = "white";
    scoreText.innerHTML = "Score: " + score;
    scoreText.style.top = 50 + 'px';
    scoreText.style.left = 50 + 'px';
    scoreText.className = "khtext"
    document.body.appendChild(scoreText);

    //Plate Rock

    /* var geometry = new THREE.BoxGeometry(2, 0.1, 2);
    var material = new THREE.MeshBasicMaterial();
    plateRock = new THREE.Mesh(geometry, material);

    levelPivot.add(plateRock) */

    /*objLoader.load('Untitled_1.obj', (event) => {
        const root = event.detail.loaderRootNode;
        root.scale.set(0.02, 0.02, 0.02)
        scene.add(root);
    });*/

    var hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    scene.add(hemisphereLight);

    // directionallight
    directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(100, 80, 50);
    directionalLight.shadow.camera.bottom = -100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.far = 1000;
    directionalLight.castShadow = true;
    scene.add(directionalLight);


    scene.add(levelPivot)
    animate()
}

function createGummi() {

    var gummiWindowGeometry = new THREE.SphereGeometry(1.2, 30, 30);
    var windowMaterial = new THREE.MeshBasicMaterial({ color: 0x21ADFF });
    var gummiWindow = new THREE.Mesh(gummiWindowGeometry, windowMaterial);
    gummiWindow.position.set(0, 1.3, 0)

    gummiPivot.add(gummiWindow)

    var cockpitGeometry = new THREE.BoxGeometry(3, 1.5, 3);
    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var gummiCockpit = new THREE.Mesh(cockpitGeometry, material);
    gummiPivot.add(gummiCockpit);
    gummiCockpit.position.set(0, 0.65, 0)
    var cockpitGeometry2 = new THREE.BoxGeometry(3, 1, 1.5);
    var gummiCockpit2 = new THREE.Mesh(cockpitGeometry2, material);
    gummiCockpit2.position.set(0, -0.5, 0.75)
    gummiPivot.add(gummiCockpit2);

    //#
    var front1Geometry = new THREE.BoxGeometry(2, 2, 1.3);
    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var front1 = new THREE.Mesh(front1Geometry, material);
    front1.position.set(0, 0, 2.15)
    front1.rotation.z += 0.8

    var front2Geometry = new THREE.BoxGeometry(2, 2, 1.3);
    var material = new THREE.MeshBasicMaterial({ color: 0xffe900 });
    var front2 = new THREE.Mesh(front2Geometry, material);
    front2.position.set(0, 0, 3.44)
    front2.rotation.z += 0.8
    var front3Geometry = new THREE.ConeGeometry(1.4, 2.3, 4);
    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var front3 = new THREE.Mesh(front3Geometry, material);
    front3.rotation.x += 1.573
    front3.rotation.y += 1.585
    front3.position.set(0, 0, 5.23)

    gummiPivot.add(front1);
    gummiPivot.add(front2);
    gummiPivot.add(front3)

    //Wings
    var wingboxGeometry = new THREE.BoxGeometry(1.2, 1, 1.5);
    var material = new THREE.MeshBasicMaterial({ color: 0xDD8D01 });
    var wingbox1 = new THREE.Mesh(wingboxGeometry, material);
    var wingbox2 = new THREE.Mesh(wingboxGeometry, material);
    wingbox1.position.set(2.1, -0.5, -0.75)
    wingbox2.position.set(-2.1, -0.5, -0.75)
    gummiPivot.add(wingbox1);
    gummiPivot.add(wingbox2);

    var wingGeometry = createWing()
    var material = new THREE.MeshBasicMaterial({ color: 0xe5e5e5, side: THREE.DoubleSide });
    var wing1 = new THREE.Mesh(wingGeometry, material);
    var wing2 = new THREE.Mesh(wingGeometry, material);
    var wing3 = new THREE.Mesh(wingGeometry, material);
    var wing4 = new THREE.Mesh(wingGeometry, material);

    wing1.position.set(2.5, 0, 0)
    wing2.position.set(2.7, -0.77, 0)
    wing2.rotateZ(-Math.PI / 2)
    wing3.position.set(-2.7, 0, 0)
    wing4.position.set(-2.7, -1, 0)
    wing4.rotateZ(Math.PI / 2)

    gummiPivot.add(wing1);
    gummiPivot.add(wing2);
    gummiPivot.add(wing3);
    gummiPivot.add(wing4);

    //yellow cylinders
    var cylinderGeometry = new THREE.CylinderGeometry(0.55, 0.55, 2.5, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffe900 });
    var cylinder1 = new THREE.Mesh(cylinderGeometry, material);
    cylinder1.position.set(2.05, -0.5, 1.25)
    cylinder1.rotateX(-Math.PI / 2)
    var cylinder2 = new THREE.Mesh(cylinderGeometry, material);
    cylinder2.position.set(-2.05, -0.5, 1.25)
    cylinder2.rotateX(-Math.PI / 2)
    gummiPivot.add(cylinder1);
    gummiPivot.add(cylinder2);

    //red spheres
    var sphereGeometry = new THREE.SphereGeometry(0.55, 32, 32, 0, 6.3, 0, 1.6);
    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var sphere1 = new THREE.Mesh(sphereGeometry, material);
    sphere1.position.set(2.05, -0.5, 2.51)
    sphere1.rotateX(Math.PI / 2)
    var sphere2 = new THREE.Mesh(sphereGeometry, material);
    sphere2.position.set(-2.05, -0.5, 2.51)
    sphere2.rotateX(Math.PI / 2)
    gummiPivot.add(sphere1);
    gummiPivot.add(sphere2);

    //big red cylinder

    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var cylinder3 = new THREE.Mesh(cylinderGeometry, material);
    cylinder3.position.set(-0.7, -1.5, 1.25)
    cylinder3.rotateX(-Math.PI / 2)
    gummiPivot.add(cylinder3);

    var sphere3 = new THREE.Mesh(sphereGeometry, material);
    sphere3.position.set(-0.7, -1.5, 2.51)
    sphere3.rotateX(Math.PI / 2)
    var sphere4 = new THREE.Mesh(sphereGeometry, material);
    sphere4.position.set(-0.7, -1.5, -0.015)
    sphere4.rotateX(-Math.PI / 2)
    gummiPivot.add(sphere3);
    gummiPivot.add(sphere4);

    //Thrusters
    var thrusterGeometry = new THREE.CylinderGeometry(0.55, 0.10, 1, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0x696969 });
    var thruster1 = new THREE.Mesh(thrusterGeometry, material);
    var thruster2 = new THREE.Mesh(thrusterGeometry, material);
    thruster1.position.set(-0.7, -0.65, -0.015)
    thruster1.rotateX(-Math.PI / 2)
    thruster2.position.set(0.7, -0.65, -0.015)
    thruster2.rotateX(-Math.PI / 2)
    gummiPivot.add(thruster1);
    gummiPivot.add(thruster2);

    //Under side Guns
    var holderGeometry = new THREE.BoxGeometry(1.5, 1, 1.5);
    var material = new THREE.MeshBasicMaterial({ color: 0xaf0e0e });
    var gunHolder = new THREE.Mesh(holderGeometry, material);
    gunHolder.position.set(0.75, -1.5, 0.75)
    gummiPivot.add(gunHolder);



    
    //hurtbox

    var geometry = new THREE.BoxGeometry(6, 4.5,7.5);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff , transparent: true , opacity: 0});
    hurtbox = new THREE.Mesh(geometry, material);
    hurtbox.position.set(0, 0,2.3)

    gummiPivot.add(hurtbox)


    gummiPivot.rotation.y += 3.14159
    gummiBox = new THREE.Box3().setFromObject(hurtbox);
    console.log(gummiBox)

    scene.add(gummiPivot)




}

function spawnEnemy() {

    //Loading an obj file
    //const objLoader = new THREE.OBJLoader2();

    if (spawnControl > 0 && spawnControl < 100) {
        //console.log("entrou")
        spawnControl++
    }

    if (spawnControl == 100) {
        spawnControl = 0
    }


    if (spawnControl == 0) {
        const mtlLoader = new THREE.MTLLoader();

        mtlLoader.load('Untitled_2.mtl', function (materials) {
            materials.preload(); // load a material’s resource
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('Untitled_2.obj', function (object) {// load a geometry resource
                mesh = object;
                mesh.position.y = 5;
                mesh.position.x = 0
                mesh.position.z = - 100
                mesh.rotateY(Math.PI)
                //mesh.rotateX(2*Math.PI/18)
                mesh.scale.set(0.02, 0.02, 0.02)
                mesh.name = "enemy"

                mesh.traverse(function (child) {
                    if (child instanceof THREE.Mesh) {

                        // apply custom material
                        child.material.side = THREE.DoubleSide;

                    }
                });

                box2 = new THREE.Box3().setFromObject(mesh);

                //enemy.add(mesh)
                enemies.push(mesh)
                enemyBoxes.push(box2)
                scene.add(mesh)
                //levelPivot.add(enemy);

            });
        });
        spawnControl = 1

    }
    //update

    if (enemies.length > 0) {
        for (let i = 0; i < enemies.length; i++) {
            enemies[i].position.z += 0.1
        }
    }

    for (let i = 0; i < enemies.length; i++) {
        //e preciso alterar o -5
        if (enemies[i].position.z > 10) {
            console.log(enemies[0].position.z)
            console.log("delete")
            scene.remove(enemies[i])
            enemies.splice(i, 1)
            enemyBoxes.splice(i, i)
        }

    }

    for (let i = 0; i < enemies.length; i++) {
        enemyBoxes[i] = new THREE.Box3().setFromObject(enemies[i]);

    }

}

function createCrossair() {
    var geometry = new THREE.PlaneGeometry(5, 5, 32);
    var texture = new THREE.TextureLoader().load("crossair.svg")
    var material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    aim = new THREE.Mesh(geometry, material);
    aim.position.z = 15
    aim.rotateY(Math.PI)
    aim.position.y = 3
    gummiPivot.add(aim)
}

function handleKeyDown(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "1":
            camera.position.z += 0.1
            break;
        case "A":
            moving = true
            movingLeft = true
            break;
        case "D":
            movingRight = true
            moving = true
            break;
        case "W":
            movingUp = true
            moving = true
            break;
        case "S":
            movingDown = true
            moving = true
            break;
        case " ":
            shooting = 1
        default:
            break;
    }
}

function handleKeyUp(event) {
    var char = String.fromCharCode(event.keyCode);
    switch (char) {
        case "A":
            moving = false
            movingLeft = false
            break;
        case "D":
            movingRight = false
            moving = false
            break;
        case "W":
            movingUp = false
            moving = false
            break;
        case "S":
            movingDown = false
            moving = false
            break;
        case " ":
            shooting = 2
        default:
            break;
    }
}

function UpdateGummi() {

    if (movingLeft == true) {
        movingLeft = true
        gummiPivot.position.x -= 0.1
        //aim.position.x -= 0.1
        if (gummiPivot.rotation.z > -0.2)
            gummiPivot.rotation.z -= 0.01
        else
            gummiPivot.rotation.z = -0.2
    }

    if (movingRight == true) {
        gummiPivot.position.x += 0.1
        //aim.position.x += 0.1
        if (gummiPivot.rotation.z < 0.2)
            gummiPivot.rotation.z += 0.01
        else
            gummiPivot.rotation.z = 0.2

    }

    if (movingUp == true) {
        gummiPivot.position.y += 0.1
        //aim.position.y += 0.1
        if (gummiPivot.rotation.x < 0.6)
            gummiPivot.rotation.x += 0.03
        else
            gummiPivot.rotation.x = 0.6
    }

    if (movingDown == true) {
        gummiPivot.position.y -= 0.1
        //aim.position.y -= 0.1
        if (gummiPivot.rotation.x > -0.6)
            gummiPivot.rotation.x -= 0.03
        else
            gummiPivot.rotation.x = -0.6
    }


    if (moving == false) {
        if (gummiPivot.rotation.z < 0) {
            gummiPivot.rotation.z += 0.01
            //console.log("returning from left")
        }


        if (gummiPivot.rotation.z > 0) {
            gummiPivot.rotation.z -= 0.01
            //console.log("returning from right")
        }
        if (gummiPivot.rotation.z == 0) {
            gummiPivot.rotation.z = 0
            //console.log("neutral z")
        }



        if (gummiPivot.rotation.x < 0) {
            gummiPivot.rotation.x += 0.01
            // console.log("returning from above")
        }

        if (gummiPivot.rotation.x > 0) {
            gummiPivot.rotation.x -= 0.01
            //console.log("returning from down")

        }
        if (gummiPivot.rotation.x == 0) {
            gummiPivot.rotation.x = 0
            //console.log("neutral x")
        }

    }

    //updating boundingbox
    gummiBox = new THREE.Box3().setFromObject(hurtbox);
    // console.log(gummiBox.applyMatrix4)


    //colisions
    for (let j = 0; j < enemies.length; j++) {


        //console.log("entrou no for")

        if (gummiBox.intersectsBox(enemyBoxes[j])) {

            console.log("bateu pah")

        }

    }

}

function createWing() {
    let wingGeometry = new THREE.Geometry()

    //vertices
    wingGeometry.vertices.push(new THREE.Vector3(0, 0, 0)) //0
    wingGeometry.vertices.push(new THREE.Vector3(0, 0, -1.5)) //1
    wingGeometry.vertices.push(new THREE.Vector3(0, 1, -1.5)) //2
    wingGeometry.vertices.push(new THREE.Vector3(0.2, 0, 0)) //3
    wingGeometry.vertices.push(new THREE.Vector3(0.2, 0, -1.5)) //4
    wingGeometry.vertices.push(new THREE.Vector3(0.2, 1, -1.5)) //5


    //Wing faces
    wingGeometry.faces.push(new THREE.Face3(0, 1, 2)) //0
    wingGeometry.faces.push(new THREE.Face3(0, 3, 2)) //1
    wingGeometry.faces.push(new THREE.Face3(3, 5, 2)) //2
    wingGeometry.faces.push(new THREE.Face3(3, 4, 5)) //3
    wingGeometry.faces.push(new THREE.Face3(0, 3, 4)) //3
    wingGeometry.faces.push(new THREE.Face3(4, 1, 0)) //3
    wingGeometry.faces.push(new THREE.Face3(2, 1, 4)) //3
    wingGeometry.faces.push(new THREE.Face3(5, 2, 4)) //0

    wingGeometry.computeFaceNormals()

    return wingGeometry
}


function createSpace() {
    var geometry = new THREE.SphereGeometry(80, 32, 32);
    var texture = new THREE.TextureLoader().load("galaxy_starfield.png")
    var material = new THREE.MeshBasicMaterial({ map: texture });
    material.side = THREE.BackSide

    sphere = new THREE.Mesh(geometry, material);


    scene.add(sphere);
}

function createShoot() {
    if (shooting == 1) {
        if (shootControl == 0) {
            // console.log("created")
            var geometry = new THREE.BoxGeometry(0.5, 0.8, 2);
            var material = new THREE.MeshBasicMaterial();
            shot = new THREE.Mesh(geometry, material);

            //shot.position = gummiPivot.position.clone()


            /*
             shot.position.applyMatrix4(gummiPivot.matrixWorld)
            let normalMatrix = new THREE.Matrix4().extractRotation(gummiPivot.matrixWorld)
             let normal = gummiPivot.geometry.faces[8].normal
             let bulletDirection = normal.clone().applyMatrix4(normalMatrix)*/
            shot.position.z = gummiPivot.position.z
            shot.position.x = gummiPivot.position.x
            shot.position.y = gummiPivot.position.y
            // bullet.rotation.x = gummiPivot.rotation.x
            // bullet.rotation.y = gummiPivot.rotation.y
            // bullet.rotation.z = gummiPivot.rotation.z

            shot.dir = aim.position.clone();
            // posição plano (em relação ao pivot)
            shot.dir = shot.dir.clone().applyMatrix4(gummiPivot.matrixWorld); // posição plano em coordenadas mundo

            shot.dir.sub(gummiPivot.position.clone()); // direção = posPlano - posPivot

            shot.dir.multiplyScalar(0.6)

            // calcula direção
            // var aimW = aim.position.clone();

            /*  shot.dir = aim.position.clone()
             shot.dir = shot.dir.clone().applyMatrix4(aim.matrixWorld)
             shot.dir.sub(aim.position.clone())
 
             shot.dir.multiplyScalar(0.2)
  */

            // console.log(aim.position)
            //console.log(shot.position, aim.position, aim.matrixWorld, aimW, shot.dir)

            shot.geometry.computeBoundingBox();
            box = new THREE.Box3().setFromObject(shot);

            shots.push(shot)
            shotBoxes.push(box)
            scene.add(shot)
            shootControl++
        }
    }


    if (shootControl > 0 && shootControl < 5) {
        shootControl++
    }

    if (shootControl == 5) {
        shootControl = 0
    }

    if (shots.length > 0) {

        for (let i = 0; i < shots.length; i++) {

            // shots[i].position.z -= 3
            var b = shots[i];
            b.position.addVectors(b.position.clone(), b.dir);

            shotBoxes[i] = new THREE.Box3().setFromObject(b);

            //console.log(shotBoxes[i].intersectsBox(enemyBoxes[0]))

            for (let j = 0; j < enemies.length; j++) {
                if (shotBoxes[i].intersectsBox(enemyBoxes[j])) {

                    scene.remove(enemies[j])
                    enemies.splice(j, 1)
                    enemyBoxes.splice(j, i)
                    score += 10
                    scoreText.innerHTML = "Score: " + score;
                    console.log(score)
                }

            }

        }

        for (let i = 0; i < shots.length; i++) {
            if (shots[i].position.z < -100) {
                //console.log("delete")
                //console.log(shot)
                scene.remove(shots[i])
                shots.splice(i, 1)
                shotBoxes.splice(i, 1)
            }

        }
    }

    // console.log("length: " + shots.length)

}

let countFramesTrail = 0
let countFramesTrail2 = 0
let trails = []
let trails2 = []

function fireLeft() {
    if (countFramesTrail > 5) {
        // console.log("entrou")
        for (let i = 0; i < 5; i++) {
            //console.log("entra objetos")
            var geometry = new THREE.SphereGeometry(1, 8, 8);
            var material = new THREE.MeshBasicMaterial({ color: 0xFFC723 });

            var sphere1 = new THREE.Mesh(geometry, material);

            sphere1.position.x = 0.7
            sphere1.position.y = -0.7
            sphere1.position.z = -0.15

            sphere1.scale.set(0.05, 0.05, 0.05)

            let vX = Math.random() * 0.01 - 0.005;
            let vY = Math.random() * 0.01 - 0.005;

            gummiPivot.add(sphere1);
            trails.push({ sphere: sphere1, vx: vX, vy: vY })

        }
        countFramesTrail = 0
    }

    trails.forEach((trail, i) => {

        trail.sphere.position.z -= 0.01
        trail.sphere.scale.x += 0.0008
        trail.sphere.scale.y += 0.0008
        trail.sphere.scale.z += 0.0008
        if (trail.sphere.position.z > -1) {
            trail.sphere.position.x += trail.vx
            trail.sphere.position.y += trail.vy
        }
        if (trail.sphere.position.z < -1) {
            trail.sphere.position.x -= trail.vx
            trail.sphere.position.y -= trail.vy
        }

        //trail.sphere.material.opacity -= 0.005

        if (trail.sphere.position.z < -1.85) {

            gummiPivot.remove(trails[i].sphere)
            trails.splice(i, 1)
            i--
        }
    });

    countFramesTrail += 1
}

function fireRight() {
    if (countFramesTrail2 > 5) {
        // console.log("entrou")
        for (let i = 0; i < 5; i++) {
            //console.log("entra objetos")
            var geometry = new THREE.SphereGeometry(1, 8, 8);
            var material = new THREE.MeshBasicMaterial({ color: 0xFFC723 });

            var sphere2 = new THREE.Mesh(geometry, material);

            sphere2.position.x = -0.7
            sphere2.position.y = -0.7
            sphere2.position.z = -0.15

            sphere2.scale.set(0.05, 0.05, 0.05)

            let vX2 = Math.random() * 0.01 - 0.005;
            let vY2 = Math.random() * 0.01 - 0.005;

            gummiPivot.add(sphere2);
            trails2.push({ sphere2: sphere2, vx2: vX2, vy2: vY2 })

        }
        countFramesTrail2 = 0
    }

    trails2.forEach((trail2, i) => {

        trail2.sphere2.position.z -= 0.01
        trail2.sphere2.scale.x += 0.0008
        trail2.sphere2.scale.y += 0.0008
        trail2.sphere2.scale.z += 0.0008
        if (trail2.sphere2.position.z > -1) {
            trail2.sphere2.position.x += trail2.vx2
            trail2.sphere2.position.y += trail2.vy2
        }
        if (trail2.sphere2.position.z < -1) {
            trail2.sphere2.position.x -= trail2.vx2
            trail2.sphere2.position.y -= trail2.vy2
        }

        //trail.sphere.material.opacity -= 0.005

        if (trail2.sphere2.position.z < -1.85) {

            gummiPivot.remove(trails2[i].sphere2)
            trails2.splice(i, 1)
            i--
        }
    });

    countFramesTrail2 += 1
}

function animate() {

    UpdateGummi()
    createShoot()
    spawnEnemy()
    fireLeft()
    fireRight()




    //scene.remove(shot)    
    // animate using requestAnimationFrame
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

    sphere.rotateY(0.0005)
    sphere.rotateX(0.0001)
    //levelPivot.position.x += 0.03
    //enemy.position.z += 0.01
    //plateRock.rotation.x += 0.01
    //console.log(camera.rotation)

}

