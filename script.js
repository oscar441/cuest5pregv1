function checkAnswers() {
    const correctAnswers = {
        q1: '5',
        q2: '7',
        q3: '8',
        q4: '6',
        q5: '8'
    };

    let score = 0;
    const form = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('results');
    const username = document.getElementById('username').value;
    const account = document.getElementById('account').value;
    const userAnswers = {};

    for (let question in correctAnswers) {
        const selectedOption = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption) {
            userAnswers[question] = selectedOption.value;
            if (selectedOption.value === correctAnswers[question]) {
                score++;
                form.querySelector(`input[name="${question}"]:checked`).parentElement.style.color = 'green';
                form.querySelector(`input[name="${question}"]:checked`).parentElement.innerHTML += ' - ¡Correcto!';
            } else {
                form.querySelector(`input[name="${question}"]:checked`).parentElement.style.color = 'red';
                form.querySelector(`input[name="${question}"]:checked`).parentElement.innerHTML += ' - Incorrecto';
            }
        } else {
            userAnswers[question] = 'No contestada';
        }
    }

    resultsDiv.innerHTML = `Hola, ${username}. Tu puntuación es: ${score} de 5`;

    // Guarda las respuestas del usuario en el almacenamiento local
    saveUserAnswers(username, account, userAnswers, score);
}

function saveUserAnswers(username, account, answers, score) {
    const userResponses = JSON.parse(localStorage.getItem('userResponses')) || [];
    userResponses.push({ username, account, answers, score });
    localStorage.setItem('userResponses', JSON.stringify(userResponses));
}

function showResults() {
    const userResponses = JSON.parse(localStorage.getItem('userResponses')) || [];
    const savedResultsDiv = document.getElementById('saved-results');
    savedResultsDiv.innerHTML = '';

    if (userResponses.length === 0) {
        savedResultsDiv.innerHTML = 'No hay resultados guardados.';
    } else {
        userResponses.forEach(response => {
            const resultHTML = `
                <div class="saved-result">
                    <h3>Usuario: ${response.username} (Cuenta: ${response.account})</h3>
                    <p>Puntuación: ${response.score} de 5</p>
                    <ul>
                        ${Object.entries(response.answers).map(([question, answer]) => `<li>${question}: ${answer}</li>`).join('')}
                    </ul>
                </div>
            `;
            savedResultsDiv.innerHTML += resultHTML;
        });
    }
}
