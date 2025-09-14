(() => {
    /* 添加面板调整功能变量 */
    let isResizing = false;
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
})();
