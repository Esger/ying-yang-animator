define('app',['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.App = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var App = exports.App = function App() {
        _classCallCheck(this, App);

        this.message = 'Ying Yang!';
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

    var _dec, _class;

    var YingYangCustomElement = exports.YingYangCustomElement = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, Element), _dec(_class = function () {
        function YingYangCustomElement(eventAggregator, element) {
            var _this = this;

            _classCallCheck(this, YingYangCustomElement);

            this._element = element;
            this.animate = true;
            this._triggered = false;
            this._cycleTime = 10000;
            this._rotationTime = this._cycleTime / 2;
            this.timingClass = 'ease-in';
            this.duration = this._rotationTime / 2;
            this._stepCounter = 0;
            this.angle = 0;
            this._done = true;
            this.paths = ["M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z", "M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z"];
            this.parts = [{
                d: this.paths[0].slice(),
                classNames: 'part whiteLeft ',
                layer: 0,
                id: 0
            }, {
                d: this.paths[1].slice(),
                classNames: 'part whiteRight ',
                layer: 1,
                id: 1
            }, {
                d: this.paths[0].slice(),
                classNames: 'part blackLeft ',
                layer: 2,
                id: 2
            }, {
                d: this.paths[1].slice(),
                classNames: 'part blackRight ',
                layer: 3,
                id: 3
            }];
            this._animationTypes = {
                'rotate': {
                    'stageSortOrders': [[3, 1, 2, 0], [2, 0, 3, 1], [0, 2, 1, 3], [1, 3, 0, 2]],
                    'actions': function actions() {
                        _this._stepCounter++;
                        _this.timingClass = _this._stepCounter % 2 == 1 ? 'ease-in' : 'ease-out';
                        _this.angle = _this._stepCounter * 180;
                    }
                },
                'backAndForth': {
                    'stageSortOrders': [[3, 1, 2, 0], [2, 0, 3, 1], [2, 0, 3, 1], [3, 1, 2, 0]],
                    'actions': function actions() {
                        var angles = [0, 180, 360, 180];
                        _this._stepCounter++;
                        _this.timingClass = _this._stepCounter % 2 == 1 ? 'ease-in' : 'ease-out';
                        _this.angle = angles[_this._stepCounter % 4];
                    }
                }
            };
            this._currentAnimationType = 'backAndForth';
            this._handleTransitionEnd = function () {
                _this._setLayers();
            };
        }

        YingYangCustomElement.prototype.attached = function attached() {
            this._start();
        };

        YingYangCustomElement.prototype.detached = function detached() {
            this._removeTranitionEndLister();
        };

        YingYangCustomElement.prototype._start = function _start() {
            this._addTransitionEndListener();
            this._setLayers();
        };

        YingYangCustomElement.prototype._addTransitionEndListener = function _addTransitionEndListener() {
            var _this2 = this;

            this._transitionEndListener = document.addEventListener('transitionend', function () {
                if (!_this2._triggered) {
                    _this2._triggered = true;
                    setTimeout(function () {
                        _this2._triggered = false;
                    }, 500);
                    _this2._handleTransitionEnd();
                }
            });
        };

        YingYangCustomElement.prototype._removeTranitionEndLister = function _removeTranitionEndLister() {
            if (this._transitionEndListener) {
                document.removeEventListener('transitionend', this._handleTransitionEnd);
            }
        };

        YingYangCustomElement.prototype._setLayers = function _setLayers() {
            var _this3 = this;

            var phase = this._stepCounter % 4;
            var layerOrder = this._animationTypes[this._currentAnimationType].stageSortOrders[phase];
            var layers = [];
            for (var i = 0; i < this.parts.length; i++) {
                var part = this.parts[i];
                part.layer = layerOrder[i];
                layers.push(part.layer);
            }

            setTimeout(function () {
                _this3._animationTypes[_this3._currentAnimationType].actions();
            });
        };

        YingYangCustomElement.prototype.toggleAnimation = function toggleAnimation() {
            var _this4 = this;

            this._removeTranitionEndLister();
            this.animate = false;
            this.angle = 0;
            this._stepCounter = 0;
            switch (this._currentAnimationType) {
                case 'rotate':
                    this._currentAnimationType = 'backAndForth';
                    break;
                case 'backAndForth':
                    this._currentAnimationType = 'rotate';
                    break;
                default:
                    break;
            }
            setTimeout(function () {
                _this4.animate = true;

                _this4._start();
            }, 500);
        };

        return YingYangCustomElement;
    }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/elements/ying-yang/ying-yang\"></require>\n    <ying-yang containerless></ying-yang>\n</template>"; });
define('text!resources/elements/ying-yang/ying-yang.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\"\n         click.delegate=\"toggleAnimation()\"\n         touchstart.delegate=\"toggleAnimation()\">\n        <h1 class=\"hint\">Change animation</h1>\n        <svg show.bind=\"animate\"\n             version=\"1.1\"\n             x=\"0px\"\n             y=\"0px\"\n             width=\"400px\"\n             height=\"400px\"\n             viewBox=\"0 0 400 400\"\n             enable-background=\"new 0 0 400 400\"\n             xml:space=\"preserve\">\n            <defs>\n                <filter id=\"dropshadow\"\n                        x=\"-10%\"\n                        y=\"-10%\"\n                        width=\"120%\"\n                        height=\"120%\">\n                    <feOffset result=\"offOut\"\n                              in=\"SourceGraphic\"\n                              dx=\"0\"\n                              dy=\"0\" />\n                    <feColorMatrix result=\"matrixOut\"\n                                   in=\"offOut\"\n                                   type=\"matrix\"\n                                   values=\"0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0\" />\n                    <feGaussianBlur result=\"blurOut\"\n                                    in=\"matrixOut\"\n                                    stdDeviation=\"5\" />\n                    <feBlend in=\"SourceGraphic\"\n                             in2=\"blurOut\"\n                             mode=\"normal\" />\n                </filter>\n            </defs>\n            <g repeat.for=\"layer of 4\"\n               id=\"Layer_${layer}\">\n                <path repeat.for=\"part of parts\"\n                      filter=\"${($index >= 2) ? 'url(#dropshadow)' : ''}\"\n                      data-layer=\"${part.layer}\"\n                      class=\"${part.classNames} ${timingClass} ${(layer == part.layer) ? '' : 'aurelia-hide'}\"\n                      css=\"transform: rotate(${angle}deg); transition-duration: ${duration/1000}s;\"\n                      d=\"${part.d}\"></path>\n            </g>\n        </svg>\n    </div>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map