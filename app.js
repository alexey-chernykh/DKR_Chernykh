const app = Vue.createApp({
    data() {
        return {
            isGameStarted: false,
            isVictory: false,
            guess: [],
            answer: [],
            tries: []
        };
    },
    methods: {
        startGame1() {
            this.isGameStarted = true;
            this.guess = [];
            this.answer = [];
            this.tries = [];
            const numberOfDigits = +prompt(
                "Зі скількох цифр буде складатися загадане число?"
            );
            if (
                Number.isNaN(numberOfDigits) ||
                numberOfDigits < 2 ||
                numberOfDigits > 9
            ) {
                alert("Загадане число може складатися лише з 2 до 9 цифр!");
                this.startGame1();
                return;
            }

            const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            for (let i = 0; i < numberOfDigits; i++) {
                const number = digits.splice(-this.getRandomIndex(), 1);
                this.answer.push(number);
            }
        },
        tryToGuess() {
            if (
                Number.isNaN(this.guess) ||
                this.guess.toString().length != this.answer.length
            ) {
                alert("Введіть число з " + this.answer.length + " цифр!");
                return;
            }

            let juniors = 0;
            let seniors = 0;

            for (let i = 0; i < this.answer.length; i++) {
                if (+this.guess.toString().charAt(i) == this.answer[i]) {
                    seniors++;
                } else if (this.arrayContains(this.answer, +this.guess.toString().charAt(i))) {
                    juniors++;
                }
            }

            if (seniors == this.answer.length) {
                this.addTryToTable(this.guess.toString(), "перемога!");
                this.isVictory = true;
                return;
            }
            let hint = `${juniors}j, ${seniors}s`;
            this.addTryToTable(this.guess.toString(), hint);
            return;
        },
        getRandomIndex() {
            return +Math.random().toFixed(1) * 10;
        },
        arrayContains(array, item) {
            for (let i = 0; i < array.length; i++) {
                if (array[i] == item) {
                    return true;
                }
            }
            return false;
        },
        addTryToTable(guess, hint) {
            this.tries.push({"guess": guess, "hint": hint});
        },
    },
});
app.mount("#app");
