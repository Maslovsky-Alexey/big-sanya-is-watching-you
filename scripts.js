(function () {
        var canvas = document.getElementById('canvas'),
                context = canvas.getContext('2d');

        var canvasMask = document.getElementById('mask'),
                contextMask = canvasMask.getContext('2d');

        window.addEventListener('resize', resizeCanvas, false);

        var sanyaRect;

        function resizeCanvas() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                canvasMask.width = window.innerWidth;
                canvasMask.height = window.innerHeight;

                drawStuff();
        }

        resizeCanvas();

        function drawStuff(mousePos) {
                fill(context, 0, 0, canvas.width, canvas.height, 'black');

                drawSanya(function (sanyaRect1) {
                        sanyaRect = sanyaRect1;

                        drawEyes();
                });

        }

        function drawSanya(onDone) {
                drawing = new Image();
                drawing.src = "sanya.png";

                var centerX, centerY;

                drawing.onload = function () {
                        x = canvas.width / 2 - drawing.width / 2;
                        y = canvas.height / 2 - drawing.height / 2;

                        contextMask.drawImage(drawing, x, y);

                        onDone({ x: x, y: y, width: drawing.width, height: drawing.height });
                };
        }

        function drawEyes(mousePos) {
                var maxOffset = 8;

                if (!mousePos) {
                        arc(sanyaRect.x + 99 , sanyaRect.y + 262 , 7);
                        arc(sanyaRect.x + 238, sanyaRect.y + 259 , 7);
                        return;
                }

                var cx = Math.abs(mousePos.x - (sanyaRect.x + sanyaRect.width / 2));
                var cy = Math.abs(mousePos.y - (sanyaRect.y + sanyaRect.height / 2));

                var aX = maxOffset / (window.innerWidth / 2);
                var aY = maxOffset / (window.innerHeight / 2);

                console.log(mousePos.x, sanyaRect.x + sanyaRect.width / 2, Math.abs(mousePos.x - (sanyaRect.x + sanyaRect.width / 2)))

                fill(context, sanyaRect.x + 1, sanyaRect.y + 1, sanyaRect.width - 2, sanyaRect.height - 2, 'white');

                var offsetX = (sanyaRect.x + sanyaRect.width / 2 > mousePos.x ? - (aX * cx) : aX * cx);
                var offsetY = (sanyaRect.y + sanyaRect.height / 2 > mousePos.y ? - (aY * cy) : aY * cy);

                arc(sanyaRect.x + 99 + offsetX, sanyaRect.y + 262 + offsetY, 7);
                arc(sanyaRect.x + 238 + offsetX, sanyaRect.y + 259 + offsetY, 7);
        }

        function arc(x, y, r) {
                context.beginPath();
                context.arc(x, y, r, 0, 2 * Math.PI, false);
                context.fillStyle = 'black';
                context.fill();
        }

        function fill(cntext, x, y, w, h, color) {
                cntext.beginPath();
                cntext.rect(x, y, w, h);
                cntext.fillStyle = color;
                cntext.fill();
        }

        canvasMask.addEventListener('mousemove', function (evt) {
                var mousePos = getMousePos(canvas, evt);

                drawEyes(mousePos);
        }, false);

        function getMousePos(canvas, evt) {
                var rect = canvas.getBoundingClientRect();
                return {
                        x: evt.clientX - rect.left,
                        y: evt.clientY - rect.top
                };
        }
})();