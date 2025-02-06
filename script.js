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
        }
    }

    resultsDiv.innerHTML = `Hola, ${username}. Tu puntuación es: ${score} de 5`;

    // Guarda las respuestas del usuario en el almacenamiento local
    saveUserAnswers(username, userAnswers, score);
}

function saveUserAnswers(username, answers, score) {
    const userResponses = JSON.parse(localStorage.getItem('userResponses')) || [];
    userResponses.push({ username, answers, score });
    localStorage.setItem('userResponses', JSON.stringify(userResponses));
}
