document.addEventListener('DOMContentLoaded', () => {
    const projectBoxes = document.querySelectorAll('.project-box');

    projectBoxes.forEach((box) => {
        box.addEventListener('click', () => {
            const link = box.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank'); // Open the link in a new tab
            }
        });
    });
});
