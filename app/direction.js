System.register([], function(exports_1) {
    var Direction;
    return {
        setters:[],
        execute: function() {
            (function (Direction) {
                Direction[Direction["up"] = 0] = "up";
                Direction[Direction["right"] = 1] = "right";
                Direction[Direction["down"] = 2] = "down";
                Direction[Direction["left"] = 3] = "left";
            })(Direction || (Direction = {}));
            exports_1("Direction", Direction);
            ;
        }
    }
});
