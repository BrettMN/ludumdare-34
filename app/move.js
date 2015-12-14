System.register([], function(exports_1) {
    var Move;
    return {
        setters:[],
        execute: function() {
            (function (Move) {
                Move[Move["up"] = 0] = "up";
                Move[Move["right"] = 1] = "right";
                Move[Move["down"] = 2] = "down";
                Move[Move["left"] = 3] = "left";
                Move[Move["none"] = 4] = "none";
            })(Move || (Move = {}));
            exports_1("Move", Move);
            ;
        }
    }
});
