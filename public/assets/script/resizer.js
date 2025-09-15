(() => {
    /* 添加面板宽度调整功能 */
    const resizer = document.getElementById('resizer');
    const cardArea = document.getElementById('cardArea');
    const codeArea = document.getElementById('codeArea');
    const mainContainer = document.querySelector('.main-container');

    resizer.addEventListener('mousedown', function (e) {
        isResizing = true;
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
        e.preventDefault();
    });

    function handleResize(e) {
        if (!isResizing) return;

        const containerRect = mainContainer.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const containerWidth = containerRect.width - 4; // 减去分隔条宽度

        // 计算左侧面板宽度百分比
        let leftWidth = (mouseX / containerWidth) * 100;

        // 限制最小和最大宽度
        leftWidth = Math.max(25, Math.min(75, leftWidth));

        const rightWidth = 100 - leftWidth;

        cardArea.style.width = leftWidth + '%';
        codeArea.style.width = rightWidth + '%';
        Blockly.svgResize(Blockly.workspace);
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', handleResize);
        document.removeEventListener('mouseup', stopResize);
    }

    // 防止在调整大小时选中文本
    resizer.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });

    const verticalResizer = document.getElementById('verticalResizer');
    const codeDisplay = document.getElementById('codeDisplay');
    const consoleArea = document.getElementById('consoleArea');

    verticalResizer.addEventListener('mousedown', function (e) {
        isVerticalResizing = true;
        document.addEventListener('mousemove', handleVerticalResize);
        document.addEventListener('mouseup', stopVerticalResize);
        e.preventDefault();
    });

    function handleVerticalResize(e) {
        if (!isVerticalResizing) return;

        const codeAreaRect = codeArea.getBoundingClientRect();
        const mouseY = e.clientY - codeAreaRect.top - 50; // 减去工具栏高度
        const availableHeight = codeAreaRect.height - 50 - 4; // 减去工具栏和分隔条高度

        // 计算代码区域高度百分比
        let codeHeight = (mouseY / availableHeight) * 100;

        // 限制最小和最大高度
        codeHeight = Math.max(30, Math.min(80, codeHeight));

        const consoleHeight = 100 - codeHeight;

        codeDisplay.style.flex = `${codeHeight / 100}`;
        consoleArea.style.flex = `${consoleHeight / 100}`;
    }

    function stopVerticalResize() {
        isVerticalResizing = false;
        document.removeEventListener('mousemove', handleVerticalResize);
        document.removeEventListener('mouseup', stopVerticalResize);
    }

    // 防止在垂直调整大小时选中文本
    verticalResizer.addEventListener('selectstart', function (e) {
        e.preventDefault();
    });
})();
