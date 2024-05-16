document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    const gameArea = document.getElementById('game-area');
    const statsPanel = document.getElementById('stats-panel');
    let reactionTimes = [];
    let gameInterval;
  
    startButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);
    gameArea.addEventListener('click', recordReactionTime);
  
    function startGame() {
      startButton.disabled = true;
      stopButton.disabled = false;
      gameArea.style.backgroundColor = 'blue';
      statsPanel.style.display = 'none';
      reactionTimes = [];
      triggerColorChange();
    }
  
    function stopGame() {
      startButton.disabled = false;
      stopButton.disabled = true;
      clearInterval(gameInterval);
      updateStats();
      statsPanel.style.display = 'block';
    }
  
    function triggerColorChange() {
      gameInterval = setInterval(() => {
        const startTime = new Date().getTime(); // Ustawienie czasu startu przed zmianą koloru
        gameArea.style.backgroundColor = getRandomColor();
        gameArea.onclick = () => recordReactionTime(startTime); // Przekazanie startTime jako argument
      }, Math.random() * 2000 + 1000);
    }
    
  
    function recordReactionTime(startTime) {
      const reactionTime = new Date().getTime() - startTime;
      reactionTimes.push(reactionTime);
      gameArea.style.backgroundColor = 'blue';
      if (reactionTimes.length === 5) {
        stopGame();
      }
    }
  
    function updateStats() {
      const minTime = Math.min(...reactionTimes);
      const maxTime = Math.max(...reactionTimes);
      const avgTime = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
      document.getElementById('min-time').textContent = `Najkrótszy czas reakcji: ${minTime} ms`;
      document.getElementById('max-time').textContent = `Najdłuższy czas reakcji: ${maxTime} ms`;
      document.getElementById('avg-time').textContent = `Średni czas reakcji: ${avgTime.toFixed(2)} ms`;
    }
  
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  });