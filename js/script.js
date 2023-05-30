var mesh, renderer, scene, camera, controls;



// Sphere 2
var sphereGeometry2, sphereMaterial2, sphereMesh2;

// Pivot point
var pivotPoint;

// Camera settings
var FOV = 35;
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;
var NEAR = 1;
var FAR = 10000;


init();
animate();


function init() {

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // scene
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(FOV, WIDTH / HEIGHT, NEAR, FAR);


    // controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', render);


    // light
    var light = new THREE.PointLight(0xffffff, 1);

    var DirectionLight = new THREE.DirectionalLight(0xffffff, 1);
    camera.add(DirectionLight);
    camera.add(light);

    camera.position.x = 300;
    camera.position.y = 400;
    camera.position.z = 900;
    camera.lookAt(scene.position);


    scene.add(camera);


    const material_line = new THREE.LineBasicMaterial({
        color: "red",
        lineWidth: 20
    });

    const points = [];
    points.push(new THREE.Vector3(0, 0, 0));
    points.push(new THREE.Vector3(0, 200, 0));


    const geometry_line = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry_line, material_line);
    scene.add(line);


    pivotPoint = new THREE.Object3D();
    line.add(pivotPoint);


    var gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    sphereGeometry2 = new THREE.SphereBufferGeometry(30, 20, 20);

    sphereMaterial2 = new THREE.MeshLambertMaterial({
        color: ' 0x6ed3cf'
    });

    sphereMesh2 = new THREE.Mesh(sphereGeometry2, sphereMaterial2);
    sphereMesh2.position.set(260, 4, 6);

    pivotPoint.add(sphereMesh2);


    var transformControls = new THREE.TransformControls(camera, renderer.domElement);
    transformControls.addEventListener('change', render);

    transformControls.attach(line);
    transformControls.setSize(0.5);
    transformControls.showY = false;
    scene.add(transformControls);

}


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    render();
}

function render() {

    pivotPoint.rotation.y += 0.03;

}