const scene = new THREE.Scene();

// 2. CREATE THE CAMERA (your eyes)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // Move the camera back so we can see things

// 3. CREATE THE RENDERER (the painter)
const renderer = new THREE.WebGLRenderer(); // Let Three.js create the canvas element for us
renderer.setSize(window.innerWidth, window.innerHeight); // Make it fill the window
document.body.appendChild(renderer.domElement); // Add the canvas to the page

// 4. CREATE THE SKY SPHERE (the black void)
const sphereGeometry = new THREE.SphereGeometry(100, 32, 32); // A large sphere
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,    // Black color
    side: THREE.BackSide // Paint the INSIDE of the sphere
});
const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(skySphere); // Add the sphere to the scene

// 5. ENABLE MOUSE CONTROLS
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const starPositions = [];

function createStar(x, y, z) {
    const starGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(starGeometry, starMaterial);
    star.position.set(x, y, z);
    scene.add(star);

    starPositions.push(new THREE.Vector3(x, y, z));
};


//Random
createStar(-10, -10, 30);
createStar(-15, -5, 35);
createStar(-5, -12, 40);
createStar(-8, -8, 45);
createStar(-20, -5, 30);
createStar(-10, 20, 30);
createStar(-15, 15, 35);
createStar(-5, 42, 40);
createStar(-8, 70, 45);
createStar(-20, 30, 50);
createStar(-10, -10, 65);
createStar(-15, -5, 25);
createStar(-5, -12, 80);
createStar(-8, -8, 75);
createStar(-20, -5, 10);

// BIG DIPPER PATTERN (rough coordinates)
createStar(5, 15, -40);    // Top of the bowl
createStar(3, 12, -40);    // Bottom of the bowl
createStar(-2, 13, -40);   // Other side of bowl
createStar(-4, 10, -40);   // Bottom of handle
createStar(-8, 8, -40);    // Middle of handle
createStar(-12, 6, -40);   // End of handle
createStar(-15, 4, -40);   // Tip of handle

// Cassiopeia - The Queen (W shape)
createStar(-8, 50, 20);  // Top left of W
createStar(-5, 42, 20);  // First dip
createStar(-2, 50, 20);  // Middle peak  
createStar(1, 42, 20);   // Second dip
createStar(4, 50, 20);   // Top right of W

// After creating all your stars, add this:
function createConstellationLines() {
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(starPositions);
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(line);
}

// Call this after all createStar() calls
createConstellationLines();

// 6. CREATE THE ANIMATION LOOP
function animate() {
    requestAnimationFrame(animate); // Loop this function
    controls.update(); // Update controls every frame
    renderer.render(scene, camera); // Paint the scene
}
animate(); // Start the loop

console.log("Setup complete! You should see a black sphere.");