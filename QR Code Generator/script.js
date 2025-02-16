const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');

let size = sizes.value;
generateBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change',(e)=>{
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', ()=>{
    let img = document.querySelector('.qr-body img');

    if(img !== null){
        let imgAtrr = img.getAttribute('src');
        downloadBtn.setAttribute("href", imgAtrr);
    }
    else{
        downloadBtn.setAttribute("href", `${document.querySelector('canvas').toDataURL()}`);
    }
});
function isEmptyInput() {
    let messageDiv = document.createElement("div");
    messageDiv.textContent = "Enter the text or URL to generate your QR code";
    messageDiv.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #dc3545;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 15px;
        opacity: 1;
        transition: opacity 0.5s ease-in-out;
    `;

    if (qrText.value.length > 0) {
        generateQRCode();
    } else {
        document.body.appendChild(messageDiv);
        setTimeout(() => {
            messageDiv.style.opacity = "0";
            setTimeout(() => messageDiv.remove(), 500);
        }, 1000);
    }
}

function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
        text:qrText.value,
        height:size,
        width:size,
        colorLight:"#f8f9fa",
        colorDark:"#212529",
    });
}

