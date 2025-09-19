class 文件 {

    句柄 = null;
    constructor(句柄) {
        this.句柄 = 句柄;
    }
    static async 选择一个文件(文件说明 = '所有文件', 文件类型 = ['*']) {
        var 配置 = {
            types: [
                {
                    description: 文件说明,
                    accept: {
                        'application/json': 文件类型,
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: true,
        };
        var [句柄] = await window.showOpenFilePicker(配置);
        if (!句柄) return null;
        return new 文件(句柄);
    }

    static async 保存文件(文件内容, 文件说明 = '所有文件', 文件类型 = ['*']) {
        var options = {
            types: [
                {
                    description: 文件说明,
                    accept: {
                        'application/json': 文件类型,
                    },
                },
            ],
            excludeAcceptAllOption: true,
            multiple: false,
        };
        var 文件句柄 = await window.showSaveFilePicker(options);
        if (!文件句柄) return;
        var 新文件 = new 文件(文件句柄);
        await 新文件.写入内容(文件内容);
        return 新文件;

    }

    async 读取内容() {
        var 文件对象 = await this.句柄.getFile();
        if (!文件对象) return;

        return new Promise((resolve, reject) => {
            const 读取器 = new FileReader();
            读取器.onload = () => {
                resolve(读取器.result);
            };
            读取器.readAsText(文件对象);
        });
    }

    async 写入内容(内容) {
        var 可写器 = await this.句柄.createWritable();
        await 可写器.write(内容);
        await 可写器.close();
    }

}