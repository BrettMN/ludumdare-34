System.register(['./move', './object'], function(exports_1) {
    var MoveModule, ObjectModule;
    var Move, Object, Main;
    return {
        setters:[
            function (MoveModule_1) {
                MoveModule = MoveModule_1;
            },
            function (ObjectModule_1) {
                ObjectModule = ObjectModule_1;
            }],
        execute: function() {
            Move = MoveModule.Move;
            Object = ObjectModule.Object;
            Main = (function () {
                /**
                *
                */
                function Main(context, config) {
                    var _this = this;
                    this.moveCharacter = Move.none;
                    this.context = context;
                    this.config = config;
                    this.fallingBlocks = new Array();
                    this.standbyBlocks = new Array();
                    window.onkeypress = function (key) {
                        if (key.charCode === config.Left) {
                            _this.moveCharacter = Move.left;
                        }
                        else if (key.charCode === config.Right) {
                            _this.moveCharacter = Move.right;
                        }
                        else if (key.charCode == config.Space) {
                            _this.startOver = true;
                        }
                    };
                }
                Main.prototype.reset = function () {
                    this.startTime = Date.now();
                    this.lastTime = this.startTime;
                    this.gameOver = false;
                    this.startOver = false;
                    this.endTime = 0;
                    this.fallingBlocks.length = 0;
                    this.standbyBlocks.length = 0;
                    this.character = new Object(this.config.CanvasWidth, this.config.CanvasHeight, this.context);
                    this.character.setup(200, this.config.CanvasHeight - 50, 50, 500, this.config.Blue);
                };
                Main.prototype.update = function (modifier) {
                    if (this.gameOver) {
                        if (this.startOver === true) {
                            this.reset();
                        }
                    }
                    else {
                        this.character.move(this.moveCharacter, modifier);
                        this.moveCharacter = Move.none;
                        this.fallingBlockCount = this.fallingBlocks.length;
                        for (var i = 0; i < this.fallingBlockCount; i++) {
                            this.fallingBlocks[i].move(Move.down, modifier);
                            var remove = false;
                            if (this.fallingBlocks[i].checkScreenBounds()) {
                                remove = true;
                            }
                            if (this.character.x < this.fallingBlocks[i].x + this.fallingBlocks[i].power &&
                                this.character.x + this.character.power > this.fallingBlocks[i].x &&
                                this.character.y < this.fallingBlocks[i].y + this.fallingBlocks[i].power &&
                                this.character.y + this.character.power > this.fallingBlocks[i].y) {
                                remove = true;
                                if (this.fallingBlocks[i].color === this.config.Red) {
                                    this.character.setPower(this.fallingBlocks[i].power);
                                }
                                else {
                                    this.character.setPower(-this.fallingBlocks[i].power);
                                }
                            }
                            if (this.character.power >= this.config.CanvasWidth) {
                                this.gameOver = true;
                                this.endTime = this.thisTime;
                            }
                            if (remove) {
                                var tempBlock = this.fallingBlocks.splice(i, 1)[0];
                                tempBlock.reset();
                                this.standbyBlocks.push(tempBlock);
                                i--;
                                this.fallingBlockCount = this.fallingBlocks.length;
                            }
                        }
                        if (this.fallingBlockCount < (this.thisTime - this.startTime) / this.config.DropSpeed) {
                            this.generateFallingBlock();
                        }
                    }
                };
                Main.prototype.render = function () {
                    this.context.clearRect(0, 0, this.config.CanvasWidth + 50, this.config.CanvasHeight + 50);
                    if (this.gameOver) {
                        this.renderGameOver();
                    }
                    else {
                        this.character.draw();
                        this.fallingBlockCount = this.fallingBlocks.length;
                        for (var i = 0; i < this.fallingBlockCount; i++) {
                            this.fallingBlocks[i].draw();
                        }
                        this.context.fillStyle = this.config.Black;
                        this.context.font = 'bold 20px sans-serif';
                        this.context.textAlign = 'Left';
                        this.context.textBaseline = 'Hanging';
                        this.context.fillText("Time: " + Math.floor((this.thisTime - this.startTime) / 1000), 0, 20);
                    }
                };
                Main.prototype.generateFallingBlock = function () {
                    var type = Math.floor(Math.random() * 10) % 3;
                    var power = Math.floor(Math.random() * 1000) % 20;
                    var x = Math.floor(Math.random() * this.config.CanvasWidth);
                    var speed = Math.floor(Math.random() * 200);
                    if (this.standbyBlocks.length == 0) {
                        this.addStandbyBlocks(20);
                    }
                    var temp = this.standbyBlocks.pop();
                    if (type === 1) {
                        temp.setup(x, 0, power, speed, this.config.Green);
                        this.fallingBlocks.push(temp);
                    }
                    else {
                        temp.setup(x, 0, power, speed, this.config.Red);
                        this.fallingBlocks.push(temp);
                    }
                };
                Main.prototype.addStandbyBlocks = function (amount) {
                    for (var i = 0; i < amount; i++) {
                        this.standbyBlocks.push(new Object(this.config.CanvasWidth, this.config.CanvasHeight, this.context));
                    }
                };
                Main.prototype.renderGameOver = function () {
                    this.context.fillStyle = this.config.Red;
                    this.context.font = 'bold 30px sans-serif';
                    this.context.textAlign = 'Center';
                    this.context.textBaseline = 'Middle';
                    this.context.fillText("Game Over! You lasted " + Math.floor((this.endTime - this.startTime) / 1000) + " seconds", 50, 50);
                    this.context.fillText("Press the \"Spacebar\" to play again.", 50, 150);
                };
                Main.prototype.logStatus = function () {
                    console.log('----Status Update----');
                    console.log("Falling Blocks: " + this.fallingBlocks.length);
                    console.log("Standby Blocks: " + this.standbyBlocks.length);
                    console.log("Total Blocks: " + (this.fallingBlocks.length + this.standbyBlocks.length));
                };
                return Main;
            })();
            exports_1("Main", Main);
        }
    }
});
