const sp = () => {
    window.oncontextmenu = function () {
        // event.preventDefault(); // 阻止默认事件行为
        // return false;
    };
    window.onkeydown =
        window.onkeyup =
        window.onkeypress =
        function (event) {
            // // 判断是否按下F12，F12键码为123
            // if (event.keyCode === 123) {
            //     event.preventDefault(); // 阻止默认事件行为
            //     window.event.returnValue = false;
            // }
        };
    // 每秒检查一次
    setInterval(function () {
        const threshold = 250;
        if (
            window.outerWidth - window.innerWidth > threshold ||
            window.outerHeight - window.innerHeight > threshold
        ) {
            if (document.body) {
                // document.body.remove();
                Function("debugger")();
            } else {
                // window.location.reload();
                Function("debugger")();
            }
        }
        Function("debugger")();
    }, 100);
};

export const SP = sp();