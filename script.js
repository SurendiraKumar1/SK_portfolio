// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const container = document.getElementById("three-container");
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Add 3D buttons
const materials = [
    new THREE.MeshBasicMaterial({ color: 0x007bff }),
    new THREE.MeshBasicMaterial({ color: 0xff5733 }),
    new THREE.MeshBasicMaterial({ color: 0x33c4ff }),
];

const buttons = ["Soft Skills", "Experience", "Technical Skills"];
const cubes = [];
buttons.forEach((button, i) => {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const cube = new THREE.Mesh(geometry, materials[i]);
    cube.position.x = i * 3 - 3; // Arrange cubes horizontally
    cubes.push({ cube, content: button });
    scene.add(cube);
});

// Camera position
camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cubes.forEach(({ cube }) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });
    renderer.render(scene, camera);
}
animate();

// Add interactivity
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(cubes.map(({ cube }) => cube));

    if (intersects.length > 0) {
        const clickedCube = intersects[0].object;
        const selected = cubes.find(({ cube }) => cube === clickedCube);
        if (selected) {
            document.getElementById("content-title").textContent = selected.content;
            document.getElementById("content-description").textContent =
                selected.content === "Soft Skills"
                    ? "Team Leadership, Time Management, Problem-Solving, Quick Learning, Slide Presentation."
                    : selected.content === "Experience"
                    ? "Internship at Clover Technologies, Coordinated intercollegiate quiz events."
                    : "C, C++, HTML, CSS, Python, Java, SQL, JavaScript.";
        }
    }
}

window.addEventListener("click", onMouseClick);
