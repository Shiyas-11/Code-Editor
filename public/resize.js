const resizers = document.querySelectorAll('.resizer');
const resizables = document.querySelectorAll('.resizable');

resizers.forEach((resizer, index) => {
    resizer.addEventListener('mousedown', (event) => {
        const startX = event.clientX;
        const startWidth1 = parseInt(getComputedStyle(resizables[index]).width, 10);
        const startWidth2 = parseInt(getComputedStyle(resizables[index === 0 ? 1 : 0]).width, 10);

        const onMouseMove = (event) => {
            const newWidth1 = startWidth1 + (event.clientX - startX);
            const newWidth2 = (startWidth1 + startWidth2) - newWidth1;

            // Set new widths, ensuring both elements stay within the container
            if (newWidth1 > 0 && newWidth2 > 0) {
                resizables[index].style.width = `${newWidth1}px`;
                resizables[index === 0 ? 1 : 0].style.width = `${newWidth2}px`;
            }
        };

        const onMouseUp = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});
