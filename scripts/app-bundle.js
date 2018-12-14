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
define('resources/value-converters/sorter-value-converter',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SorterValueConverter = exports.SorterValueConverter = function () {
        function SorterValueConverter() {
            _classCallCheck(this, SorterValueConverter);
        }

        SorterValueConverter.prototype.toView = function toView(array, propertyName, direction) {

            var factor = direction === 'ascending' ? 1 : -1;
            var sortedArray = array.slice(0).sort(function (a, b) {
                return (a[propertyName] - b[propertyName]) * factor;
            });
            return sortedArray;
        };

        return SorterValueConverter;
    }();
});
define('resources/elements/ying-yang/ying-yang',['exports', 'aurelia-framework', 'aurelia-templating-resources', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _aureliaTemplatingResources, _aureliaEventAggregator) {
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

    var _dec, _class;

    var YingYangCustomElement = exports.YingYangCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _aureliaTemplatingResources.BindingSignaler), _dec(_class = function () {
        function YingYangCustomElement(eventAggregator, bindingSignaler) {
            var _this = this;

            _classCallCheck(this, YingYangCustomElement);

            this._bindingSignaler = bindingSignaler;
            this._animate = false;
            this._cycleTime = 10000;
            this._rotationTime = this._cycleTime / 2;
            this.timingClass = 'ease-in';
            this.duration = this._rotationTime / 2;
            this.angle = 0;
            this._done = true;
            this.paths = ["M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z", "M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z"];
            this.parts = [{
                d: this.paths[0].slice(),
                classNames: 'part whiteLeft ',
                index: 0,
                id: 0
            }, {
                d: this.paths[1].slice(),
                classNames: 'part whiteRight ',
                index: 1,
                id: 1
            }, {
                d: this.paths[0].slice(),
                classNames: 'part blackLeft ',
                index: 2,
                id: 2
            }, {
                d: this.paths[1].slice(),
                classNames: 'part blackRight ',
                index: 3,
                id: 3
            }];
            this.stageSortOrders = [[0, 1, 2, 3], [1, 3, 2, 0], [2, 3, 0, 1], [2, 0, 1, 3]];
            this.handleTransitionEnd = function (e) {
                if (_this._done) {
                    _this._done = !_this._done;
                    window.requestAnimationFrame(function () {
                        _this._setSortIndexes();
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

        YingYangCustomElement.prototype._setSortIndexes = function _setSortIndexes() {
            var sortOrder = this.stageSortOrders[this._stepCounter % 4];
            for (var i = 0; i < this.parts.length; i++) {
                var part = this.parts[i];
                part.index = sortOrder[part.id];
            }
            this._bindingSignaler.signal('sorter-changed');
        };

        YingYangCustomElement.prototype.rotate = function rotate() {
            if (this._animate) {
                this._stepCounter++;
                this.timingClass = this._stepCounter % 2 == 1 ? 'ease-in' : 'ease-out';
                this.angle = this._stepCounter * 180;
                console.log(this._stepCounter, this.timingClass);
            }
        };

        YingYangCustomElement.prototype.toggleAnimation = function toggleAnimation() {
            this._animate = !this._animate;
            if (this._animate) {
                this._stepCounter = 0;
                this.rotate();
            }
        };

        return YingYangCustomElement;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/elements/ying-yang/ying-yang\"></require>\n    <ying-yang containerless></ying-yang>\n</template>"; });
define('text!resources/elements/ying-yang/ying-yang.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/value-converters/sorter-value-converter\"></require>\n    <div class=\"container\"\n         click.trigger=\"toggleAnimation()\">\n        <svg version=\"1.1\"\n             x=\"0px\"\n             y=\"0px\"\n             width=\"400px\"\n             height=\"400px\"\n             viewBox=\"0 0 400 400\"\n             enable-background=\"new 0 0 400 400\"\n             xml:space=\"preserve\">\n            <g id=\"Layer_1\">\n                <path repeat.for=\"part of parts | sorter:part.index:'ascending' & signal:'sorter-changed'\"\n                      data-order.bind=\"$index\"\n                      class=\"${part.classNames} ${timingClass}\"\n                      css=\"transform: rotate(${angle}deg); transition-duration: ${duration/1000 & oneTime}s;\"\n                      d=\"${part.d}\"></path>\n            </g>\n        </svg>\n    </div>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map