document.addEventListener("DOMContentLoaded", function () {

    const steps = document.querySelectorAll(".form-step");
    const nextBtns = document.querySelectorAll(".next-btn");
    const progressFill = document.querySelector(".progress-fill");
    const progressText = document.querySelector(".progress-text");

    let currentStep = 0;
    const totalSteps = steps.length;

    function updateProgress() {

        const progressPercent = ((currentStep + 1) / totalSteps) * 100;
        progressFill.style.width = progressPercent + "%";

        progressText.textContent = (currentStep + 1) + " / " + totalSteps;
    }

    function validateStep(step) {

        /* Validate skill checkboxes (at least one) */
        const skillBoxes = step.querySelectorAll('input[name="skills[]"]');

        if (skillBoxes.length) {
            const oneChecked = Array.from(skillBoxes).some(cb => cb.checked);
            if (!oneChecked) {
                return false;
            }
        }

        /* Validate required inputs */
        const inputs = step.querySelectorAll("input[required]");

        for (let input of inputs) {

            if (input.type === "radio") {

                const name = input.name;
                const checked = step.querySelector(`input[name="${name}"]:checked`);

                if (!checked) {
                    return false;
                }

            } else {

                if (!input.value.trim()) {
                    input.focus();
                    return false;
                }

            }
        }

        return true;
    }

    nextBtns.forEach((btn) => {

        btn.addEventListener("click", function () {

            const currentFormStep = steps[currentStep];

            if (!validateStep(currentFormStep)) {
                alert("Ups! Der mangler lidt information i formularen.");
                return;
            }

            /* If it's the submit button, let the form submit */
            if (btn.type === "submit") {
                return;
            }

            steps[currentStep].classList.remove("active");
            currentStep++;

            if (currentStep >= steps.length) {
                currentStep = steps.length - 1;
            }

            steps[currentStep].classList.add("active");

            updateProgress();

            window.scrollTo({
                top: document.querySelector("#cv-generator").offsetTop - 40,
                behavior: "smooth"
            });

        });

    });

    updateProgress();

});