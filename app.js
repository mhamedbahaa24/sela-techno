
let scene, camera, renderer, model;
let modelUrls = [
    "https://drive.google.com/uc?id=15S1Qy2YHQS6XZQ0U0ik5xM64owfq88C-", // النموذج 1
    "https://drive.google.com/uc?id=18-Wa4TYsw6cmmUfBDwc-G4mt4aeq3Lpm", // النموذج 2
    "https://drive.google.com/uc?id=1wP0xuZS6rZ5UsePTILTUpML5e8yBs8Z3", // النموذج 3
    "https://drive.google.com/uc?id=1lwlORR29hd9bxRzbbI9UMMPVa0QCUMqc", // النموذج 4
    "https://drive.google.com/uc?id=1xAcupIg4hKzDVCMKP39WPtaWraAB-rHR"  // النموذج 5
];
let currentModelIndex = 0; // الفهرس الافتراضي للنموذج

// إعداد المشهد والكاميرا
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;  // تفعيل دعم الواقع الافتراضي
    document.getElementById('3d-container').appendChild(renderer.domElement);

    // إضافة إضاءة
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // تحميل النموذج الأول
    loadModel(modelUrls[currentModelIndex]);

    camera.position.z = 5;
    animate();

    // إضافة زر الواقع الافتراضي
    document.body.appendChild(VRButton.createButton(renderer));
}

// تحميل النموذج
function loadModel(url) {
    const loader = new THREE.GLTFLoader();
    loader.load(url, function(gltf) {
        if (model) {
            scene.remove(model); // إزالة النموذج السابق إذا كان موجود
        }
        model = gltf.scene;
        scene.add(model);
    });
}

// تحريك النموذج
function animate() {
    if (model) {
        model.rotation.x += 0.01;
        model.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();

// إنشاء QR Code
const qrCodeElement = document.getElementById('qrcode');
const qrCode = new QRCode(qrCodeElement, {
    text: modelUrls[currentModelIndex],  // يتم عرض النموذج بناءً على الرابط المحدد
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

// تغيير النموذج عند مسح QR Code
function handleQRCodeScan(url) {
    currentModelIndex = modelUrls.indexOf(url);
    loadModel(modelUrls[currentModelIndex]);
}
