document.addEventListener("DOMContentLoaded", function () {
  const scenes = document.querySelectorAll(".scene");
  const backgroundMusic = document.getElementById("background-music");

  if (backgroundMusic) {
    backgroundMusic.play();
  }

  let playerHealth = 100;
  let dragonHealth = 150;

  function animateHit(targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      el.classList.add("flash-hit", "shake");
      setTimeout(() => {
        el.classList.remove("flash-hit", "shake");
      }, 500);
    }
  }

  function updateHealthBars() {
    const playerHealthEl = document.getElementById("player-health");
    const dragonHealthEl = document.getElementById("dragon-health");
    if (playerHealthEl) playerHealthEl.textContent = Math.max(playerHealth, 0);
    if (dragonHealthEl) dragonHealthEl.textContent = Math.max(dragonHealth, 0);
  }

  window.goToScene = function (sceneId) {
    scenes.forEach(scene => scene.classList.remove("active"));
    const target = document.getElementById(sceneId);

    if (sceneId === "scene7") {
      if (localStorage.getItem("hasSword") !== "true") {
        alert("Тобі потрібен чарівний меч, щоб зіткнутись з Вулканічним драконом!");
        return;
      }
      playerHealth = 100;
      dragonHealth = 150;
      updateHealthBars();
      const battleResult = document.getElementById("battle-result");
      if (battleResult) battleResult.innerHTML = "";
    }

    if (target) {
      target.classList.add("active");
      localStorage.setItem("currentScene", sceneId);
      updateInventory();
    }
  };

  function updateInventory() {
    const inventoryList = document.getElementById("inventory-list");
    if (!inventoryList) return;
    inventoryList.innerHTML = "";
    if (localStorage.getItem("hasFruit") === "true") {
      const li = document.createElement("li");
      li.textContent = "🌭 Магічний фрукт";
      inventoryList.appendChild(li);
    }
    if (localStorage.getItem("hasAmulet") === "true") {
      const li = document.createElement("li");
      li.textContent = "🔷 Амулет Древніх Вод";
      inventoryList.appendChild(li);
    }
    if (localStorage.getItem("hasSword") === "true") {
      const li = document.createElement("li");
      li.textContent = "🌈 Меч Балансу";
      inventoryList.appendChild(li);
    }
    if (inventoryList.children.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Порожньо...";
      inventoryList.appendChild(li);
    }
  }

  function initProgress() {
    const currentScene = localStorage.getItem("currentScene");
    if (!currentScene) {
      goToScene("scene1");
    } else {
      goToScene(currentScene);
    }

    const restartBtn = document.getElementById("restart-btn");
    if (restartBtn) {
      restartBtn.addEventListener("click", function () {
        localStorage.clear();
        location.reload();
      });
    }

    const forestGoblinsLinks = document.querySelectorAll("a.forestgoblins");
    forestGoblinsLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        goToScene("scene4");
      });
    });

    const seadragonLinks = document.querySelectorAll("a.seadragon");
    seadragonLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (localStorage.getItem("hasFruit") === "true") {
          goToScene("scene5");
        } else {
          alert("Тобі потрібен фрукт, щоб зустрітися зі змієм!");
        }
      });
    });

    const rainbowElfLinks = document.querySelectorAll("a.raindbowelf");
    rainbowElfLinks.forEach(link => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        if (localStorage.getItem("hasAmulet") === "true") {
          goToScene("scene6");
        } else {
          alert("Ти ще не отримав амулет Древніх Вод!");
        }
      });
    });

    const goblinBtn = document.getElementById("goblin-btn");
    if (goblinBtn) {
      if (localStorage.getItem("goblinQuestCompleted") === "true") {
        goblinBtn.setAttribute("onclick", "lockedScene(event)");
      } else {
        goblinBtn.setAttribute("onclick", "goToScene('scene4')");
      }
    }

    const seadragonBtn = document.getElementById("seadragon-btn");
    if (seadragonBtn) {
      if (localStorage.getItem("seadragonUnlocked") === "true") {
        seadragonBtn.classList.remove("disabled");
        seadragonBtn.setAttribute("onclick", "goToScene('scene5')");
      } else {
        seadragonBtn.classList.add("disabled");
        seadragonBtn.setAttribute("onclick", "lockedScene(event)");
      }
    }

    const elfBtn = document.querySelector(".raindbowelf");
    if (elfBtn) {
      if (localStorage.getItem("seadragonQuestCompleted") === "true") {
        elfBtn.classList.remove("disabled");
        elfBtn.setAttribute("onclick", "goToScene('scene6')");
      } else {
        elfBtn.classList.add("disabled");
        elfBtn.setAttribute("onclick", "lockedScene(event)");
      }
    }

    const vulcanBtn = document.querySelector(".vulkandragon");
    if (vulcanBtn) {
      if (localStorage.getItem("hasSword") === "true") {
        vulcanBtn.style.display = "inline-block";
        vulcanBtn.classList.remove("disabled");
        vulcanBtn.setAttribute("onclick", "goToScene('scene7')");
      } else {
        vulcanBtn.style.display = "none";
        vulcanBtn.classList.add("disabled");
      }
    }

    const scene2Btn = document.querySelector(".Btn");
    if (scene2Btn) {
      scene2Btn.addEventListener("click", function () {
        goToScene("scene2");
      });
    }
  }

  function lockedScene(event) {
    event.preventDefault();
    alert("Ця локація заблокована. Спочатку отримай чарівний меч.");
  }

  function unlockSeadragon() {
    const btn = document.getElementById('seadragon-btn');
    if (btn) {
      btn.classList.remove('disabled');
      btn.setAttribute('onclick', "goToScene('scene5')");
      localStorage.setItem('seadragonUnlocked', 'true');
    }
  }

  window.choose = function (action) {
    const result = document.getElementById('result');
    const caveQuest = document.getElementById('cave-quest');
    const caveResult = document.getElementById('cave-result');

    if (result) result.innerHTML = '';
    if (caveResult) caveResult.innerHTML = '';
    if (caveQuest) caveQuest.style.display = 'none';

    if (action === 'talk') {
      if (result) result.innerHTML = "<p>Гоблін виявився дружнім. Він дарує тобі чарівний листок 🍃 і розповідає про магічну печеру.</p>";
      if (caveQuest) caveQuest.style.display = 'block';
    } else if (action === 'sneak') {
      if (result) result.innerHTML = "<p>Ти намагаєшся пройти повз гобліна... Гілка тріскається!</p>";
    } else if (action === 'fight') {
      if (result) result.innerHTML = "<p>Ти вступаєш у бій! Після сутички гоблін тікає, залишивши фрукти.</p>";
      if (caveQuest) caveQuest.style.display = 'block';
    }

    localStorage.setItem('goblinQuestCompleted', 'true');
  };

  window.caveChoice = function (choice) {
    const caveResult = document.getElementById('cave-result');

    if (choice === 'eat') {
      if (caveResult) caveResult.innerHTML = "<p>Фрукт смачний, але ти втрачаєш здоров'я 💀</p>";
      setTimeout(() => location.reload(), 3000);
    } else if (choice === 'keep') {
      if (caveResult) caveResult.innerHTML = "<p>Ти обережно зберігаєш фрукти 🍛✨</p>";
      localStorage.setItem('hasFruit', 'true');
      setTimeout(() => {
        goToScene('scene2');
        const goblinBtn = document.getElementById('goblin-btn');
        if (goblinBtn) goblinBtn.style.display = 'none';
        unlockSeadragon();
      }, 4000);
    }
  };

  window.seadragonChoice = function (action) {
    const resultDiv = document.getElementById('seadragon-result');
    resultDiv.innerHTML = '';

    if (action === 'give') {
      if (localStorage.getItem('hasFruit') === 'true') {
        resultDiv.innerHTML = "<p>Змій бережно бере фрукт і залишає тобі амулет.</p>";
        localStorage.setItem('hasAmulet', 'true');
        localStorage.removeItem('hasFruit');

        const elfBtn = document.querySelector('.raindbowelf');
        if (elfBtn) elfBtn.classList.remove('disabled');

        setTimeout(() => {
          goToScene('scene2');
          const seadragonBtn = document.getElementById('seadragon-btn');
          if (seadragonBtn) seadragonBtn.style.display = 'none';
        }, 4000);

      } else {
        resultDiv.innerHTML = "<p>У тебе немає фрукта! Змій люто гарчить!</p>";
      }
    } else if (action === 'refuse') {
      resultDiv.innerHTML = "<p>Морський змій сумно занурюється у воду...</p>";
    }
  };

  window.buySword = function () {
    const result = document.getElementById('elf-result');
    if (localStorage.getItem('hasAmulet') === 'true' && localStorage.getItem('hasSword') !== 'true') {
      result.innerHTML = "<p>Ельф вручає тобі чарівний меч 🌈🗡.</p>";
      localStorage.removeItem('hasAmulet');
      localStorage.setItem('hasSword', 'true');

      const vulcanLink = document.querySelector('.vulkandragon');
      if (vulcanLink) {
        vulcanLink.style.display = 'inline-block';
        vulcanLink.classList.remove('disabled');
        vulcanLink.setAttribute('onclick', 'goToScene("scene7")');
      }

      const allLinks = document.querySelectorAll('a');
      allLinks.forEach(link => {
        if (!link.classList.contains('vulkandragon')) {
          link.style.display = 'none';
        }
      });

      setTimeout(() => goToScene('scene2'), 5000);
    } else {
      result.innerHTML = "<p>Ельф заявляє, що ти ще не гідний отримати меч.</p>";
    }
  };

  window.attackDragon = function () {
    const dragonStatus = document.getElementById("dragonStatus");
    const playerStatus = document.getElementById("playerStatus");
    const battleResult = document.getElementById("battle-result");

    if (dragonHealth > 0 && playerHealth > 0) {
      dragonHealth -= 20;
      playerHealth -= 10;
      updateHealthBars();
      animateHit("dragonStatus");

      if (dragonHealth <= 0) {
        battleResult.innerHTML = "<p>Ти переміг дракона!</p>";
        setTimeout(() => goToScene('scene8'), 5000);
      } else if (playerHealth <= 0) {
        battleResult.innerHTML = "<p>Ти загинув у бою 💀</p>";
        setTimeout(() => location.reload(), 3000);
      }
    }
  };

  window.showAmuletInfo = function () {
    const result = document.getElementById('elf-result');
    result.innerHTML = "<p>Амулет Древніх Вод — ключ до створення чарівного меча.</p>";
    if (localStorage.getItem('hasAmulet') === 'true' && localStorage.getItem('hasSword') !== 'true') {
      const exchangeBtn = document.getElementById('exchange-amulet-btn');
      if (exchangeBtn) exchangeBtn.style.display = 'inline-block';
    }
  };

  window.showElfInfo = function () {
    const result = document.getElementById('elf-result');
    result.innerHTML = `
      <p><strong>Ельф:</strong> Я — Ліаріель, останній маг древніх ельфів. Колись ми жили в гармонії з природою.</p>
      <p>Я стережу меч, створений із веселки 🌈</p>`;
  };

  window.showWorldInfo = function () {
    const result = document.getElementById('elf-result');
    result.innerHTML = `
      <p><strong>Ельф:</strong> Еларіонія — це світ, де панувала рівновага. Зараз він у небезпеці.</p>
      <p>Твоя подорож допоможе відновити баланс сил.</p>`;
  };

  initProgress();
});
