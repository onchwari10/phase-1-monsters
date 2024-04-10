document.addEventListener('DOMContentLoaded', () => {
    const monstersUrl = 'http://localhost:3000/monsters';
    const monstersList = document.getElementById('monsters-list');
    const createMonsterForm = document.getElementById('create-monster');
  
    let currentPage = 1;
  
    loadMonsters();
  
    createMonsterForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(createMonsterForm);
      const name = formData.get('name');
      const age = formData.get('age');
      const description = formData.get('description');
  
      try {
        await createMonster({ name, age, description });
        createMonsterForm.reset();
        loadMonsters();
      } catch (error) {
        console.error('Error creating monster:', error);
      }
    });
  
    document.getElementById('next-page').addEventListener('click', () => {
      currentPage++;
      loadMonsters();
    });
  
    async function loadMonsters() {
      const response = await fetch(`${monstersUrl}?_limit=50&_page=${currentPage}`);
      const monsters = await response.json();
      displayMonsters(monsters);
    }
  
    async function createMonster(monsterData) {
      await fetch(monstersUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(monsterData)
      });
    }
  
    function displayMonsters(monsters) {
      monstersList.innerHTML = '';
      monsters.forEach(monster => {
        const monsterItem = document.createElement('li');
        monsterItem.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monstersList.appendChild(monsterItem);
      });
    }
  });
  