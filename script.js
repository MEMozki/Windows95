document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const taskbarWindows = document.getElementById('taskbar-windows');
    const desktop = document.getElementById('desktop');
    const startMenu = document.getElementById('start-menu');
    const restartButton = document.getElementById('restart-button');
    const windowTemplate = document.getElementById('window-template');

    startButton.addEventListener('click', () => {
        startMenu.style.display = startMenu.style.display === 'none' ? 'block' : 'none';
    });

    restartButton.addEventListener('click', () => {
        restartSystem();
    });

    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            createWindow(icon.dataset.window);
        });
    });

    function createWindow(title) {
        const newWindow = windowTemplate.cloneNode(true);
        newWindow.style.display = 'flex';
        newWindow.style.top = '20vh';
        newWindow.style.left = '20vw';
        newWindow.querySelector('.window-title').textContent = title;
        newWindow.querySelector('.window-close').addEventListener('click', () => {
            newWindow.remove();
            updateTaskbar();
        });
        desktop.appendChild(newWindow);

        const taskbarItem = document.createElement('div');
        taskbarItem.textContent = title;
        taskbarItem.className = 'taskbar-item';
        taskbarWindows.appendChild(taskbarItem);

        updateTaskbar();

        dragElement(newWindow);
    }

    function updateTaskbar() {
        taskbarWindows.innerHTML = '';
        document.querySelectorAll('.window').forEach(window => {
            if (window.style.display !== 'none') {
                const taskbarItem = document.createElement('div');
                taskbarItem.textContent = window.querySelector('.window-title').textContent;
                taskbarItem.className = 'taskbar-item';
                taskbarItem.addEventListener('click', () => {
                    window.style.zIndex = '999';
                });
                taskbarWindows.appendChild(taskbarItem);
            }
        });
    }

    function dragElement(elmnt) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const header = elmnt.querySelector('.window-header');
        if (header) {
            header.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    function restartSystem() {
        document.querySelectorAll('.window').forEach(window => window.remove());
        taskbarWindows.innerHTML = '';
        startMenu.style.display = 'none';
    }
});
