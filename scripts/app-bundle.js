define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function App() {
    _classCallCheck(this, App);

    this.message = 'Hello World!';
  };
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('resources/value-converters/classlist-value-converter',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ClasslistValueConverter = exports.ClasslistValueConverter = function () {
        function ClasslistValueConverter() {
            _classCallCheck(this, ClasslistValueConverter);
        }

        ClasslistValueConverter.prototype.toView = function toView(value) {
            var classList = ['part '];
            classList.push(value < 2 ? 'rotate black' : 'white');
            classList.push(value % 2 == 0 ? 'Left' : 'Right');
            return classList.join('');
        };

        return ClasslistValueConverter;
    }();
});
define('resources/elements/ying-yang/ying-yang',['exports', 'aurelia-framework', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaEventAggregator) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.YingYangCustomElement = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _dec, _class;

    var YingYangCustomElement = exports.YingYangCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
        function YingYangCustomElement(eventAggregator) {
            var _this = this;

            _classCallCheck(this, YingYangCustomElement);

            this._animate = false;
            this._cycleTime = 10000;
            this._rotationTime = this._cycleTime / 2;
            this._halfRotationTime = this._rotationTime / 2;
            this._angle = 0;
            this._stepCounter = 0;
            this._done = true;
            this.paths = ["M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z", "M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z"];
            this.parts = [{
                d: this.paths[0].slice(),
                classNames: 'part whiteLeft',
                id: 0
            }, {
                d: this.paths[1].slice(),
                classNames: 'part whiteRight',
                id: 1
            }, {
                d: this.paths[0].slice(),
                classNames: 'part blackLeft',
                id: 2
            }, {
                d: this.paths[1].slice(),
                classNames: 'part blackLeft',
                id: 3
            }];
            this.stageSortOrders = [[0, 1, 2, 3], [1, 3, 2, 0], [2, 3, 0, 1], [2, 0, 1, 3]];
            this.handleTransitionEnd = function (e) {
                if (_this._done) {
                    _this._done = !_this._done;
                    window.requestAnimationFrame(function () {
                        _this.rotate();
                        _this._done = !_this._done;
                    });
                }
            };
        }

        YingYangCustomElement.prototype.attached = function attached() {
            document.addEventListener('transitionend', this.handleTransitionEnd);
        };

        YingYangCustomElement.prototype.detached = function detached() {
            document.removeEventListener('transitionend', this.handleTransitionEnd);
        };

        YingYangCustomElement.prototype.rotate = function rotate() {
            if (this._animate) {
                this._stepCounter++;
                this.angle = this._stepCounter * 180;
                console.log(this._stepCounter, this.angle);
            }
        };

        YingYangCustomElement.prototype.toggleAnimation = function toggleAnimation() {
            this._animate = !this._animate;
            if (this._animate) {
                this._stepCounter = 0;
                this.rotate();
            }
        };

        _createClass(YingYangCustomElement, [{
            key: 'angle',
            get: function get() {
                return this._angle;
            },
            set: function set(angle) {
                this._angle = angle;
            }
        }, {
            key: 'duration',
            get: function get() {
                return this._halfRotationTime;
            }
        }, {
            key: 'timing',
            get: function get() {
                var timing = this._stepCounter % 2 == 1 ? 'ease-in' : 'ease-out';
                return timing;
            }
        }]);

        return YingYangCustomElement;
    }()) || _class);
});
define('resources/value-converters/layer-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Layer1ValueConverter = exports.Layer1ValueConverter = function () {
        function Layer1ValueConverter() {
            _classCallCheck(this, Layer1ValueConverter);
        }

        Layer1ValueConverter.prototype.toView = function toView(value) {
            var parts = value.slice(0, 2);
            return parts;
        };

        return Layer1ValueConverter;
    }();
});
define('resources/value-converters/layer1-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Layer1ValueConverter = exports.Layer1ValueConverter = function () {
        function Layer1ValueConverter() {
            _classCallCheck(this, Layer1ValueConverter);
        }

        Layer1ValueConverter.prototype.toView = function toView(value) {
            var parts = value.slice(0, 2);
            return parts;
        };

        return Layer1ValueConverter;
    }();
});
define('resources/value-converters/layer1-value-converter kopie',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Layer1ValueConverter = exports.Layer1ValueConverter = function () {
        function Layer1ValueConverter() {
            _classCallCheck(this, Layer1ValueConverter);
        }

        Layer1ValueConverter.prototype.toView = function toView(value) {
            var parts = value.slice(0, 2);
            return parts;
        };

        return Layer1ValueConverter;
    }();
});
define('resources/value-converters/layer2-value-converter',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Layer2ValueConverter = exports.Layer2ValueConverter = function () {
        function Layer2ValueConverter() {
            _classCallCheck(this, Layer2ValueConverter);
        }

        Layer2ValueConverter.prototype.toView = function toView(value) {
            var parts = value.slice(-2);
            return parts;
        };

        return Layer2ValueConverter;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/elements/ying-yang/ying-yang\"></require>\n    <ying-yang containerless></ying-yang>\n</template>"; });
define('text!resources/elements/ying-yang/ying-yang.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/value-converters/classlist-value-converter\"></require>\n    <require from=\"resources/value-converters/layer1-value-converter\"></require>\n    <require from=\"resources/value-converters/layer2-value-converter\"></require>\n    <div class=\"container\"\n         click.trigger=\"toggleAnimation()\">\n        <svg version=\"1.1\"\n             x=\"0px\"\n             y=\"0px\"\n             width=\"400px\"\n             height=\"400px\"\n             viewBox=\"0 0 400 400\"\n             enable-background=\"new 0 0 400 400\"\n             xml:space=\"preserve\">\n            <g id=\"Layer_1\">\n                <!-- <path repeat.for=\"part1 of parts | layer1\"\n                      class.bind=\"$index | classlist\"\n                      data-order.bind=\"$index\"\n                      css=\"'transform: rotate(' + ${angle} + 'deg);'\"\n                      d=\"${part1}\"></path> -->\n            </g>\n            <g id=\"Layer_2\">\n                <path repeat.for=\"part2 of parts | layer2\"\n                      class.bind=\"part2.classNames\"\n                      data-order.bind=\"$index\"\n                      css=\"transform: rotate(${angle}deg); transition-duration: ${duration/1000}s; transition-timing-function: ${timing}\"\n                      d=\"${part2.d}\"></path>\n            </g>\n        </svg>\n    </div>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map