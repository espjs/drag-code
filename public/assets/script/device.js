class 设备 {
    端口 = null;
    读取器 = null;
    constructor(端口) {
        this.端口 = 端口;
    }

    static async 选择一个设备() {
        var 端口 = await navigator.serial.requestPort();
        return new 设备(端口);

    }

    async 打开(波特率 = 115200) {
        await this.端口.open({ baudRate: 波特率 });
    }

    async 关闭() {
        this.读取器 && this.读取器.releaseLock();
        this.读取器 = null;
        await this.端口.close();
        this.端口 = null;
    }

    async 监听串口数据(回调, 数据分隔符 = '\n') {
        if (!this.端口 || !this.端口.readable) {
            throw new Error('没有打开设备');
            return;
        }
        this.读取器 = this.端口.readable.getReader();
        try {
            var 收到的数据 = '';
            while (true) {
                var { value, done } = await this.读取器.read();
                if (done) {
                    this.读取器 && this.读取器.releaseLock();
                    break;
                }
                收到的数据 += new TextDecoder().decode(value);
                if (收到的数据.includes(数据分隔符)) {
                    var 分割后的数据 = 收到的数据.split(数据分隔符);
                    for (var i = 0; i < 分割后的数据.length - 1; i++) {
                        回调(分割后的数据[i]);
                    }
                    收到的数据 = 分割后的数据[分割后的数据.length - 1];
                }
            }
        } catch (error) {

        } finally {
            this.读取器 && this.读取器.releaseLock();
        }
    }

    async 发送代码(内容) {
        var 写入器 = this.端口.writable.getWriter();
        var 转换后的数据 = new TextEncoder().encode(内容 + '\n');
        await 写入器.write(转换后的数据);
        写入器.releaseLock();
        写入器 = null;
    }

    async 写入文件(文件名, 内容) {
        内容 = 内容.replace(/\r\n/g, '\n');
        // 内容 = 内容.replace(/\\/g, '\\\\');
        var 内容长度 = this.获取字符串长度(内容);
        var 分块大小 = 60;
        var 要执行的命令 = '';

        if (内容长度 < 分块大小) {
            要执行的命令 = `require('Storage').write('${文件名}', "${this.转换代码(内容)}"));`;
            await this.发送代码(要执行的命令);
            return;
        }

        var 当前开始位置 = 0;
        for (var i = 0; i < Math.ceil(内容.length / 分块大小); i++) {
            var 分块 = 内容.substring(i * 分块大小, i * 分块大小 + 分块大小);
            var 转换后的分块 = this.转换代码(分块);
            if (当前开始位置 == 0) {
                要执行的命令 = `require('Storage').write('${文件名}', "${转换后的分块}", 0, ${内容长度});`
            } else {
                要执行的命令 = `require('Storage').write('${文件名}', "${转换后的分块}", ${当前开始位置});`
            }
            await this.发送代码(要执行的命令);
            当前开始位置 += this.获取字符串长度(分块);
            await this.等待(20);
        }
    }

    转换代码(代码) {
        return 代码.replace(/\\/g, '\\\\')
            .replace(/\"/g, '\\"')
            .replace(/\n/g, '\\n');
    }

    获取字符串长度(字符串) {
        var 中文正则 = /[\u4e00-\u9fa5]/g;
        var 中文列表 = 字符串.match(中文正则);
        var 中文个数 = 中文列表 ? 中文列表.length : 0;
        var 长度 = 字符串.length + 中文个数 * 2;
        return 长度;
    }

    async 等待(毫秒 = 1) {
        await new Promise(resolve => setTimeout(resolve, 毫秒));
    }

    async 重启() {
        await this.发送代码('E.reboot();');
        return 1;
    }

    async 清除代码() {
        await this.发送代码('require("Storage").eraseAll();');
        return 1;
    }


}