window.onload = function() {
    const savedTime = localStorage.getItem('timer');
    const now = Date.now();
    let totalSeconds = 10 * 60; // 10 minutes

    if (savedTime) {
        const savedData = JSON.parse(savedTime);
        const elapsed = Math.floor((now - savedData.startTime) / 1000);
        totalSeconds = savedData.totalSeconds - elapsed;

        if (totalSeconds <= 0) {
            alert('時間になりました。今すぐ返却してください。');
            localStorage.removeItem('timer');
            return;
        }
    } else {
        localStorage.setItem('timer', JSON.stringify({ totalSeconds, startTime: now }));
    }

    startTimer(totalSeconds);
};

function startTimer(totalSeconds) {
    const timerElement = document.getElementById('time');

    const interval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            alert('時間になりました。今すぐ返却してください。');
            localStorage.removeItem('timer');
        } else {
            totalSeconds--;

            const displayMinutes = Math.floor(totalSeconds / 60);
            const displaySeconds = totalSeconds % 60;

            timerElement.textContent = `残り時間 ${displayMinutes.toString().padStart(2, '0')}:${displaySeconds.toString().padStart(2, '0')}`;
            
            // 毎秒、残り時間を保存
            localStorage.setItem('timer', JSON.stringify({ totalSeconds, startTime: Date.now() }));
        }
    }, 1000);
}
