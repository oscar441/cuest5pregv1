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

    for (let question in correctAnswers) {
        const selectedOption = form.querySelector(`input[name="${question}"]:checked`);
        if (selectedOption && selectedOption.value === correctAnswers[question]) {
            score++;
            form.querySelector(`input[name="${question}"]:checked`).parentElement.style.color = 'green';
            form.querySelector(`input[name="${question}"]:checked`).parentElement.innerHTML += ' - ¡Correcto!';
        } else if (selectedOption) {
            form.querySelector(`input[name="${question}"]:checked`).parentElement.style.color = 'red';
            form.querySelector(`input[name="${question}"]:checked`).parentElement.innerHTML += ' - Incorrecto';
        }
    }

    resultsDiv.innerHTML = `Tu puntuación es: ${score} de 5`;
}
