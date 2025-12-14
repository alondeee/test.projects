console.log("Script is running!");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
camera.position.z = 75;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const sphereGeometry = new THREE.SphereGeometry(100, 32, 32); 
const sphereMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,   
    side: THREE.BackSide 
});

const OrbitControls = new THREE.OrbitControls(camera, renderer.domElement);
console.log("OrbitControls initialized:", OrbitControls);

const skySphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(skySphere); 

const controls = new THREE.OrbitControls(camera, renderer.domElement);

const starPositions = [];
const starSizes = [];

starPositions.push(10, 15, -40); 
starSizes.push(1.2);      
starPositions.push(0, 8, -40);   
starSizes.push(0.8);      
starPositions.push(-10, 13, -40); 
starSizes.push(1.5);      
starPositions.push(-20, 8, -40);  
starSizes.push(1.0);      
starPositions.push(-30, 5, -40);  
starSizes.push(0.5);      
starPositions.push(-40, 3, -40);  
starSizes.push(0.9);     
starPositions.push(-50, 4, -40);  
starSizes.push(2.0);      

const starTexture = new THREE.TextureLoader().load('Star.png');

const starGeometry = new THREE.BufferGeometry();
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starPositions, 3));
starGeometry.setAttribute('size', new THREE.Float32BufferAttribute(starSizes, 1));

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 10, 
    sizeAttenuation: true,
    map: starTexture,        
    transparent: true,    
    alphaTest: 0.5         
});

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);



const bigDipperConnections = [
  0, 1, 
  1, 2, 
  2, 3,
  3, 4,
  4, 5,
  5, 6
];

function animate() {
    requestAnimationFrame(animate); 
    controls.update(); 
    renderer.render(scene, camera); 
}
animate(); 

console.log("Setup complete! You should see a black sphere.");