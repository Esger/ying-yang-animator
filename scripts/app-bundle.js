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
define('resources/elements/ying-yang/ying-yang',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var YingYangCustomElement = exports.YingYangCustomElement = function () {
        function YingYangCustomElement() {
            _classCallCheck(this, YingYangCustomElement);

            this._animationId = null;
            this._animate = false;
            this._rotationTime = 5000;
            this._halfRotationTime = 2500;
            this.angle = 0;
        }

        YingYangCustomElement.prototype.attached = function attached() {
            this.rotate();
        };

        YingYangCustomElement.prototype.toggleAnimation = function toggleAnimation() {
            this._animate = !this._animate;
            this._startMillis = Date.now();
            this.rotate();
        };

        YingYangCustomElement.prototype.rotate = function rotate() {
            var _this = this;

            if (this._animate) {
                var millisPassed = Date.now() - this._startMillis;
                this.angle = millisPassed % this._rotationTime / this._rotationTime * 360;

                this._animationId = requestAnimationFrame(function () {
                    _this.rotate();
                });
            } else {
                cancelAnimationFrame(this._animationId);
            }
        };

        return YingYangCustomElement;
    }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n    <require from=\"resources/elements/ying-yang/ying-yang\"></require>\n    <ying-yang containerless></ying-yang>\n</template>"; });
define('text!resources/elements/ying-yang/ying-yang.html', ['module'], function(module) { module.exports = "<template>\n    <div class=\"container\"\n         click.trigger=\"toggleAnimation()\">\n        <svg version=\"1.1\"\n             x=\"0px\"\n             y=\"0px\"\n             width=\"400px\"\n             height=\"400px\"\n             viewBox=\"0 0 400 400\"\n             enable-background=\"new 0 0 400 400\"\n             xml:space=\"preserve\">\n            <g id=\"Layer_1\">\n                <path class=\"part blackRight rotate\"\n                      data-order=\"0\"\n                      css=\"transform: rotate(${angle}deg);\"\n                      d=\"M202.581,0.033C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 c0,54.365,43.383,98.599,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z\" />\n                <path class=\"part blackLeft rotate\"\n                      data-order=\"1\"\n                      css=\"transform: rotate(${angle}deg);\"\n                      d=\"M197.419,399.968C88.153,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.401,300,45.634,300,100c0,55.229-44.771,100-100,100c-55.229,0-100,44.771-100,100 C100,354.365,143.383,398.599,197.419,399.968z M200,66.666c-18.226,0-33,14.774-33,33s14.774,33,33,33c18.227,0,33-14.774,33-33 S218.227,66.666,200,66.666z\" />\n                <!-- <path class=\"part whiteRight fixed\"\n                      data-order=\"2\"\n                      d=\"M202.581,0.033C256.616,1.4,300,45.634,300,100c0,55.229-44.771, 100-100,100s-100,44.771-100,100 c0,54.365,43.383,98.6,97.419,99.968c0.86,0.011,1.718,0.032,2.581,0.032c110.457,0,200-89.543,200-200 C400,90.406,311.848,1.417,202.581,0.033z\" />\n                <path class=\"part whiteLeft fixed\"\n                      data-order=\"3\"\n                      d=\"M197.419,399.968C88.152,398.583,0,309.594,0,200C0,89.543,89.543,0,200,0c0.863,0,1.721,0.021,2.581,0.033 C256.616,1.4,300,45.634,300,100c0,55.229-44.771,100-100,100s-100,44.771-100,100C100,354.365,143.383,398.6,197.419,399.968z M200,66.666c-18.227,0-33,14.773-33,33s14.773,33,33,33s33-14.773,33-33S218.227,66.666,200,66.666z\" /> -->\n            </g>\n        </svg>\n    </div>\n\n</template>"; });
//# sourceMappingURL=app-bundle.js.map