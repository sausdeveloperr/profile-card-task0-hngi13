//ms time
function updateTime() {
    const timeDiv = document.getElementById('currentTime');
    const currentTime = Date.now();
    timeDiv.textContent = currentTime;
    
    // pulse toggle 
    timeDiv.classList.add('time-update');
    setTimeout(() => {
        timeDiv.classList.remove('time-update');
    }, 300);
}

updateTime();

setInterval(updateTime, 5000);

//image err
const avatar = document.querySelector('[data-testid="test-user-avatar"]');
avatar.onerror = function() {
    this.src = '';
    this.alt = 'Avatar image failed to load';
    this.style.display = 'none';
};