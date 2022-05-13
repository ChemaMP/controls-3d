import * as THREE from '../jsm/three.module.js';
import {PointerLockControls} from '../jsm/PointerLockControls.js';

let camera, scene, renderer, pControl
let xdir = 0, zdir = 0
let tiempoI, tiempoF, vel, delta

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000)
scene.fog = new THREE.Fog(0xfa0000, 0, 500)

scene.add(new THREE.GridHelper(10000, 1000, 0xfa0000, 0xfa0000))
let mesh = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,10),
    new THREE.MeshLambertMaterial({color: 0x1966ff})
)
mesh.position.z = -50
scene.add(mesh)

scene.add(new THREE.HemisphereLight(0x96529C))//agregamos luz

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.y = 10

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild( renderer.domElement );

pControl = new PointerLockControls(camera, renderer.domElement)//esta a la espera de la activación por un
//evento como por ejemplo al dar click en un boton

document.getElementById('btnPlay').onclick = ()=>{
    pControl.lock()//metodo de activación del control
}

document.addEventListener('keydown', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = -1
            break;
        case 38:
            zdir = 1
            break;
        case 39:
            xdir = 1
            break;
        case 40:
            zdir = -1
            break;
    }
})

document.addEventListener('keyup', (e)=>{
    switch (e.keyCode) {
        case 37:
            xdir = 0
            break;
        case 38:
            zdir = 0
            break;
        case 39:
            xdir = 0
            break;
        case 40:
            zdir = 0
            break;
    }
})

tiempoI = Date.now()
vel = 50

animate()

function animate() {

    requestAnimationFrame( animate );

    if(pControl.isLocked === true){
        tiempoF = Date.now()

        delta = (tiempoF - tiempoI)/1000

        let xDis = xdir * vel * delta
        let zDis = zdir * vel * delta

        pControl.moveRight(xDis)
        pControl.moveForward(zDis)

        tiempoI = tiempoF
    }

    renderer.render( scene, camera );
}
