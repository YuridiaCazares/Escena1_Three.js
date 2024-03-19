import * as THREE from 'three';

function main() {
    // Seleccionar el elemento canvas
    const canvas = document.querySelector('#c');
    // Crear el renderizador WebGL y asociarlo al canvas
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

    // Configuración de la cámara
    const fov = 30; // Campo de visión en grados
    const aspect = 2; // Proporción de aspecto (ancho / alto del canvas)
    const near = 0.5; // Plano de corte cercano
    const far = 20; // Plano de corte lejano
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    // Posicionamiento inicial de la cámara
    camera.position.z = 10;

    // Crear una escena
    const scene = new THREE.Scene();

    // Agregar una luz direccional
    {
        const color = 0xFFFFFF; // Color de la luz
        const intensity = 15; // Intensidad de la luz
        const light = new THREE.DirectionalLight(color, intensity);
        // Posición de la luz
        light.position.set(-1, 2, 4);
        scene.add(light);
    }

    // Crear la esfera
    const sphereGeometry = new THREE.SphereGeometry(0.9, 15, 15); // Geometría de la esfera (radio, segmentos)
    const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0x6649aa }); // Material de la esfera (color)
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // Crear el objeto Mesh (esfera)
    scene.add(sphere); // Agregar la esfera a la escena
    sphere.position.x = -2.3; // Posicionar la esfera en el eje X

    // Crear el cubo
    const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5); // Geometría del cubo (ancho, alto, profundidad)
    const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x5588aa }); // Material del cubo (color)
    const cube = new THREE.Mesh(boxGeometry, boxMaterial); // Crear el objeto Mesh (cubo)
    scene.add(cube); // Agregar el cubo a la escena

    // Crear el cono
    const coneGeometry = new THREE.ConeGeometry(0.5, 2, 10); // Geometría del cono (radio, altura, segmentos)
    const coneMaterial = new THREE.MeshPhongMaterial({ color: 0x21943aa }); // Material del cono (color)
    const cone = new THREE.Mesh(coneGeometry, coneMaterial); // Crear el objeto Mesh (cono)
    scene.add(cone); // Agregar el cono a la escena
    cone.position.x = 2.3; // Posicionar el cono en el eje X

    // Función de renderizado
    function render(time) {
        time *= 0.005; // Factor de tiempo para la animación

        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();

        // Rotar los objetos en función del tiempo y eje
        sphere.rotation.y = time;
        cube.rotation.y = time;
        cone.rotation.x = time;

        // Renderizar la escena desde la perspectiva de la cámara
        renderer.render(scene, camera);

        // Solicitar el próximo cuadro de animación
        requestAnimationFrame(render);
    }

    // Iniciar la animación
    requestAnimationFrame(render);
}

// Llamar a la función principal
main();

