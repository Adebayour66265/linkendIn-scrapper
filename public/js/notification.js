let toastBox = document.getElementById('toastBox');

let successMsg = 'Successfully submitted';
let errorMsg = 'Request Failed';
let invalidMsg = 'Invalid input';



function showToast(msg) {
    let toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = msg;
    toastBox.appendChild(toast);


    if (msg.includes('submitted')) {
        toast.classList.add('submitted');
    }
    if (msg.includes('Failed')) {
        toast.classList.add('Failed');
    }
    if (msg.includes('Invalid')) {
        toast.classList.add('Invalid');
    }

    setTimeout(() => {
        toast.remove()
    }, 6000);
}