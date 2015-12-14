System.register(['./move'], function(exports_1) {
    var MoveModule;
    var Move, Object;
    return {
        setters:[
            function (MoveModule_1) {
                MoveModule = MoveModule_1;
            }],
        execute: function() {
            Move = MoveModule.Move;
            Object = (function () {
                /**
                 *
                 */
                function Object(screenWidth, screenHieght, context) {
                    this.screenWidth = screenWidth;
                    this.screenHieght = screenHieght;
                    this.context = context;
                    this.reset();
                }
                Object.prototype.setup = function (x, y, power, moveSpeed, color) {
                    this.x = x;
                    this.y = y;
                    this.power = power;
                    this.moveSpeed = moveSpeed;
                    this.color = color;
                    return this;
                };
                Object.prototype.reset = function () {
                    this.x = 0;
                    this.y = 0;
                    this.power = 0;
                    this.moveSpeed = 0;
                    this.color = '';
                    return this;
                };
                Object.prototype.move = function (direction, modifier) {
                    if (direction === Move.none) {
                    }
                    else if (direction === Move.down) {
                        this.y += this.moveSpeed * modifier;
                    }
                    else if (direction === Move.up) {
                        this.y -= this.moveSpeed * modifier;
                    }
                    else if (direction === Move.left) {
                        this.x -= this.moveSpeed * modifier;
                        if (this.x <= 0) {
                            this.x = 0;
                        }
                    }
                    else if (direction === Move.right) {
                        this.x += this.moveSpeed * modifier;
                        if (this.x >= this.screenWidth - this.power) {
                            this.x = this.screenWidth - this.power;
                        }
                    }
                };
                Object.prototype.draw = function () {
                    this.context.fillStyle = this.color;
                    this.context.fillRect(this.x, this.y, this.power, this.power);
                };
                Object.prototype.checkScreenBounds = function () {
                    return this.y > this.screenHieght;
                };
                Object.prototype.setPower = function (modifier) {
                    var tempPower = this.power + modifier;
                    this.power = tempPower > 10 ? tempPower : 10;
                };
                return Object;
            })();
            exports_1("Object", Object);
        }
    }
});
