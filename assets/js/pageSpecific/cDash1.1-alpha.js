var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    (function (Common) {
        var Dashboard = (function () {
            function Dashboard() {
            }
            /**
            * create a background layer canvas and return the context
            * @param srcContext the source context to take the width and height from (or null to use only the padding)
            * @param xPadding extra pixels to add to the width of the canvas (or to 0 if the source context is null)
            * @param yPadding extra pixels to add to the height of the canvas (or to 0 if the source context is null)
            * @returns {CanvasRenderingContext2D}
            */
            Dashboard.prototype.createLayerContext = function (srcContext, xPadding, yPadding) {
                var buffer = document.createElement('canvas');
                var w = (srcContext != null) ? srcContext.canvas.width : 0;
                var h = (srcContext != null) ? srcContext.canvas.height : 0;
                buffer.width = w + xPadding;
                buffer.height = h + yPadding;

                return buffer.getContext("2d");
            };

            Dashboard.prototype.destroy = function () {
                var t = 0;
                this.destroyInternal();
            };

            /**
            * Over ride in the derived class to free up resources
            */
            Dashboard.prototype.destroyInternal = function () {
            };

            Dashboard.checkParameters = function (commandString, options) {
                var res = {
                    commandString: "",
                    options: {}
                };

                if (typeof commandString === "object") {
                    res.options = commandString;
                } else if (typeof commandString === 'string') {
                    res.commandString = commandString;
                    if (typeof options != "undefined") {
                        res.options = options;
                    }
                }

                // set the default ID if not specified
                res.options = $.extend({ id: "dbDashboard" }, res.options);

                return res;
            };
            return Dashboard;
        })();
        Common.Dashboard = Dashboard;
    })(DbDashboards.Common || (DbDashboards.Common = {}));
    var Common = DbDashboards.Common;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialBezel = (function () {
            function DialBezel(dial) {
                this.dial = dial;
            }
            DialBezel.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var offset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;

                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.bezel.strokeStyle;
                ctx.lineWidth = this.dial.options.bezel.width;

                switch (this.dial.options.type) {
                    case Dials.DialBase.Dial360:
                        ctx.arc(this.dial.options.prv.effectiveWidth / 2, this.dial.options.prv.effectiveHeight / 2, (w / 2) - offset, 0, Math.PI * 2, false);
                        break;

                    case Dials.DialBase.Dial180N:
                        ctx.moveTo(w / 2, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.lineTo(offset, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.lineTo(offset, h / 2 - offset);
                        ctx.arc(w / 2, h / 2, (w / 2) - offset, Math.PI, 0, false);
                        ctx.lineTo(w - offset, (h / 2) - offset + this.dial.options.baseRunOutSize);
                        ctx.closePath();
                        break;
                    case Dials.DialBase.Dial180S:
                        ctx.moveTo(offset, offset);
                        ctx.lineTo(offset, this.dial.options.baseRunOutSize + offset);
                        ctx.arc(w / 2, this.dial.options.baseRunOutSize, (w / 2) - offset, Math.PI, 0, true);
                        ctx.lineTo(w - offset, offset);
                        ctx.lineTo(offset, offset);
                        break;
                    case Dials.DialBase.Dial180E:
                        ctx.moveTo(offset, offset);
                        ctx.lineTo(this.dial.options.baseRunOutSize + offset, offset);
                        ctx.arc(this.dial.options.baseRunOutSize, h / 2, (h / 2) - offset, 3 * Math.PI / 2, Math.PI / 2, false);
                        ctx.lineTo(offset, h - offset);
                        ctx.lineTo(offset, offset);
                        break;
                    case Dials.DialBase.Dial180W:
                        ctx.moveTo(w - offset, offset);
                        ctx.lineTo(w - offset, h - offset);
                        ctx.lineTo((w - this.dial.options.baseRunOutSize) - offset, h - offset);
                        ctx.arc(w - this.dial.options.baseRunOutSize, h / 2, (h / 2) - offset, Math.PI / 2, 3 * Math.PI / 2, false);
                        ctx.lineTo(w - offset, offset);
                        break;
                }
                ctx.closePath();
                ctx.stroke();
            };
            return DialBezel;
        })();
        Dials.DialBezel = DialBezel;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialFace = (function () {
            function DialFace(dial, context) {
                this.dial = dial;
                this.context = context;
            }
            /**
            * render the face onto the context provided
            */
            DialFace.prototype.render = function () {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var gf = this.context.createLinearGradient(w / 2, h, w / 2, 0);
                gf.addColorStop(0, this.dial.options.face.gradientColor2);
                gf.addColorStop(1, this.dial.options.face.gradientColor1);
                this.context.fillStyle = gf;

                this.context.fillRect(0, 0, w, h + this.dial.options.baseRunOutSize);
            };

            /**
            * gets the canvas for render ops
            */
            DialFace.prototype.canvas = function () {
                return this.context.canvas;
            };

            /**
            * destroy this object freeing up resources
            */
            DialFace.prototype.destroy = function () {
                this.context = null;
            };
            return DialFace;
        })();
        Dials.DialFace = DialFace;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialGlass = (function () {
            function DialGlass(dial, context) {
                this.dial = dial;
                this.context = context;
            }
            DialGlass.prototype.render = function () {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;
                var ctx = this.context;
                ctx.beginPath();
                ctx.fillStyle = "rgba(255,255,255,0.2)";

                if (this.dial.options.glass.shape == DialGlass.ShapeInOut) {
                    ctx.moveTo(-10, h);
                    ctx.quadraticCurveTo(10, h / 2, (w / 2) * 0.8, h / 2);
                    ctx.quadraticCurveTo(w * 0.8, (h / 2) * 1.1, w * 0.8, -10);
                } else if (this.dial.options.glass.shape == DialGlass.ShapeOut) {
                    ctx.moveTo(-10, (h / 2) * 1.3);
                    ctx.quadraticCurveTo(50, 0, w * 1.1, (h / 2) * 0.7);
                    ctx.lineTo(w * 1.1, -10);
                }
                ctx.lineTo(-10, -10);

                // complete custom shape
                ctx.closePath();
                ctx.fill();
            };

            /**
            * gets the canvas for render ops
            */
            DialGlass.prototype.canvas = function () {
                return this.context.canvas;
            };

            /**
            * destroy this object freeing up resources
            */
            DialGlass.prototype.destroy = function () {
                this.context = null;
            };
            DialGlass.ShapeInOut = "inOut";
            DialGlass.ShapeOut = "out";
            DialGlass.ShapeNone = "none";
            return DialGlass;
        })();
        Dials.DialGlass = DialGlass;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask = (function () {
            function DialMask(dial) {
                this.dial = dial;
                this._w = this.dial.options.prv.effectiveWidth;
                this._h = this.dial.options.prv.effectiveHeight;
            }
            DialMask.prototype.apply = function (ctx) {
                throw Error("Do not call the base apply method, must be implemented in the derived class");
            };
            return DialMask;
        })();
        Dials.DialMask = DialMask;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask360 = (function (_super) {
            __extends(DialMask360, _super);
            function DialMask360(dial) {
                _super.call(this, dial);
            }
            DialMask360.prototype.apply = function (ctx) {
                ctx.arc(this._w / 2, this._h / 2, (this._w / 2), 0, Math.PI * 2, false);
                ctx.clip();
            };
            return DialMask360;
        })(Dials.DialMask);
        Dials.DialMask360 = DialMask360;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask180N = (function (_super) {
            __extends(DialMask180N, _super);
            function DialMask180N(dial) {
                _super.call(this, dial);
            }
            DialMask180N.prototype.apply = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(this._w / 2, (this._h / 2) + this.dial.options.baseRunOutSize);
                ctx.lineTo(0, (this._h / 2) + this.dial.options.baseRunOutSize);
                ctx.lineTo(0, this._h / 2);
                ctx.arc(this._w / 2, this._h / 2, this._w / 2, Math.PI, 0, false);
                ctx.lineTo(this._w, (this._h / 2) + this.dial.options.baseRunOutSize);
                ctx.closePath();
                ctx.clip();
            };
            return DialMask180N;
        })(Dials.DialMask);
        Dials.DialMask180N = DialMask180N;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask180S = (function (_super) {
            __extends(DialMask180S, _super);
            function DialMask180S(dial) {
                _super.call(this, dial);
            }
            DialMask180S.prototype.apply = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, this.dial.options.baseRunOutSize);
                ctx.arc(this._w / 2, this.dial.options.baseRunOutSize, this._w / 2, Math.PI, 0, true);
                ctx.lineTo(this._w, 0);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.clip();
            };
            return DialMask180S;
        })(Dials.DialMask);
        Dials.DialMask180S = DialMask180S;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask180E = (function (_super) {
            __extends(DialMask180E, _super);
            function DialMask180E(dial) {
                _super.call(this, dial);
            }
            DialMask180E.prototype.apply = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(this.dial.options.baseRunOutSize, 0);
                ctx.arc(this.dial.options.baseRunOutSize, this._h / 2, this._h / 2, 3 * Math.PI / 2, Math.PI / 2, false);
                ctx.lineTo(0, this._h);
                ctx.lineTo(0, 0);
                ctx.closePath();
                ctx.clip();
            };
            return DialMask180E;
        })(Dials.DialMask);
        Dials.DialMask180E = DialMask180E;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialMask180W = (function (_super) {
            __extends(DialMask180W, _super);
            function DialMask180W(dial) {
                _super.call(this, dial);
            }
            DialMask180W.prototype.apply = function (ctx) {
                ctx.beginPath();
                ctx.moveTo(this._w, 0);
                ctx.lineTo(this._w, this._h);
                ctx.lineTo(this._w - this.dial.options.baseRunOutSize, this._h);
                ctx.arc(this._w - this.dial.options.baseRunOutSize, this._h / 2, this._h / 2, Math.PI / 2, 3 * Math.PI / 2, false);
                ctx.lineTo(this._w, 0);
                ctx.closePath();
                ctx.clip();
            };
            return DialMask180W;
        })(Dials.DialMask);
        Dials.DialMask180W = DialMask180W;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ScaleBase = (function () {
            /**
            * constructs a new NeedleBase
            */
            function ScaleBase(dialOptions, context) {
                this.dialOptions = dialOptions;
                this.context = context;
                // make needle context protected in typescript 1.1?
            }
            /**
            * render the needle onto the context provided
            */
            ScaleBase.prototype.render = function () {
                throw Error("Do not call the base render method, must be implemented in the derived class");
            };

            /**
            * gets the canvas for render ops
            */
            ScaleBase.prototype.canvas = function () {
                return this.context.canvas;
            };

            /**
            * clear the canvas to all transparent
            */
            ScaleBase.prototype.clear = function () {
                // There was a bug using the canvas on parallels with ie 10 where clear rect on the
                // context does not work. This workaround resizes the canvas to the same size causeing a clear.
                // Not pretty but necessary.
                this.context.canvas.width = this.context.canvas.width;
            };

            /**
            * destroy this object freeing up resources
            */
            ScaleBase.prototype.destroy = function () {
                this.dialOptions = null;
                this.context = null;
            };

            ScaleBase.prototype.drawTickLine = function (line, tickOptions) {
                this.context.beginPath();
                this.context.strokeStyle = tickOptions.strokeStyle;
                this.context.lineWidth = tickOptions.width;
                this.drawLine(line);
                this.context.closePath();
                this.context.stroke();
            };

            ScaleBase.prototype.drawLine = function (line) {
                this.context.moveTo(line.start.x, line.start.y);
                this.context.lineTo(line.end.x, line.end.y);
            };
            return ScaleBase;
        })();
        Dials.ScaleBase = ScaleBase;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialScale = (function (_super) {
            __extends(DialScale, _super);
            function DialScale(dialOptions, context) {
                _super.call(this, dialOptions, context);
            }
            DialScale.prototype.render = function () {
                var c = this.getMetrics();

                this.drawMajorTicks(this.context, c);
                this.drawScaleBand(this.context, c);
                this.drawScaleValues(this.context, c);
            };

            /**
            * draws the minor ticks for a single major tick division
            * @param target jquery canvas target
            * @param metrics dial metrics
            * @param angle the start angle of the major tick
            */
            DialScale.prototype.drawMinorTicks = function (ctx, metrics, angle) {
                ctx.beginPath();
                ctx.strokeStyle = this.dialOptions.scale.minorTicks.strokeStyle;
                ctx.lineWidth = this.dialOptions.scale.minorTicks.width;

                for (var min = 0; min < this.dialOptions.scale.minorTicks.count + 1; min++) {
                    var majStep = metrics.step;
                    var minStep = majStep / (this.dialOptions.scale.minorTicks.count + 1);
                    var stepAngle = angle + min * minStep;
                    var minorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dialOptions.scale.width / 2, stepAngle);
                    var minorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dialOptions.scale.width / 2) - this.dialOptions.scale.minorTicks.length, stepAngle);

                    ctx.moveTo(minorInner.x, minorInner.y);
                    ctx.lineTo(minorOuter.x, minorOuter.y);
                }
                ctx.closePath();
                ctx.stroke();
            };

            /**
            * draws the major tick lines for the dial
            * @param target jQuery target to render to
            * @param metrics the metrics for the dial
            */
            DialScale.prototype.drawMajorTicks = function (ctx, metrics) {
                for (var maj = 0; maj < this.dialOptions.scale.majorTicks.count; maj++) {
                    var angle = (metrics.startAngle + (maj * metrics.step));
                    var majorOuter = this.pointOnCircle(metrics.x, metrics.y, metrics.w + this.dialOptions.scale.width / 2, angle);
                    var majorInner = this.pointOnCircle(metrics.x, metrics.y, metrics.w - (this.dialOptions.scale.width / 2) - this.dialOptions.scale.majorTicks.length, angle);

                    // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                    //
                    if (maj < this.dialOptions.scale.majorTicks.count - 1) {
                        this.drawMinorTicks(ctx, metrics, angle);
                    }
                    ctx.beginPath();
                    ctx.strokeStyle = this.dialOptions.scale.majorTicks.strokeStyle;
                    ctx.lineWidth = this.dialOptions.scale.majorTicks.width;
                    ctx.moveTo(majorInner.x, majorInner.y);
                    ctx.lineTo(majorOuter.x, majorOuter.y);
                    ctx.closePath();
                    ctx.stroke();
                }
            };

            DialScale.prototype.drawScaleValues = function (ctx, metrics) {
                ctx.font = this.dialOptions.scale.font.pixelSize + "px " + this.dialOptions.scale.font.family;

                for (var maj = 0; maj < this.dialOptions.scale.majorTicks.count; maj++) {
                    var angle = (metrics.startAngle + (maj * metrics.step));

                    var fontRadius = metrics.w - (this.dialOptions.scale.width / 2);
                    fontRadius -= this.dialOptions.scale.majorTicks.length;
                    fontRadius -= this.dialOptions.scale.font.pixelSize;

                    var centerText = this.pointOnCircle(metrics.x, metrics.y, fontRadius, angle);

                    ctx.fillStyle = this.dialOptions.scale.font.fillStyle;
                    ctx.strokeStyle = this.dialOptions.scale.font.strokeStyle;
                    var stepValue = ((this.dialOptions.value.max - this.dialOptions.value.min) / (this.dialOptions.scale.majorTicks.count - 1)) * maj;

                    var txt = $.number(stepValue + this.dialOptions.value.min, this.dialOptions.scale.decimalPlaces);

                    ctx.lineWidth = 1;

                    angle = (3 * Math.PI) / 2 - (Math.PI - angle);

                    ctx.save();
                    ctx.textAlign = "center";
                    ctx.translate(centerText.x, centerText.y);
                    ctx.rotate(angle);
                    ctx.fillText(txt, 0, 0);

                    ctx.restore();
                }
            };

            /**
            * draw the outer scale band
            * @param ctx
            * @param metrics
            */
            DialScale.prototype.drawScaleBand = function (ctx, metrics) {
                ctx.beginPath();

                ctx.strokeStyle = this.dialOptions.scale.strokeStyle;
                ctx.lineWidth = this.dialOptions.scale.width;
                ctx.arc(metrics.x, metrics.y, metrics.w, metrics.startAngle, metrics.endAngle, false);
                ctx.stroke();
                ctx.closePath();
            };

            /**
            * Calculates the x,y coordinates of a point on the circumference
            * a circle.
            * @param cx the origin of the circle's x coordinate
            * @param cy the origin of the circle's y coordinate
            * @param radius of the circle
            * @param angle (in degrees of the point around the circle)
            * @returns {{x: number, y: number}}
            */
            DialScale.prototype.pointOnCircle = function (cx, cy, radius, angle) {
                return {
                    x: cx + radius * Math.cos(angle),
                    y: cy + radius * Math.sin(angle)
                };
            };

            DialScale.prototype.getMetrics = function () {
                var bezelInnerEdge = this.dialOptions.bezel.margin + (this.dialOptions.bezel.width);
                var scaleInnerEdge = this.dialOptions.scale.margin + (this.dialOptions.scale.width / 2);
                var offset = 0;

                var c = {
                    x: this.dialOptions.prv.effectiveWidth / 2,
                    y: this.dialOptions.prv.effectiveHeight / 2,
                    w: this.dialOptions.prv.effectiveWidth / 2 - (bezelInnerEdge + scaleInnerEdge),
                    startAngle: this.dialOptions.prv.scaleStartAngle,
                    endAngle: this.dialOptions.prv.scaleEndAngle,
                    step: 0
                };

                c.step = (Math.PI * 2 - (c.startAngle - c.endAngle)) / (this.dialOptions.scale.majorTicks.count - 1);

                switch (this.dialOptions.type) {
                    case Dials.DialBase.Dial360:
                        break;
                    case Dials.DialBase.Dial180N:
                        break;
                    case Dials.DialBase.Dial180S:
                        c.y = this.dialOptions.baseRunOutSize;
                        c.step = (c.endAngle - c.startAngle) / (this.dialOptions.scale.majorTicks.count - 1);
                        break;
                    case Dials.DialBase.Dial180E:
                        c.x = this.dialOptions.prv.needleX;
                        c.y = this.dialOptions.prv.needleY;
                        break;
                    case Dials.DialBase.Dial180W:
                        c.w = this.dialOptions.prv.effectiveHeight / 2 - (bezelInnerEdge + scaleInnerEdge);
                        c.step = (c.endAngle - c.startAngle) / (this.dialOptions.scale.majorTicks.count - 1);
                        c.x = this.dialOptions.prv.needleX;
                        c.y = this.dialOptions.prv.needleY;
                        break;
                }

                return c;
            };
            DialScale.piOver180 = Math.PI / 180;
            return DialScale;
        })(Dials.ScaleBase);
        Dials.DialScale = DialScale;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScale = (function (_super) {
            __extends(SliderScale, _super);
            function SliderScale(dialOptions, context) {
                _super.call(this, dialOptions, context);
                this.options = dialOptions.scale;

                this.scaleY = this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width);
                this.scaleInnerEdge = this.options.sideMargin + this.scaleY;
                this.scaleOuterEdge = this.dialOptions.prv.effectiveWidth - this.scaleInnerEdge;
            }
            SliderScale.prototype.render = function () {
                this.drawMajorTicks();
                this.drawScaleBand(this.context);
                this.drawScaleValues(this.context);
            };

            SliderScale.prototype.drawMinorTicks = function (step) {
                for (var min = 0; min < this.options.minorTicks.count; min++) {
                    var line = this.getMinorTickLine(step, min);
                    this.drawTickLine(line, this.options.minorTicks);
                }
            };

            /**
            * draws the major tick lines for the dial
            * @param target jQuery target to render to
            * @param metrics the metrics for the dial
            */
            SliderScale.prototype.drawMajorTicks = function () {
                for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                    var line = this.getMajorTickLine(maj);

                    // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                    if (maj < this.options.majorTicks.count - 1) {
                        this.drawMinorTicks(maj);
                    }
                    this.drawTickLine(line, this.options.majorTicks);
                }
            };

            SliderScale.prototype.drawScaleValues = function (ctx) {
                ctx.save();
                ctx.font = this.options.font.pixelSize + "px " + this.options.font.family;
                ctx.fillStyle = this.options.font.fillStyle;
                ctx.strokeStyle = this.options.font.strokeStyle;
                ctx.lineWidth = 1;

                ctx.textAlign = "center";

                for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                    var stepValue = ((this.dialOptions.value.max - this.dialOptions.value.min) / (this.options.majorTicks.count - 1)) * maj;
                    var txt = $.number(stepValue + this.dialOptions.value.min, this.options.decimalPlaces);

                    var at = this.getPointFoprScaleNumber(maj);

                    ctx.save();
                    ctx.translate(at.x, at.y);
                    ctx.rotate(at.r);
                    ctx.fillText(txt, 0, 0);
                    ctx.restore();
                }
                ctx.restore();
            };

            /**
            * draw the outer scale band
            * @param ctx
            * @param metrics
            */
            SliderScale.prototype.drawScaleBand = function (ctx) {
                ctx.beginPath();
                ctx.strokeStyle = this.options.strokeStyle;
                ctx.lineWidth = this.options.width;
                ctx.moveTo(this.scaleBandX1, this.scaleBandY1);
                ctx.lineTo(this.scaleBandX2, this.scaleBandY2);
                ctx.stroke();
                ctx.closePath();
            };

            /**
            * calculate the start and end points of a major tick line for this dial and orientation
            */
            SliderScale.prototype.getMajorTickLine = function (step) {
                throw Error("must be implemented in derived class");
            };

            /**
            * calculate the start and end points of a minor tick line for this dial and orientation
            */
            SliderScale.prototype.getMinorTickLine = function (step, increment) {
                throw Error("must be implemented in derived class");
            };

            /**
            * gets the point at which the text for a major tick value should be rendered
            */
            SliderScale.prototype.getPointFoprScaleNumber = function (maj) {
                throw Error("must be implemented in derived class");
            };
            return SliderScale;
        })(Dials.ScaleBase);
        Dials.SliderScale = SliderScale;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var NeedleBase = (function () {
            /**
            * constructs a new NeedleBase
            */
            function NeedleBase(options, needleContext) {
                this.options = options;
                this.needleContext = needleContext;
                // make needle context protected in typescript 1.1?
            }
            /**
            * render the needle onto the context provided
            */
            NeedleBase.prototype.render = function (stepValue) {
                throw Error("Do not call the base render method, must be implemented in the derived class");
            };

            /**
            * If a needle has a part of it rendered under the center of rotation, this property
            * defines the height of the bit under the pivot point at 12 o'clock. It allows
            * the dial value to move itself out of harms way
            */
            NeedleBase.prototype.descentHeightForNeedleBase = function () {
                return 0;
            };

            /**
            * gets the canvas for render ops
            */
            NeedleBase.prototype.canvas = function () {
                return this.needleContext.canvas;
            };

            /**
            * clear the canvas to all transparent
            */
            NeedleBase.prototype.clear = function () {
                // There was a bug using the canvas on parallels with ie 10 where clear rect on the
                // context does not work. This workaround resizes the canvas to the same size causeing a clear.
                // Not pretty but necessary.
                this.needleContext.canvas.width = this.needleContext.canvas.width;
            };

            /**
            * destroy this object freeing up resources
            */
            NeedleBase.prototype.destroy = function () {
                this.options = null;
                this.needleContext = null;
            };

            /**
            * draw an arrow head at a point based on current metrics
            */
            NeedleBase.prototype.arrow = function (x, y) {
                var size = this.options.needle.width;
                this.needleContext.lineWidth = this.options.needle.width;
                this.needleContext.strokeStyle = this.options.needle.fillStyle;

                this.needleContext.moveTo(x - size, y + size * 2);
                this.needleContext.lineTo(x, y);
                this.needleContext.lineTo(x + size, y + size * 2);
                this.needleContext.moveTo(x, y);
            };

            NeedleBase.prototype.circle = function (x, y) {
                this.needleContext.arc(x, y, this.options.needle.width, 0, Math.PI * 2);
            };
            return NeedleBase;
        })();
        Dials.NeedleBase = NeedleBase;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedle = (function (_super) {
            __extends(DialNeedle, _super);
            function DialNeedle(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            DialNeedle.prototype.render = function (stepValue) {
                this.clear();
                this.needleContext.save();

                var cx = this.options.prv.needleX;
                var cy = this.options.prv.needleY;

                var normaized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);

                var zeroAngle = this.options.prv.needleZeroOffset;
                var angle = zeroAngle + (normaized * this.options.prv.needleSweep);

                // rotate canvas to rotate needle
                this.needleContext.translate(cx, cy);
                this.needleContext.rotate(angle);
                this.needleContext.translate(-cx, -cy);

                this.needleContext.shadowColor = this.options.needle.shadowColor;
                this.needleContext.shadowBlur = this.options.needle.shadowBlur;
                this.needleContext.shadowOffsetX = this.options.needle.shadowX;
                this.needleContext.shadowOffsetY = this.options.needle.shadowY;

                this.needleContext.strokeStyle = this.options.needle.strokeStyle;
                this.needleContext.lineWidth = this.options.needle.strokeWidth;
                this.needleContext.fillStyle = this.options.needle.fillStyle;

                this._renderNeedle(cx, cy);

                // restore canvas rotation
                this.needleContext.translate(cx, cy);
                this.needleContext.rotate(-angle);
                this.needleContext.translate(-cx, -cy);
                this.needleContext.restore();
            };

            /**
            * If a needle has a part of it rendered under the center of rotation, this property
            * defines the height of the bit under the pivot point at 12 o'clock. It allows
            * the dial value to move itself out of harms way
            */
            DialNeedle.prototype.descentHeightForNeedleBase = function () {
                return 0;
            };

            /**
            * make me proteced in typescript 1.1
            */
            DialNeedle.prototype._renderNeedle = function (x, y) {
                throw Error("Do not call the base render method, must be implemented in the derived class");
            };
            return DialNeedle;
        })(Dials.NeedleBase);
        Dials.DialNeedle = DialNeedle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleFactory = (function () {
            function DialNeedleFactory() {
            }
            DialNeedleFactory.prototype.create = function (options, needleContext) {
                if (typeof this[options.needle.style] == 'function') {
                    return this[options.needle.style](options, needleContext);
                }
                return this.triangle(options, needleContext);
            };

            DialNeedleFactory.prototype.triangle = function (options, needleContext) {
                return new Dials.DialNeedleTriangle(options, needleContext);
            };

            DialNeedleFactory.prototype.arrow = function (options, needleContext) {
                return new Dials.DialNeedleArrow(options, needleContext);
            };

            DialNeedleFactory.prototype.line = function (options, needleContext) {
                return new Dials.DialNeedleLine(options, needleContext);
            };

            DialNeedleFactory.prototype.circleArrow = function (options, needleContext) {
                return new Dials.DialNeedleCircleArrow(options, needleContext);
            };

            DialNeedleFactory.prototype.dart = function (options, needleContext) {
                return new Dials.DialNeedleDart(options, needleContext);
            };

            DialNeedleFactory.prototype.dot = function (options, needleContext) {
                return new Dials.DialNeedleDot(options, needleContext);
            };
            DialNeedleFactory.triangle = "triangle";
            DialNeedleFactory.arrow = "arrow";
            DialNeedleFactory.line = "line";
            DialNeedleFactory.dart = "dart";
            DialNeedleFactory.dot = "dot";
            DialNeedleFactory.circleArrow = "circleArrow";
            return DialNeedleFactory;
        })();
        Dials.DialNeedleFactory = DialNeedleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleArrow = (function (_super) {
            __extends(DialNeedleArrow, _super);
            function DialNeedleArrow(options, needleContext) {
                _super.call(this, options, needleContext);

                this.hw = options.needle.width / 2 - (options.needle.strokeWidth / 2);
                var nt = options.bezel.margin + options.bezel.width / 2 + options.needle.margin;
                this.needleLength = options.prv.needleLength - nt;
            }
            DialNeedleArrow.prototype._renderNeedle = function (x, y) {
                //this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
                this.needleContext.beginPath();
                this.arrow(x, y - this.needleLength);
                this.needleContext.lineTo(x, y);

                this.needleContext.stroke();
            };
            return DialNeedleArrow;
        })(Dials.DialNeedle);
        Dials.DialNeedleArrow = DialNeedleArrow;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleLine = (function (_super) {
            __extends(DialNeedleLine, _super);
            function DialNeedleLine(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            DialNeedleLine.prototype._renderNeedle = function (x, y) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
                var needleLength = this.options.prv.needleLength - nt;
                this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
            };
            return DialNeedleLine;
        })(Dials.DialNeedle);
        Dials.DialNeedleLine = DialNeedleLine;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleTriangle = (function (_super) {
            __extends(DialNeedleTriangle, _super);
            function DialNeedleTriangle(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            DialNeedleTriangle.prototype._renderNeedle = function (x, y) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
                var needleLength = this.options.prv.needleLength - nt;

                this.needleContext.moveTo(x, y);
                this.needleContext.beginPath();

                this.needleContext.lineTo(x - hw, y);
                this.needleContext.lineTo(x, y - needleLength);
                this.needleContext.lineTo(x + hw, y);
                this.needleContext.closePath();
                this.needleContext.fill();
                this.needleContext.stroke();
            };
            return DialNeedleTriangle;
        })(Dials.DialNeedle);
        Dials.DialNeedleTriangle = DialNeedleTriangle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleCircleArrow = (function (_super) {
            __extends(DialNeedleCircleArrow, _super);
            function DialNeedleCircleArrow(options, needleContext) {
                _super.call(this, options, needleContext);
                this.hw = options.needle.width / 2 - (options.needle.strokeWidth / 2);
                var nt = options.bezel.margin + options.bezel.width / 2 + options.needle.margin;
                this.needleLength = options.prv.needleLength - nt;
            }
            DialNeedleCircleArrow.prototype._renderNeedle = function (x, y) {
                //this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
                this.needleContext.beginPath();
                this.arrow(x, y - this.needleLength);
                this.needleContext.lineTo(x, y);
                this.circle(x, y);
                this.needleContext.stroke();
            };

            /**
            * If a needle has a part of it rendered under the center of rotation, this property
            * defines the height of the bit under the pivot point at 12 o'clock. It allows
            * the dial value to move itself out of harms way
            */
            DialNeedleCircleArrow.prototype.descentHeightForNeedleBase = function () {
                return this.options.needle.width / 2;
            };
            return DialNeedleCircleArrow;
        })(Dials.DialNeedle);
        Dials.DialNeedleCircleArrow = DialNeedleCircleArrow;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleDart = (function (_super) {
            __extends(DialNeedleDart, _super);
            function DialNeedleDart(options, needleContext) {
                _super.call(this, options, needleContext);
                this.hw = options.needle.width / 2 - (options.needle.strokeWidth / 2);
                var nt = options.bezel.margin + options.bezel.width / 2 + options.needle.margin;
                this.needleLength = options.prv.needleLength - nt;
            }
            DialNeedleDart.prototype._renderNeedle = function (x, y) {
                //this.needleContext.fillRect(x - hw, y - needleLength, hw * 2, needleLength);
                this.needleContext.beginPath();
                this.arrow(x, y - this.needleLength);
                this.needleContext.lineTo(x, y);
                this.arrow(x, y);
                this.needleContext.stroke();
            };

            /**
            * If a needle has a part of it rendered under the center of rotation, this property
            * defines the height of the bit under the pivot point at 12 o'clock. It allows
            * the dial value to move itself out of harms way
            */
            DialNeedleDart.prototype.descentHeightForNeedleBase = function () {
                return this.options.needle.width * 2;
            };
            return DialNeedleDart;
        })(Dials.DialNeedle);
        Dials.DialNeedleDart = DialNeedleDart;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialValue = (function () {
            function DialValue(dial) {
                this.dial = dial;
            }
            DialValue.prototype.render = function (ctx, stepValue, position) {
                ctx.font = this.dial.options.value.font.pixelSize + "px " + this.dial.options.value.font.family;

                ctx.fillStyle = this.dial.options.value.font.fillStyle;
                ctx.strokeStyle = this.dial.options.value.font.strokeStyle;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = "rgba(0,0,0,0)";
                var txt = $.number(stepValue, this.dial.options.value.decimalPlaces);

                ctx.textAlign = "center";
                ctx.translate(position.x, position.y);
                ctx.rotate(position.r);
                ctx.translate(-position.x, -position.y);

                ctx.fillText(txt, position.x, position.y);

                ctx.translate(position.x, position.y);
                ctx.rotate(-position.r);
                ctx.translate(-position.x, -position.y);
            };
            return DialValue;
        })();
        Dials.DialValue = DialValue;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
/*
Copyright (C) 2013 David Black and other contributors
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var DbDashboards;
(function (DbDashboards) {
    /**
    * Base class for all dials in the kit
    */
    (function (Dials) {
        var DialBase = (function (_super) {
            __extends(DialBase, _super);
            /**
            * Constructs a new DialBase
            * @param options the options for the Dial
            */
            function DialBase(dialSpecificOverrides, userOverrides, target, farm) {
                _super.call(this);
                this.dialSpecificOverrides = dialSpecificOverrides;
                this.userOverrides = userOverrides;
                this.target = target;
                this.farm = farm;

                this.options = this.mergeSettings(dialSpecificOverrides, userOverrides);
                this.setOrientation();

                this.context = this.target[0].getContext("2d");

                this.backgroundContext = this.createLayerContext(this.context, 0, 0);

                this.foregroundContext = this.createLayerContext(this.context, 0, 0);
            }
            /**
            * Construction is really two phase as we can only initialize the various
            * renderers once the sub class has initialized its internal sizing options
            */
            DialBase.prototype.initializeOnce = function () {
                this.mask = this.getMask();
                this.needle = this.farm.needleFactory.create(this.options, this.createLayerContext(this.context, 0, 0));
                this.scale = this.farm.scaleFactory.create(this.options, this.backgroundContext);
                this.face = new Dials.DialFace(this, this.createLayerContext(this.context, 0, 0));
                this.glass = new Dials.DialGlass(this, this.createLayerContext(this.context, 0, 0));
            };

            /**
            * Sets the orientation of the dial, north is the default if not set. We take input from the outside world
            * as either north, south, east, west, or, n, s, e, w
            */
            DialBase.prototype.setOrientation = function () {
                this.options.orientation = Dials.Orientations.parse(this.options.orientation);
            };

            /**
            * Public method called to get or set the value of the dial
            * @param value the new value (omit to bet the current value)
            * @returns {number} the new or current value
            */
            DialBase.prototype.value = function (value) {
                if (typeof value != undefined) {
                    this.setValue(value);
                }
                return this.options.value.value;
            };

            DialBase.prototype.destroyInternal = function () {
                this.context = null;
                this.backgroundContext = null;
                this.needle.destroy();
                this.foregroundContext = null;
                this.face.destroy();
                this.glass.destroy();
                this.scale.destroy();
                this.options = null;
            };

            /**
            * Calls out to render the dial
            */
            DialBase.prototype.render = function () {
                this.initializeOnce();

                // todo refactor this to iterate an array of IRender
                this.mask.apply(this.face.context);
                this.mask.apply(this.backgroundContext);
                this.mask.apply(this.needle.needleContext);
                this.mask.apply(this.scale.context);
                this.mask.apply(this.foregroundContext);
                this.mask.apply(this.glass.context);

                this.face.render();

                this.scale.render();
                this.drawNeedle(this.options.value.min);

                if (this.options.glass.visible) {
                    this.glass.render();
                }

                if (this.options.bezel.visible) {
                    this.addBezel(this.foregroundContext);
                }

                this.renderLayers();

                if (this.options.value.value != this.options.value.min) {
                    this.setValue(this.options.value.value);
                }
            };

            DialBase.prototype.setValue = function (v) {
                var vals = this.options.value;

                var original = vals.value;

                // when we initialize a dial with no value and say min = 20, max = 30, then set the value afterwards
                // to 25, the animation starts from 0 (as original value not set). causing hilarious (not) results
                // so we clamp the original in the same way we clamp the new value
                if (original < vals.min) {
                    original = vals.min;
                } else if (original > vals.max) {
                    original = vals.max;
                }

                if (v < vals.min) {
                    v = vals.min;
                } else if (v > this.options.value.max) {
                    v = vals.max;
                }
                vals.value = v;

                var sweepDelta = Math.abs(vals.value - original) / (vals.max - vals.min);

                if (0 == v) {
                    this.drawNeedle(v);
                    this.renderLayers();
                } else {
                    $({ value: original }).animate({ value: vals.value }, {
                        duration: 1000 * sweepDelta,
                        step: (function (d) {
                            return function (now, tween) {
                                d.drawNeedle(tween.now);
                                d.renderLayers();
                            };
                        })(this)
                    });
                }
            };

            DialBase.prototype.renderLayers = function () {
                this.context.drawImage(this.face.canvas(), this.options.x, this.options.y);

                this.context.drawImage(this.backgroundContext.canvas, this.options.x, this.options.y);

                this.context.drawImage(this.needle.canvas(), this.options.x, this.options.y);
                this.context.drawImage(this.foregroundContext.canvas, this.options.x, this.options.y);

                this.context.drawImage(this.glass.canvas(), this.options.x, this.options.y);
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            DialBase.prototype.getMask = function () {
                throw new Error("This method must be implemented");
            };

            DialBase.prototype.addBezel = function (ctx) {
                throw new Error("This method must be implemented");
            };

            //addScale(ctx: CanvasRenderingContext2D) {
            //   throw new Error("This method must be implemented");
            //}
            DialBase.prototype.drawNeedle = function (stepValue) {
                this.needle.render(stepValue);
                var v = new Dials.DialValue(this);
                v.render(this.needle.needleContext, stepValue, this.getDialValuePostion());
            };

            /**
            * Ask the dial where its value should be displayed
            */
            DialBase.prototype.getDialValuePostion = function () {
                // silly default to make it obvious it hasnt been implemented
                var res = { x: 40, y: 40, r: Math.PI / 4 };

                return res;
            };

            /**
            * Forms the totality of the settings for a dial. These are formed of the following:
            *  The base defaults as specified below in the defaults object, overridden by:
            *      The user specified theme (or the default theme if not specified), overridden by:
            *          Any dial specific overrides (such as text placement), overridden by
            *              Any user specified values
            * @param dialSpecificDefaults conains any dial specific over rides or an empty object
            
            * @param userOptions (optional) can contain the user specific overrides
            */
            DialBase.prototype.mergeSettings = function (dialSpecificDefaults, userOptions) {
                var coords = { x: 0, y: 0, width: this.target.width(), height: this.target.height() };
                var theme = this.getThemeFromOptions(userOptions, DialBase.themes);
                var displaySet = this.getDisplaySetFromOptions(userOptions);

                var settings = $.extend(true, coords, DialBase.defaults, {}, theme, displaySet, dialSpecificDefaults, userOptions);
                return settings;
            };

            DialBase.prototype.getThemeFromOptions = function (options, themes) {
                if (typeof options == 'undefined' || typeof options.theme == 'undefined') {
                    return {};
                }
                var name = options.theme.trim();
                if (typeof name == "string") {
                    for (var t in themes) {
                        if (t == name) {
                            return themes[name];
                        }
                    }
                }
                return DialBase.themes.chocolate;
            };

            DialBase.prototype.getDisplaySetFromOptions = function (options) {
                if (typeof options.displaySet != 'undefined') {
                    var name = options.displaySet.trim();
                    for (var t in DialBase.settings) {
                        if (t == name) {
                            return DialBase.settings[name];
                        }
                    }
                }
                return {};
            };
            DialBase.Dial360 = "dial360";
            DialBase.Dial180 = "dial180";
            DialBase.Dial180N = "dial180N";
            DialBase.Dial180S = "dial180S";
            DialBase.Dial180E = "dial180E";
            DialBase.Dial180W = "dial180W";
            DialBase.Slider = "slider";
            DialBase.Thermometer = "thermometer";

            DialBase.defaults = {
                baseRunOutSize: 33,
                maskSubControls: true,
                face: {
                    gradientColor1: "red",
                    gradientColor2: "yellow"
                },
                value: {
                    value: 0,
                    min: 0,
                    decimalPlaces: 0,
                    max: 100,
                    font: {
                        strokeStyle: "pink",
                        fillStyle: "red",
                        family: "Verdana",
                        pixelSize: 14
                    },
                    margin: 4
                },
                bezel: {
                    strokeStyle: "yellow",
                    width: 5,
                    margin: 5,
                    visible: true
                },
                needle: {
                    strokeStyle: "pink",
                    fillStyle: "green",
                    strokeWidth: 0.5,
                    width: 7,
                    margin: 10,
                    shadowColor: "cyan",
                    shadowBlur: 1.5,
                    shadowX: -1.5,
                    shadowY: 1.5,
                    style: Dials.DialNeedleFactory.triangle
                },
                glass: {
                    shape: Dials.DialGlass.ShapeOut,
                    visible: true
                },
                scale: {
                    strokeStyle: "magenta",
                    margin: 3,
                    width: 3,
                    decimalPlaces: 0,
                    visible: true,
                    sideMargin: 25,
                    majorTicks: {
                        strokeStyle: "purple",
                        count: 7,
                        width: 2,
                        length: 7
                    },
                    minorTicks: {
                        strokeStyle: "orange",
                        count: 4,
                        width: 2,
                        length: 3
                    }, font: {
                        strokeStyle: "pink",
                        fillStyle: "red",
                        family: "Verdana",
                        pixelSize: 12
                    }
                }
            };

            DialBase.themes = {
                dark: {
                    face: {
                        gradientColor2: "#003",
                        gradientColor1: "#000"
                    },
                    value: {
                        font: {
                            fillStyle: "#fff"
                        }
                    },
                    bezel: {
                        strokeStyle: "rgba(126,126,255, 0.3)",
                        width: 7,
                        margin: 1
                    },
                    needle: {
                        fillStyle: "#fff",
                        strokeStyle: "#fff",
                        shadowColor: "#333",
                        margin: 30,
                        width: 3,
                        style: Dials.DialNeedleFactory.dart
                    },
                    scale: {
                        margin: 7,
                        strokeStyle: "#999",
                        majorTicks: {
                            strokeStyle: "#999"
                        },
                        minorTicks: {
                            strokeStyle: "#999"
                        },
                        font: {
                            fillStyle: "#999"
                        }
                    }
                },
                blue: {
                    face: {
                        gradientColor1: "#00d",
                        gradientColor2: "#003"
                    },
                    value: {
                        font: {
                            strokeStyle: "#85C2FF",
                            fillStyle: "#99e"
                        }
                    },
                    bezel: {
                        strokeStyle: "rgba(0,0,0,0)",
                        width: 1.5,
                        margin: 2
                    },
                    needle: {
                        fillStyle: "#CBCBF7",
                        strokeStyle: "rgba(0,0,0,0)",
                        strokeWidth: 1,
                        width: 4,
                        margin: 20,
                        shadowColor: "#333",
                        style: Dials.DialNeedleFactory.circleArrow
                    },
                    scale: {
                        strokeStyle: "#99e",
                        majorTicks: {
                            strokeStyle: "#99e",
                            length: 10
                        },
                        minorTicks: {
                            strokeStyle: "#99e",
                            length: 5
                        },
                        font: {
                            strokeStyle: "#B8CEFC",
                            fillStyle: "#B8CEFC"
                        },
                        width: 8,
                        margin: 3
                    }
                },
                chocolate: {
                    face: {
                        gradientColor1: "black",
                        gradientColor2: "brown"
                    },
                    value: {
                        font: {
                            strokeStyle: "#EBD6CC",
                            fillStyle: "#EBD6CC"
                        }
                    },
                    bezel: {
                        strokeStyle: "#AD5C33"
                    },
                    needle: {
                        fillStyle: "#DEC7A2",
                        strokeStyle: "#DEC7A2",
                        shadowColor: "#333",
                        style: Dials.DialNeedleFactory.arrow,
                        width: 3,
                        margin: 20
                    },
                    scale: {
                        strokeStyle: "#C28566",
                        majorTicks: {
                            strokeStyle: "brown"
                        },
                        minorTicks: {
                            strokeStyle: "#FFFFE0"
                        },
                        font: {
                            strokeStyle: "#D4AA94",
                            fillStyle: "#D4AA94"
                        }
                    }
                },
                metro: {
                    glass: {
                        visible: false
                    },
                    face: {
                        gradientColor1: "#2881E3",
                        gradientColor2: "#2881E3"
                    },
                    value: {
                        font: {
                            strokeStyle: "#FFFFFF",
                            fillStyle: "#FFFFFF"
                        }
                    },
                    bezel: {
                        visible: false,
                        width: 0
                    },
                    needle: {
                        fillStyle: "#FFFFFF",
                        strokeStyle: "#ffffff",
                        shadowColor: "rgba(0,0,0,0)",
                        style: Dials.DialNeedleFactory.line,
                        width: 3,
                        margin: 20
                    },
                    scale: {
                        sideMargin: 15,
                        strokeStyle: "#FFFFFF",
                        majorTicks: {
                            strokeStyle: "#FFFFFF"
                        },
                        minorTicks: {
                            strokeStyle: "#FFFFFF"
                        }, font: {
                            strokeStyle: "#FFFFFF",
                            fillStyle: "#FFFFFF",
                            family: "Helvetica"
                        }
                    }
                },
                paper: {
                    glass: {
                        visible: false
                    }, face: {
                        gradientColor1: "#DCE0CE",
                        gradientColor2: "#DCE0CE"
                    },
                    value: {
                        font: {
                            strokeStyle: "#444444",
                            fillStyle: "#444444"
                        }
                    },
                    bezel: {
                        strokeStyle: "#555555",
                        margin: 4
                    },
                    needle: {
                        fillStyle: "#ffffff",
                        strokeStyle: "#000",
                        shadowColor: "rgba(0,0,0,0)",
                        style: Dials.DialNeedleFactory.dot,
                        width: 5,
                        margin: 10
                    },
                    scale: {
                        strokeStyle: "#000000",
                        margin: 6,
                        majorTicks: {
                            strokeStyle: "#444444"
                        },
                        minorTicks: {
                            strokeStyle: "#888888"
                        },
                        font: {
                            strokeStyle: "#000",
                            fillStyle: "#000"
                        }
                    }
                }
            };

            DialBase.settings = {
                medium: {
                    baseRunOutSize: 22,
                    value: {
                        font: {
                            pixelSize: 10
                        },
                        margin: 5
                    },
                    bezel: {
                        width: 3,
                        margin: 1.5
                    },
                    scale: {
                        margin: 1,
                        width: 2,
                        majorTicks: {
                            count: 5,
                            length: 3
                        },
                        minorTicks: {
                            count: 5,
                            length: 1.5
                        },
                        font: {
                            pixelSize: 8
                        }
                    },
                    needle: {
                        margin: 4,
                        width: 3
                    }
                },
                small: {
                    baseRunOutSize: 12,
                    value: {
                        font: {
                            pixelSize: 7
                        },
                        margin: 2
                    },
                    bezel: {
                        width: 1,
                        margin: 0.5
                    },
                    scale: {
                        margin: 0.5,
                        width: 1,
                        majorTicks: {
                            count: 5,
                            length: 3
                        },
                        minorTicks: {
                            count: 5,
                            length: 1.5
                        },
                        font: {
                            pixelSize: 8,
                            fillStyle: "rgba(0,0,0,0)",
                            strokeStyle: "rgba(0,0,0,0)"
                        }
                    },
                    needle: {
                        margin: 4,
                        width: 2
                    }
                }
            };
            return DialBase;
        })(DbDashboards.Common.Dashboard);
        Dials.DialBase = DialBase;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ControlFactoryBase = (function () {
            function ControlFactoryBase(options, target, expectedType) {
                this.options = options;
                this.target = target;
                if (options.type.toLowerCase() != expectedType) {
                    throw Error("ControlFactory::Illegal options, expected: " + expectedType + " got: " + options.type);
                }
                options.orientation = Dials.Orientations.parse(options.orientation);
            }
            /**
            * factory for sliders
            */
            ControlFactoryBase.prototype.create = function () {
                // derived classes implement one method named per orientation north() etc
                // this line dispatches the calls to the sub class
                return this[this.options.orientation](this.options, this.target);
            };
            ControlFactoryBase.slider = "slider";
            ControlFactoryBase.dial180 = "dial180";
            ControlFactoryBase.dial360 = "dial360";
            ControlFactoryBase.marquee = "marquee";
            ControlFactoryBase.thermometer = "thermometer";
            return ControlFactoryBase;
        })();
        Dials.ControlFactoryBase = ControlFactoryBase;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var Dial180 = (function (_super) {
            __extends(Dial180, _super);
            function Dial180(type, dialSpecificOverrides, userOverrides, target) {
                _super.call(this, dialSpecificOverrides, userOverrides, target, {
                    needleFactory: new Dials.DialNeedleFactory(),
                    scaleFactory: new Dials.DialScaleFactory()
                });
                this.type = type;
                this.dialSpecificOverrides = dialSpecificOverrides;
                this.userOverrides = userOverrides;
                this.target = target;
                this.options.type = type;
            }
            //addScale(ctx: CanvasRenderingContext2D) {
            //    var s = new DialScale(this.options, ctx);
            //    s.render();
            //}
            Dial180.prototype.addBezel = function (ctx) {
                var b = new Dials.DialBezel(this);
                b.addLayer(ctx);
            };
            Dial180.overrideDefaults = {
                value: {
                    margin: 5
                }
            };
            return Dial180;
        })(Dials.DialBase);
        Dials.Dial180 = Dial180;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180N = (function (_super) {
            __extends(Dial180N, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Dial180N(options, target) {
                _super.call(this, Dials.DialBase.Dial180N, Dials.Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize,
                    effectiveWidth: minAxisSize,
                    scaleStartAngle: Math.PI,
                    scaleEndAngle: 0,
                    needleZeroOffset: -Math.PI / 2,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: (minAxisSize / 2),
                    needleY: (minAxisSize / 2),
                    needleLength: minAxisSize / 2
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            Dial180N.prototype.getDialValuePostion = function () {
                var ty = 0;
                var tx = 0;
                var r = 0;

                tx = (this.options.prv.effectiveWidth / 2);
                ty = this.options.prv.needleY + this.options.value.font.pixelSize + this.options.needle.width;

                return { x: tx, y: ty, r: r };
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial180N.prototype.getMask = function () {
                return new Dials.DialMask180N(this);
            };
            return Dial180N;
        })(Dials.Dial180);
        Dials.Dial180N = Dial180N;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180S = (function (_super) {
            __extends(Dial180S, _super);
            function Dial180S(options, target) {
                _super.call(this, Dials.DialBase.Dial180S, Dials.Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: minAxisSize - 1,
                    scaleStartAngle: 0,
                    scaleEndAngle: Math.PI,
                    needleZeroOffset: Math.PI / 2,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: this.options.baseRunOutSize,
                    needleLength: minAxisSize / 2
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            Dial180S.prototype.getDialValuePostion = function () {
                var tx = this.options.prv.effectiveWidth / 2;
                var ty = this.options.prv.needleY - this.options.needle.width - 3;
                var r = 0;
                return { x: tx, y: ty, r: r };
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial180S.prototype.getMask = function () {
                return new Dials.DialMask180S(this);
            };
            return Dial180S;
        })(Dials.Dial180);
        Dials.Dial180S = Dial180S;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180E = (function (_super) {
            __extends(Dial180E, _super);
            function Dial180E(options, target) {
                _super.call(this, Dials.DialBase.Dial180E, Dials.Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: minAxisSize - 1,
                    scaleStartAngle: 3 * Math.PI / 2,
                    scaleEndAngle: Math.PI / 2,
                    needleZeroOffset: 0,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: this.options.baseRunOutSize,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            Dial180E.prototype.getDialValuePostion = function () {
                var tx = this.options.prv.needleX - this.options.value.font.pixelSize - this.options.needle.width;

                var ty = this.options.prv.effectiveHeight / 2;
                var r = Math.PI / 2;

                return { x: tx, y: ty, r: r };
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial180E.prototype.getMask = function () {
                return new Dials.DialMask180E(this);
            };
            return Dial180E;
        })(Dials.Dial180);
        Dials.Dial180E = Dial180E;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A semicircular 180 degree dial with a sweep of  180 degrees
        */
        var Dial180W = (function (_super) {
            __extends(Dial180W, _super);
            function Dial180W(options, target) {
                _super.call(this, Dials.DialBase.Dial180W, Dials.Dial180.overrideDefaults, options, target);
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = this.options.width;
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    h = this.options.height;
                }

                var minAxisSize = (Math.max(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize - 1,
                    effectiveWidth: (minAxisSize / 2 + this.options.baseRunOutSize),
                    scaleStartAngle: Math.PI / 2,
                    scaleEndAngle: 3 * Math.PI / 2,
                    needleZeroOffset: Math.PI,
                    needleSweep: 180 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            Dial180W.prototype.getDialValuePostion = function () {
                var tx = this.options.prv.needleX + this.options.value.font.pixelSize + this.options.needle.width;
                var ty = this.options.prv.effectiveHeight / 2;
                var r = 3 * Math.PI / 2;
                return { x: tx, y: ty, r: r };
            };

            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial180W.prototype.getMask = function () {
                return new Dials.DialMask180W(this);
            };
            return Dial180W;
        })(Dials.Dial180);
        Dials.Dial180W = Dial180W;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var Dial180Factory = (function (_super) {
            __extends(Dial180Factory, _super);
            function Dial180Factory(options, target) {
                _super.call(this, options, target, Dials.ControlFactoryBase.dial180);
            }
            Dial180Factory.prototype.north = function (options, target) {
                return new DbDashboards.Dials.Dial180N(options, target);
            };

            Dial180Factory.prototype.south = function (options, target) {
                return new DbDashboards.Dials.Dial180S(options, target);
            };

            Dial180Factory.prototype.east = function (options, target) {
                return new DbDashboards.Dials.Dial180E(options, target);
            };

            Dial180Factory.prototype.west = function (options, target) {
                return new DbDashboards.Dials.Dial180W(options, target);
            };
            return Dial180Factory;
        })(Dials.ControlFactoryBase);
        Dials.Dial180Factory = Dial180Factory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360 = (function (_super) {
            __extends(Dial360, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Dial360(options, target) {
                _super.call(this, Dial360.overrideDefaults, options, target, {
                    needleFactory: new Dials.DialNeedleFactory(),
                    scaleFactory: new Dials.DialScaleFactory()
                });
                this.target = target;

                var w = this.target.width();
                if (this.options.width != undefined) {
                    w = Math.min(this.options.width, w);
                }

                var h = this.target.height();
                if (this.options.height != undefined) {
                    w = Math.min(this.options.height, h);
                }

                var minAxisSize = (Math.min(w, h)) - 1;

                this.options.prv = {
                    effectiveHeight: minAxisSize,
                    effectiveWidth: minAxisSize,
                    scaleStartAngle: (3 * Math.PI) / 4,
                    scaleEndAngle: (Math.PI) / 4,
                    needleZeroOffset: -(3 * Math.PI) / 4,
                    needleSweep: 270 * Dials.DialScale.piOver180,
                    needleX: minAxisSize / 2,
                    needleY: minAxisSize / 2,
                    needleLength: minAxisSize / 2
                };

                this.setOptions(this.options.prv);
            }
            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Dial360.prototype.getMask = function () {
                return new Dials.DialMask360(this);
            };

            //addScale(ctx: CanvasRenderingContext2D) {
            //    var s = new DialScale(this.options, ctx);
            //    s.render();
            //}
            Dial360.prototype.addBezel = function (ctx) {
                var b = new Dials.DialBezel(this);
                b.addLayer(ctx);
            };

            /**
            * Ask the dial where its value should be displayed
            */
            Dial360.prototype.getDialValuePostion = function () {
                var res = { x: 0, y: 0, r: 0 };
                res.x = (this.options.prv.effectiveWidth / 2);
                res.y = (this.options.prv.effectiveHeight - (this.options.bezel.margin + this.options.bezel.width / 2));
                res.y = res.y - this.options.value.margin;
                return res;
            };

            Dial360.prototype.setOptions = function (options) {
            };
            Dial360.overrideDefaults = {
                type: Dials.DialBase.Dial360,
                value: {
                    margin: 15
                }
            };
            return Dial360;
        })(Dials.DialBase);
        Dials.Dial360 = Dial360;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var Dial360Factory = (function (_super) {
            __extends(Dial360Factory, _super);
            function Dial360Factory(options, target) {
                _super.call(this, options, target, Dials.ControlFactoryBase.dial360);
            }
            Dial360Factory.prototype.north = function (options, target) {
                return new Dials.Dial360N(options, target);
            };

            Dial360Factory.prototype.south = function (options, target) {
                return new Dials.Dial360S(options, target);
            };

            Dial360Factory.prototype.east = function (options, target) {
                return new Dials.Dial360E(options, target);
            };

            Dial360Factory.prototype.west = function (options, target) {
                return new Dials.Dial360W(options, target);
            };
            return Dial360Factory;
        })(Dials.ControlFactoryBase);
        Dials.Dial360Factory = Dial360Factory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var Slider = (function (_super) {
            __extends(Slider, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Slider(options, target) {
                _super.call(this, Slider.overrideDefaults, options, target, {
                    needleFactory: new Dials.SliderNeedleFactory(),
                    scaleFactory: new Dials.SliderScaleFactory()
                });
                this.target = target;
                this.needleLength = 10;
            }
            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Slider.prototype.getMask = function () {
                return new Dials.SliderMask(this);
            };

            //addScale(ctx: CanvasRenderingContext2D) {
            //    var s = new SliderScale(this.options, ctx);
            //    s.render();
            //}
            Slider.prototype.addBezel = function (ctx) {
                var b = new Dials.SliderBezel(this);
                b.addLayer(ctx);
            };

            Slider.prototype.effectiveHeight = function () {
                return this.options.height || this.target.height();
            };

            Slider.prototype.effectiveWidth = function () {
                return this.options.width || this.target.width();
            };

            /**
            * gets the y position for a horizontal gauges arrow in North orientation. This will be the x for a West dial and effective-that for other side
            */
            Slider.prototype.needleCenterFromTop = function () {
                return (this.options.bezel.margin + this.options.bezel.width + this.options.scale.margin + this.options.scale.width + (this.needleLength / 2));
            };

            Slider.prototype.needleMinimumOffSet = function () {
                return this.options.scale.sideMargin + this.options.scale.majorTicks.width / 2;
            };
            Slider.overrideDefaults = {
                type: Dials.DialBase.Slider,
                value: {}
            };
            return Slider;
        })(Dials.DialBase);
        Dials.Slider = Slider;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var SliderN = (function (_super) {
            __extends(SliderN, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function SliderN(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var y = this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleX: 0,
                    needleY: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(this.needleMinimumOffSet(), y),
                    maxPoint: new Dials.Point(this.effectiveWidth() - this.needleMinimumOffSet(), y),
                    needleRotation: Math.PI
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            SliderN.prototype.getDialValuePostion = function () {
                var tx = (this.options.prv.effectiveWidth / 2);
                var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
                var ty = this.options.height - (bezOffset + (this.options.value.font.pixelSize / 2));

                return { x: tx, y: ty, r: 0 };
            };
            return SliderN;
        })(Dials.Slider);
        Dials.SliderN = SliderN;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var SliderS = (function (_super) {
            __extends(SliderS, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function SliderS(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var y = this.effectiveHeight() - this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleX: 0,
                    needleY: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(this.needleMinimumOffSet(), y),
                    maxPoint: new Dials.Point(this.effectiveWidth() - this.needleMinimumOffSet(), y),
                    needleRotation: 0
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            SliderS.prototype.getDialValuePostion = function () {
                var tx = (this.options.prv.effectiveWidth / 2);
                var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
                var ty = (bezOffset + (this.options.value.font.pixelSize));
                ty += this.options.value.margin;

                return { x: tx, y: ty, r: 0 };
            };
            return SliderS;
        })(Dials.Slider);
        Dials.SliderS = SliderS;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var SliderE = (function (_super) {
            __extends(SliderE, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function SliderE(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var x = this.effectiveWidth() - this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleX: 0,
                    needleY: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(x, this.needleMinimumOffSet()),
                    maxPoint: new Dials.Point(x, this.effectiveHeight() - this.needleMinimumOffSet()),
                    needleRotation: 3 * (Math.PI / 2)
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            SliderE.prototype.getDialValuePostion = function () {
                var ty = (this.options.prv.effectiveHeight / 2);
                var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
                var tx = (bezOffset + (this.options.value.font.pixelSize)) + 2;
                return { x: tx, y: ty, r: 0 };
            };
            return SliderE;
        })(Dials.Slider);
        Dials.SliderE = SliderE;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var SliderW = (function (_super) {
            __extends(SliderW, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function SliderW(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var x = this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleX: 0,
                    needleY: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(x, this.needleMinimumOffSet()),
                    maxPoint: new Dials.Point(x, this.effectiveHeight() - this.needleMinimumOffSet()),
                    needleRotation: Math.PI / 2
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            SliderW.prototype.getDialValuePostion = function () {
                var ty = (this.options.prv.effectiveHeight / 2);
                var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
                var tx = this.options.width - (bezOffset + (this.options.value.font.pixelSize) + 2);
                return { x: tx, y: ty, r: 0 };
            };
            return SliderW;
        })(Dials.Slider);
        Dials.SliderW = SliderW;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderFactory = (function (_super) {
            __extends(SliderFactory, _super);
            function SliderFactory(options, target) {
                _super.call(this, options, target, Dials.ControlFactoryBase.slider);
            }
            SliderFactory.prototype.north = function (options, target) {
                return new DbDashboards.Dials.SliderN(options, target);
            };

            SliderFactory.prototype.south = function (options, target) {
                return new DbDashboards.Dials.SliderS(options, target);
            };

            SliderFactory.prototype.east = function (options, target) {
                return new DbDashboards.Dials.SliderE(options, target);
            };

            SliderFactory.prototype.west = function (options, target) {
                return new DbDashboards.Dials.SliderW(options, target);
            };
            return SliderFactory;
        })(Dials.ControlFactoryBase);
        Dials.SliderFactory = SliderFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderBezel = (function () {
            function SliderBezel(dial) {
                this.dial = dial;
            }
            SliderBezel.prototype.addLayer = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                var offset = (this.dial.options.bezel.width / 2) + this.dial.options.bezel.margin;

                ctx.beginPath();
                ctx.strokeStyle = this.dial.options.bezel.strokeStyle;
                ctx.lineWidth = this.dial.options.bezel.width;

                ctx.rect(offset, offset, w - 2 * offset, h - 2 * offset);

                ctx.closePath();
                ctx.stroke();
            };
            return SliderBezel;
        })();
        Dials.SliderBezel = SliderBezel;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderMask = (function (_super) {
            __extends(SliderMask, _super);
            function SliderMask(dial) {
                _super.call(this, dial);
            }
            SliderMask.prototype.apply = function (ctx) {
                var w = this.dial.options.prv.effectiveWidth;
                var h = this.dial.options.prv.effectiveHeight;

                ctx.rect(0, 0, w, h);
                ctx.clip();
            };
            return SliderMask;
        })(Dials.DialMask);
        Dials.SliderMask = SliderMask;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedle = (function (_super) {
            __extends(SliderNeedle, _super);
            function SliderNeedle(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedle.prototype.render = function (stepValue) {
                this.needleContext.save();
                this.clear();

                var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);
                var pos = this.tween(normalized);

                this.needleContext.shadowColor = this.options.needle.shadowColor;
                this.needleContext.shadowBlur = this.options.needle.shadowBlur;
                this.needleContext.shadowOffsetX = this.options.needle.shadowX;
                this.needleContext.shadowOffsetY = this.options.needle.shadowY;

                this.needleContext.strokeStyle = this.options.needle.strokeStyle;
                this.needleContext.lineWidth = this.options.needle.strokeWidth;
                this.needleContext.fillStyle = this.options.needle.fillStyle;

                // rotate canvas to rotate needle
                this.needleContext.translate(pos.x, pos.y);
                this.needleContext.rotate(this.options.prv.needleRotation);
                this.needleContext.translate(-pos.x, -pos.y);

                this._renderNeedle(pos);

                this.needleContext.translate(pos.x, pos.y);
                this.needleContext.rotate(-this.options.prv.needleRotation);
                this.needleContext.translate(-pos.x, -pos.y);
                this.needleContext.restore();
            };

            SliderNeedle.prototype.tween = function (normalizedValue) {
                return new Dials.Point(this.options.prv.minPoint.x + ((this.options.prv.maxPoint.x - this.options.prv.minPoint.x) * normalizedValue), this.options.prv.minPoint.y + ((this.options.prv.maxPoint.y - this.options.prv.minPoint.y) * normalizedValue));
            };

            /**
            * make me proteced in typescript 1.1
            */
            SliderNeedle.prototype._renderNeedle = function (pos) {
                throw Error("Do not call the base render method, must be implemented in the derived class");
            };
            return SliderNeedle;
        })(Dials.NeedleBase);
        Dials.SliderNeedle = SliderNeedle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Marquees) {
        var Characters = (function () {
            function Characters() {
                /**
                *  Maps characters to the bitmaps that form their shape. Characters are rendered
                *  as 6x8 dots. Currently the character set is limited to fairly traditional ASCII
                *  style characters (a..z A..9 space 0..9 and the traditional UK/US shift symbols.
                */
                this.characterMap = {
                    " ": [0, 0, 0, 0, 0, 0],
                    "A": [63, 68, 68, 68, 63, 0],
                    "B": [127, 73, 73, 73, 54, 0],
                    "C": [62, 65, 65, 65, 34, 0],
                    "D": [127, 65, 65, 34, 28, 0],
                    "E": [127, 73, 73, 73, 65, 0],
                    "F": [127, 72, 72, 72, 64, 0],
                    "G": [62, 65, 73, 73, 47, 0],
                    "H": [127, 8, 8, 8, 127, 0],
                    "I": [0, 65, 127, 65, 0, 0],
                    "J": [0, 2, 65, 126, 64, 0],
                    "K": [127, 8, 20, 34, 65, 0],
                    "L": [127, 1, 1, 1, 1, 0],
                    "M": [127, 32, 16, 32, 127, 0],
                    "N": [127, 16, 8, 4, 127, 0],
                    "O": [62, 65, 65, 65, 62, 0],
                    "P": [127, 72, 72, 72, 48, 0],
                    "Q": [62, 65, 69, 66, 61, 0],
                    "R": [127, 72, 76, 74, 49, 0],
                    "S": [49, 73, 73, 73, 102, 0],
                    "T": [64, 64, 127, 64, 64, 0],
                    "U": [126, 1, 1, 1, 126, 0],
                    "V": [124, 2, 1, 2, 124, 0],
                    "W": [126, 1, 6, 1, 126, 0],
                    "X": [99, 20, 8, 20, 99, 0],
                    "Y": [112, 8, 7, 8, 112, 0],
                    "Z": [67, 69, 73, 81, 97, 0],
                    "a": [2, 21, 21, 21, 15, 0],
                    "b": [127, 9, 17, 17, 14, 0],
                    "c": [14, 17, 17, 17, 2, 0],
                    "d": [14, 17, 17, 9, 127, 0],
                    "e": [14, 21, 21, 21, 12, 0],
                    "f": [8, 63, 72, 64, 32, 0],
                    "g": [8, 21, 21, 21, 30, 0],
                    "h": [127, 8, 16, 16, 15, 0],
                    "i": [0, 17, 95, 1, 0, 0],
                    "j": [2, 1, 17, 94, 0, 0],
                    "k": [127, 4, 10, 17, 0, 0],
                    "l": [0, 65, 127, 1, 0, 0],
                    "m": [15, 16, 12, 16, 15, 0],
                    "n": [31, 8, 16, 16, 15, 0],
                    "o": [14, 17, 17, 17, 14, 0],
                    "p": [31, 20, 20, 20, 8, 0],
                    "q": [8, 20, 20, 12, 31, 0],
                    "r": [31, 8, 16, 16, 8, 0],
                    "s": [8, 21, 21, 21, 2, 0],
                    "t": [16, 126, 17, 1, 2, 0],
                    "u": [30, 1, 1, 2, 31, 0],
                    "v": [28, 2, 1, 2, 28, 0],
                    "w": [30, 1, 6, 1, 30, 0],
                    "x": [17, 10, 4, 10, 17, 0],
                    "y": [0, 25, 5, 5, 30, 0],
                    "z": [17, 19, 21, 25, 17, 0],
                    "!": [0, 0, 121, 0, 0, 0],
                    "\\": [0, 112, 0, 112, 0, 0],
                    "#": [20, 127, 20, 127, 20, 0],
                    "$": [18, 42, 127, 42, 36, 0],
                    "%": [98, 100, 8, 19, 35, 0],
                    "&": [54, 73, 85, 34, 5, 0],
                    "'": [0, 80, 96, 0, 0, 0],
                    "(": [0, 28, 34, 65, 0, 0],
                    ")": [0, 65, 34, 28, 0, 0],
                    "*": [20, 8, 62, 8, 20, 0],
                    "+": [8, 8, 62, 8, 8, 0],
                    ",": [0, 5, 6, 0, 0, 0],
                    "-": [8, 8, 8, 8, 8, 0],
                    ".": [0, 3, 3, 0, 0, 0],
                    "/": [2, 4, 8, 16, 32, 0],
                    "0": [62, 69, 73, 81, 62, 0],
                    "1": [0, 33, 127, 1, 0, 0],
                    "2": [33, 67, 69, 73, 49, 0],
                    "3": [66, 65, 81, 105, 70, 0],
                    "4": [8, 24, 40, 127, 8, 0],
                    "5": [114, 81, 81, 81, 78, 0],
                    "6": [30, 41, 73, 73, 6, 0],
                    "7": [64, 71, 72, 80, 96, 0],
                    "8": [54, 73, 73, 73, 54, 0],
                    "9": [48, 73, 73, 74, 60, 0],
                    ":": [0, 54, 54, 0, 0, 0],
                    ";": [0, 53, 54, 0, 0, 0],
                    "<": [8, 20, 34, 65, 0, 0],
                    "=": [20, 20, 20, 20, 20, 0],
                    ">": [65, 34, 20, 8, 0, 0],
                    "?": [32, 64, 69, 72, 48, 0],
                    "@": [38, 73, 79, 65, 62, 0],
                    "[": [0, 127, 65, 65, 0, 0],
                    "]": [0, 65, 65, 127, 0, 0],
                    "£": [9, 63, 73, 33, 0, 0],
                    "^": [16, 32, 64, 32, 16, 0],
                    "_": [1, 1, 1, 1, 1, 0],
                    "`": [64, 32, 16, 0, 0, 0],
                    "{": [0, 8, 54, 65, 0, 0],
                    "|": [0, 0, 119, 0, 0, 0],
                    "}": [0, 65, 54, 8, 0, 0]
                };
            }
            Characters.prototype.getCharacter = function (character) {
                if (this.characterMap.hasOwnProperty(character)) {
                    return this.characterMap[character];
                }
            };
            return Characters;
        })();
        Marquees.Characters = Characters;
    })(DbDashboards.Marquees || (DbDashboards.Marquees = {}));
    var Marquees = DbDashboards.Marquees;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Marquees) {
        var LedMarquee = (function (_super) {
            __extends(LedMarquee, _super);
            function LedMarquee(userOptions, target) {
                _super.call(this);
                this.userOptions = userOptions;
                this.target = target;
                // requested Frames per second
                this.paused = false;
                this.finished = false;
                this.fps = 0;
                this.defaults = {
                    message: "Hey you need to supply a message to show!",
                    ledSize: 2,
                    ledMargin: 1,
                    ledShape: "square",
                    backgroundFillStyle: "#000",
                    ledOffFillStyle: "#500",
                    ledOnFillStyle: "#f00",
                    showFPS: false,
                    fps: 30,
                    speed: 2
                };
                this.lastFrameTime = 0;

                var theme = this.getThemeFromOptions(userOptions, LedMarquee.themes);

                this.options = $.extend({}, this.defaults, theme, userOptions);

                this.content = this.options.message;

                this.onScreenContext = this.target[0].getContext("2d");
                this.backBuffer = this.createLayerContext(this.onScreenContext, 0, 0);
                this.fillBackBuffer();
                this.characters = new Marquees.Characters();
                this.currentStringPos = -1;
                this.setNextCharacter();
            }
            LedMarquee.prototype.getThemeFromOptions = function (options, themes) {
                var name = options.theme.trim();
                if (typeof name == "string") {
                    for (var t in themes) {
                        if (t == name) {
                            return themes[name];
                        }
                    }
                }
                return LedMarquee.themes.chocolate;
            };

            LedMarquee.prototype.render = function () {
                this.start = new Date();
                this.intervalId = window.setInterval((function (marquee) {
                    return function () {
                        if (!marquee.paused && !marquee.finished) {
                            marquee.update();
                            marquee.draw();
                            marquee.updateFps();
                        } else if (marquee.finished) {
                            window.clearInterval(marquee.intervalId);
                        }
                    };
                })(this), 1000 / this.options.fps);
            };

            LedMarquee.prototype.updateFps = function () {
                var now = new Date();
                var span = (now.getTime() - this.start.getTime());

                if (span > 1000) {
                    this.fps = this.frames;
                    this.frames = 0;
                    this.start = now;
                }
                if (this.options.showFPS) {
                    this.onScreenContext.font = "Verdana 6px";
                    this.onScreenContext.strokeStyle = "white";
                    this.onScreenContext.strokeText("" + (this.fps | 0), 2, 8);
                }
            };

            LedMarquee.prototype.destroyInternal = function () {
                this.paused = true;
                this.finished = true;
                window.clearInterval(this.intervalId);
                this.backBuffer = null;
                this.onScreenContext = null;
                this.options = null;
            };

            /**
            * render the current led image to the onscreen canvas
            */
            LedMarquee.prototype.draw = function () {
                // BLIT the back buffer scrolling one led + padding increment
                this.backBuffer.drawImage(this.backBuffer.canvas, -(this.options.ledSize + this.options.ledMargin + 1), 0);

                var x = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin + 1);

                for (var i = 0; i < 8; i++) {
                    var mask = (1 << i) | 0;
                    var isOn = ((this.nextColumn | 0) & mask) == mask;
                    this.drawLed(x, i, isOn);
                }
                this.drawLed(x, -1, false);

                // render the back buffer to the screen
                this.onScreenContext.drawImage(this.backBuffer.canvas, 0, 0);
            };

            LedMarquee.prototype.fillBackBuffer = function () {
                var start = this.backBuffer.canvas.width - (this.options.ledSize + this.options.ledMargin);
                for (var x = start; x >= 0; x -= (this.options.ledMargin + this.options.ledSize)) {
                    for (var i = 0; i < 8; i++) {
                        this.drawLed(x, i, false);
                    }
                    this.drawLed(x, -1, false);
                }
            };

            LedMarquee.prototype.drawLed = function (canvasX, ledRow, on) {
                var y = (7 - ledRow) * (this.options.ledSize + this.options.ledMargin);

                this.backBuffer.fillStyle = this.options.backgroundFillStyle;
                this.backBuffer.fillRect(canvasX, y, this.options.ledSize + this.options.ledMargin, this.options.ledSize + this.options.ledMargin);

                this.backBuffer.fillStyle = on ? this.options.ledOnFillStyle : this.options.ledOffFillStyle;

                if (this.options.ledShape == "square") {
                    this.backBuffer.fillRect(canvasX, y, this.options.ledSize, this.options.ledSize);
                } else {
                    this.backBuffer.beginPath();
                    this.backBuffer.lineWidth = 0;
                    this.backBuffer.arc(canvasX + this.options.ledSize / 2, y + this.options.ledSize / 2, (this.options.ledSize - 1) / 2, 0, 2 * Math.PI, false);
                    this.backBuffer.closePath();
                    this.backBuffer.fill();
                }
            };

            /**
            * rack the text and prepare for any new character
            */
            LedMarquee.prototype.update = function () {
                this.frames++;
                this.rackStep++;
                this.nextColumn = this.currentCharacter[this.rackStep];
                if (this.rackStep >= this.currentCharacter.length) {
                    this.setNextCharacter();
                }
            };

            LedMarquee.prototype.setNextCharacter = function () {
                this.currentStringPos++;
                this.currentCharacter = this.characters.getCharacter(this.content[this.currentStringPos]);
                if (this.currentCharacter == undefined) {
                    // character not found
                    this.currentCharacter = this.characters.getCharacter("*");
                }
                this.rackStep = -1;
                if (this.content.length - 1 <= this.currentStringPos) {
                    this.currentStringPos = -1;
                }
            };

            LedMarquee.themes = {
                dark: {
                    backgroundFillStyle: "#000",
                    ledOffFillStyle: "#555",
                    ledOnFillStyle: "#ddd"
                },
                blue: {
                    backgroundFillStyle: "#002",
                    ledOffFillStyle: "#009",
                    ledOnFillStyle: "#cbcbf5"
                },
                chocolate: {
                    backgroundFillStyle: "#4A2506",
                    ledOffFillStyle: "#7A3E0C",
                    ledOnFillStyle: "#F7CDAB"
                },
                metro: {
                    backgroundFillStyle: "#2881E3",
                    ledOffFillStyle: "#2881E3",
                    ledOnFillStyle: "#FFFFFF"
                },
                paper: {
                    backgroundFillStyle: "#F5F1DF",
                    ledOffFillStyle: "#999999",
                    ledOnFillStyle: "#000"
                }
            };
            return LedMarquee;
        })(DbDashboards.Common.Dashboard);
        Marquees.LedMarquee = LedMarquee;
    })(DbDashboards.Marquees || (DbDashboards.Marquees = {}));
    var Marquees = DbDashboards.Marquees;
})(DbDashboards || (DbDashboards = {}));
/*
Copyright (C) 2013 David Black and other contributors
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute,
sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or
substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
Lightweight JQuery integration
*/
(function ($) {
    $.extend($.fn, {
        cDash: function (options) {
            var options = $.extend({ type: "dial360", orientation: "", theme: "chocolate", id: "dbDashboard" }, options);

            return this.each(function () {
                var factory = null;

                switch (options.type.toLowerCase()) {
                    case DbDashboards.Dials.ControlFactoryBase.dial180:
                        factory = new DbDashboards.Dials.Dial180Factory(options, $(this));
                        break;
                    case DbDashboards.Dials.ControlFactoryBase.dial360:
                        factory = new DbDashboards.Dials.Dial360Factory(options, $(this));
                        break;
                    case DbDashboards.Dials.ControlFactoryBase.slider:
                        factory = new DbDashboards.Dials.SliderFactory(options, $(this));
                        break;
                    case DbDashboards.Dials.ControlFactoryBase.thermometer:
                        factory = new DbDashboards.Dials.ThermometerFactory(options, $(this));
                        break;
                    case DbDashboards.Dials.ControlFactoryBase.marquee:
                        factory = new DbDashboards.Marquees.MarqueeFactory(options, $(this));
                        break;
                }

                var dial = factory.create();
                dial.render();
                $(this).data(options.id, dial);
            });
        }
    });
})(jQuery);
///<reference path='ts/dials/DialOptions.ts' />
///<reference path='ts/common/Dashboard.ts' />
///<reference path='ts/dials/DialBezel.ts' />
///<reference path='ts/dials/DialFace.ts' />
///<reference path='ts/dials/DialGlass.ts' />
///<reference path='ts/dials/masks/DialMask.ts' />
///<reference path='ts/dials/masks/DialMask360.ts' />
///<reference path='ts/dials/masks/DialMask180N.ts' />
///<reference path='ts/dials/masks/DialMask180S.ts' />
///<reference path='ts/dials/masks/DialMask180E.ts' />
///<reference path='ts/dials/masks/DialMask180W.ts' />
///<reference path='ts/dials/scales/ScaleBase.ts' />
///<reference path='ts/dials/scales/DialScale.ts' />
///<reference path='ts/sliders/Scales/SliderScale.ts' />
///<reference path='ts/dials/needles/NeedleBase.ts' />
///<reference path='ts/dials/needles/DialNeedle.ts' />
///<reference path='ts/dials/needles/DialNeedleFactory.ts' />
///<reference path='ts/dials/needles/DialNeedleArrow.ts' />
///<reference path='ts/dials/needles/DialNeedleLine.ts' />
///<reference path='ts/dials/needles/DialNeedleTriangle.ts' />
///<reference path='ts/dials/needles/DialNeedleCircleArrow.ts' />
///<reference path='ts/dials/needles/DialNeedleDart.ts' />
///<reference path='ts/dials/DialValue.ts' />
///<reference path='ts/dials/DialBase.ts' />
///<reference path='ts/common/ControlFactoryBase.ts' />
///<reference path='ts/dials/180/Dial180.ts' />
///<reference path='ts/dials/180/Dial180N.ts' />
///<reference path='ts/dials/180/Dial180S.ts' />
///<reference path='ts/dials/180/Dial180E.ts' />
///<reference path='ts/dials/180/Dial180W.ts' />
///<reference path='ts/dials/180/Dial180Factory.ts' />
///<reference path='ts/dials/360/Dial360.ts' />
///<reference path='ts/dials/360/Dial360Factory.ts' />
///<reference path='ts/sliders/slider/Slider.ts' />
///<reference path='ts/sliders/slider/SliderN.ts' />
///<reference path='ts/sliders/slider/SliderS.ts' />
///<reference path='ts/sliders/slider/SliderE.ts' />
///<reference path='ts/sliders/slider/SliderW.ts' />
///<reference path='ts/sliders/slider/SliderFactory.ts' />
///<reference path='ts/sliders/SliderBezel.ts' />
///<reference path='ts/sliders/SliderMask.ts' />
///<reference path='ts/sliders/needles/SliderNeedle.ts' />
///<reference path='ts/marquee/characters.ts' />
///<reference path='ts/marquee/marquee.ts' />
///<reference path='ts/jQueryIntegration.ts' />
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var FactoryFarm = (function () {
            function FactoryFarm() {
            }
            return FactoryFarm;
        })();
        Dials.FactoryFarm = FactoryFarm;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        // Class
        var Line = (function () {
            function Line(x1, y1, x2, y2) {
                this.x1 = x1;
                this.y1 = y1;
                this.x2 = x2;
                this.y2 = y2;
                this.start = new Dials.Point(x1, y1);
                this.end = new Dials.Point(x2, y2);
            }
            return Line;
        })();
        Dials.Line = Line;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    /// <reference path="../d/jquery-1.9.1.d.ts" />
    (function (Dials) {
        var Orientations = (function () {
            function Orientations() {
            }
            /**
            * parse an orientation from the outside world and alias n,s,e,w to the full names
            */
            Orientations.parse = function (value) {
                if (value == undefined) {
                    return Orientations.North;
                }

                value = value.trim();

                switch (value.toLocaleLowerCase()[0]) {
                    case "s":
                    case Orientations.South:
                        return Orientations.South;
                        break;
                    case "e":
                    case Orientations.East:
                        return Orientations.East;
                        break;
                    case "w":
                    case Orientations.West:
                        return Orientations.West;
                        break;
                    default:
                        return Orientations.North;
                        break;
                }
            };
            Orientations.North = "north";

            Orientations.South = "south";

            Orientations.East = "east";

            Orientations.West = "west";
            return Orientations;
        })();
        Dials.Orientations = Orientations;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        // Class
        var Point = (function () {
            function Point(x, y) {
                this.x = x;
                this.y = y;
            }
            return Point;
        })();
        Dials.Point = Point;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        // Class
        var TranslationAndRotation = (function () {
            function TranslationAndRotation(x, y, r) {
                this.x = x;
                this.y = y;
                this.r = r;
            }
            return TranslationAndRotation;
        })();
        Dials.TranslationAndRotation = TranslationAndRotation;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360E = (function (_super) {
            __extends(Dial360E, _super);
            function Dial360E(options, target) {
                _super.call(this, options, target);
                this.target = target;
            }
            Dial360E.prototype.setOptions = function (options) {
                options.scaleStartAngle = ((3 * Math.PI) / 4) + Math.PI / 2;
                options.scaleEndAngle = ((Math.PI) / 4) + Math.PI / 2;
                options.needleZeroOffset = -Math.PI / 4;
            };

            /**
            * Ask the dial where its value should be displayed
            */
            Dial360E.prototype.getDialValuePostion = function () {
                var res = { x: 0, y: 0, r: 0 };
                res.y = (this.options.prv.effectiveWidth / 2);

                res.x = this.options.bezel.margin + this.options.bezel.width / 2;
                res.x += this.options.scale.margin + this.options.scale.width / 2;
                res.x += this.options.value.margin;

                return res;
            };
            return Dial360E;
        })(Dials.Dial360);
        Dials.Dial360E = Dial360E;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360N = (function (_super) {
            __extends(Dial360N, _super);
            function Dial360N(options, target) {
                _super.call(this, options, target);
                this.target = target;
            }
            Dial360N.prototype.setOptions = function (options) {
                options.scaleStartAngle = (3 * Math.PI) / 4;
                options.scaleEndAngle = (Math.PI) / 4;
                options.needleZeroOffset = -(3 * Math.PI) / 4;
            };

            /**
            * Ask the dial where its value should be displayed
            */
            Dial360N.prototype.getDialValuePostion = function () {
                var res = { x: 0, y: 0, r: 0 };
                res.x = (this.options.prv.effectiveWidth / 2);

                res.y = this.options.bezel.margin + this.options.bezel.width / 2;
                res.y += this.options.scale.margin + this.options.scale.width / 2;
                res.y += this.options.value.margin;

                res.y = this.options.prv.effectiveHeight - res.y;
                return res;
            };
            return Dial360N;
        })(Dials.Dial360);
        Dials.Dial360N = Dial360N;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360S = (function (_super) {
            __extends(Dial360S, _super);
            function Dial360S(options, target) {
                _super.call(this, options, target);
                this.target = target;
            }
            Dial360S.prototype.setOptions = function (options) {
                options.scaleEndAngle = -(3 * Math.PI) / 4;
                options.scaleStartAngle = -(Math.PI) / 4;
                options.needleZeroOffset = (Math.PI) / 4;
            };

            /**
            * Ask the dial where its value should be displayed
            */
            Dial360S.prototype.getDialValuePostion = function () {
                var res = { x: 0, y: 0, r: 0 };
                res.x = (this.options.prv.effectiveWidth / 2);
                res.y = this.options.bezel.margin + this.options.bezel.width / 2;
                res.y += this.options.scale.margin + this.options.scale.width / 2;
                res.y += this.options.value.font.pixelSize / 2;
                res.y += this.options.value.margin;

                return res;
            };
            return Dial360S;
        })(Dials.Dial360);
        Dials.Dial360S = Dial360S;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A circular 240 degree dial with a sweep of approximately 240 degrees
        */
        var Dial360W = (function (_super) {
            __extends(Dial360W, _super);
            function Dial360W(options, target) {
                _super.call(this, options, target);
                this.target = target;
            }
            Dial360W.prototype.setOptions = function (options) {
                options.scaleStartAngle = ((3 * Math.PI) / 4) - Math.PI / 2;
                options.scaleEndAngle = ((Math.PI) / 4) - Math.PI / 2;
                options.needleZeroOffset = Math.PI * 3 / 4;
            };

            /**
            * Ask the dial where its value should be displayed
            */
            Dial360W.prototype.getDialValuePostion = function () {
                var res = { x: 0, y: 0, r: 0 };
                res.y = (this.options.prv.effectiveWidth / 2);

                res.x = this.options.bezel.margin + this.options.bezel.width / 2;
                res.x += this.options.scale.margin + this.options.scale.width / 2;
                res.x += this.options.value.margin;

                res.x = this.options.prv.effectiveHeight - res.x;
                return res;
            };
            return Dial360W;
        })(Dials.Dial360);
        Dials.Dial360W = Dial360W;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialNeedleDot = (function (_super) {
            __extends(DialNeedleDot, _super);
            function DialNeedleDot(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            DialNeedleDot.prototype._renderNeedle = function (x, y) {
                var nt = this.options.bezel.margin + this.options.bezel.width / 2 + this.options.needle.margin;
                var needleLength = this.options.prv.needleLength - nt;

                this.needleContext.lineWidth = 1;
                this.needleContext.fillStyle = this.options.needle.fillStyle;
                this.needleContext.strokeStyle = this.options.needle.strokeStyle;
                this.needleContext.beginPath();
                this.circle(x, y - needleLength);
                this.needleContext.closePath();
                this.needleContext.fill();
                this.needleContext.stroke();
            };
            return DialNeedleDot;
        })(Dials.DialNeedle);
        Dials.DialNeedleDot = DialNeedleDot;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var DialScaleFactory = (function () {
            function DialScaleFactory() {
            }
            DialScaleFactory.prototype.create = function (options, context) {
                return new Dials.DialScale(options, context);
            };
            return DialScaleFactory;
        })();
        Dials.DialScaleFactory = DialScaleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Marquees) {
        var MarqueeFactory = (function (_super) {
            __extends(MarqueeFactory, _super);
            function MarqueeFactory(options, target) {
                _super.call(this, options, target, DbDashboards.Dials.ControlFactoryBase.marquee);
            }
            MarqueeFactory.prototype.north = function (options, target) {
                return new Marquees.LedMarquee(options, target);
            };

            MarqueeFactory.prototype.south = function (options, target) {
                return this.north(options, target);
            };

            MarqueeFactory.prototype.east = function (options, target) {
                return this.north(options, target);
            };

            MarqueeFactory.prototype.west = function (options, target) {
                return this.north(options, target);
            };
            return MarqueeFactory;
        })(DbDashboards.Dials.ControlFactoryBase);
        Marquees.MarqueeFactory = MarqueeFactory;
    })(DbDashboards.Marquees || (DbDashboards.Marquees = {}));
    var Marquees = DbDashboards.Marquees;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleArrow = (function (_super) {
            __extends(SliderNeedleArrow, _super);
            function SliderNeedleArrow(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleArrow.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.beginPath();
                this.arrow(pos.x, pos.y - this.options.prv.needleLength / 2);
                this.needleContext.lineTo(pos.x, pos.y + this.options.prv.needleLength);

                this.needleContext.stroke();
            };
            return SliderNeedleArrow;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleArrow = SliderNeedleArrow;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleCircleArrow = (function (_super) {
            __extends(SliderNeedleCircleArrow, _super);
            function SliderNeedleCircleArrow(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleCircleArrow.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.beginPath();
                this.arrow(pos.x, pos.y - this.options.prv.needleLength / 2);
                this.needleContext.lineTo(pos.x, pos.y + this.options.prv.needleLength / 2);
                this.circle(pos.x, pos.y + this.options.prv.needleLength);
                this.needleContext.stroke();
            };
            return SliderNeedleCircleArrow;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleCircleArrow = SliderNeedleCircleArrow;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleDart = (function (_super) {
            __extends(SliderNeedleDart, _super);
            function SliderNeedleDart(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleDart.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.beginPath();
                this.arrow(pos.x, pos.y - this.options.prv.needleLength / 2);
                this.needleContext.lineTo(pos.x, pos.y + this.options.prv.needleLength / 2);
                this.arrow(pos.x, pos.y + this.options.prv.needleLength / 2);
                this.needleContext.stroke();
            };
            return SliderNeedleDart;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleDart = SliderNeedleDart;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleDot = (function (_super) {
            __extends(SliderNeedleDot, _super);
            function SliderNeedleDot(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleDot.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.lineWidth = 1;
                this.needleContext.fillStyle = this.options.needle.fillStyle;
                this.needleContext.strokeStyle = this.options.needle.strokeStyle;

                this.needleContext.beginPath();

                this.circle(pos.x, pos.y + this.options.prv.needleLength / 2);

                this.needleContext.closePath();
                this.needleContext.fill();
                this.needleContext.stroke();
            };
            return SliderNeedleDot;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleDot = SliderNeedleDot;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleFactory = (function () {
            function SliderNeedleFactory() {
            }
            SliderNeedleFactory.prototype.create = function (options, needleContext) {
                if (typeof this[options.needle.style] == 'function') {
                    return this[options.needle.style](options, needleContext);
                }
                return this.triangle(options, needleContext);
            };

            SliderNeedleFactory.prototype.triangle = function (options, needleContext) {
                return new Dials.SliderNeedleTriangle(options, needleContext);
            };

            SliderNeedleFactory.prototype.DialNeedleFactory = function (options, needleContext) {
                return new Dials.SliderNeedleArrow(options, needleContext);
            };

            SliderNeedleFactory.prototype.line = function (options, needleContext) {
                return new Dials.SliderNeedleLine(options, needleContext);
            };

            SliderNeedleFactory.prototype.circleArrow = function (options, needleContext) {
                return new Dials.SliderNeedleCircleArrow(options, needleContext);
            };

            SliderNeedleFactory.prototype.dart = function (options, needleContext) {
                return new Dials.SliderNeedleDart(options, needleContext);
            };

            SliderNeedleFactory.prototype.dot = function (options, needleContext) {
                return new Dials.SliderNeedleDot(options, needleContext);
            };
            SliderNeedleFactory.triangle = "triangle";
            SliderNeedleFactory.arrow = "arrow";
            SliderNeedleFactory.line = "line";
            SliderNeedleFactory.dart = "dart";
            SliderNeedleFactory.circleArrow = "circleArrow";
            return SliderNeedleFactory;
        })();
        Dials.SliderNeedleFactory = SliderNeedleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleLine = (function (_super) {
            __extends(SliderNeedleLine, _super);
            function SliderNeedleLine(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleLine.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.lineWidth = this.options.needle.width;
                this.needleContext.strokeStyle = this.options.needle.fillStyle;

                this.needleContext.beginPath();
                this.needleContext.moveTo(pos.x, pos.y - this.options.prv.needleLength / 2);
                this.needleContext.lineTo(pos.x, pos.y + this.options.prv.needleLength);
                this.needleContext.closePath();
                this.needleContext.stroke();
            };
            return SliderNeedleLine;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleLine = SliderNeedleLine;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderNeedleTriangle = (function (_super) {
            __extends(SliderNeedleTriangle, _super);
            function SliderNeedleTriangle(options, needleContext) {
                _super.call(this, options, needleContext);
            }
            SliderNeedleTriangle.prototype._renderNeedle = function (pos) {
                var hw = this.options.needle.width / 2 - (this.options.needle.strokeWidth / 2);
                var needleLength = this.options.prv.needleLength;

                this.needleContext.lineWidth = 1;
                this.needleContext.fillStyle = this.options.needle.fillStyle;
                this.needleContext.strokeStyle = this.options.needle.strokeStyle;

                this.needleContext.beginPath();

                this.needleContext.moveTo(pos.x - this.options.needle.width / 2, pos.y + this.options.prv.needleLength);

                this.needleContext.lineTo(pos.x, pos.y - this.options.prv.needleLength / 2);
                this.needleContext.lineTo(pos.x + this.options.needle.width / 2, pos.y + this.options.prv.needleLength);

                this.needleContext.closePath();
                this.needleContext.fill();
                this.needleContext.stroke();
            };
            return SliderNeedleTriangle;
        })(Dials.SliderNeedle);
        Dials.SliderNeedleTriangle = SliderNeedleTriangle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScaleE = (function (_super) {
            __extends(SliderScaleE, _super);
            function SliderScaleE(dialOptions, context) {
                _super.call(this, dialOptions, context);

                this.scaleBandX1 = this.dialOptions.width - (this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width));
                this.scaleBandY1 = this.options.sideMargin;
                this.scaleBandX2 = this.scaleBandX1;
                this.scaleBandY2 = this.dialOptions.height - this.options.sideMargin;
                this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count - 1);
                this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
            }
            /**
            * calculate the start and end points of a major tick line for this dial and orientation
            */
            SliderScaleE.prototype.getMajorTickLine = function (step) {
                var x1 = this.scaleBandX1;
                var y1 = this.scaleBandY1 + (this.majorTickSpacing * step);
                var x2 = this.scaleBandX1 - (this.options.majorTicks.length + +this.options.width);
                var y2 = y1;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * calculate the start and end points of a minor tick line for this dial and orientation
            */
            SliderScaleE.prototype.getMinorTickLine = function (step, increment) {
                var start = this.scaleBandY1 + (this.majorTickSpacing * step);
                var x1 = this.scaleBandX1;
                var y1 = start + (this.minorTickSpacing * increment);
                var x2 = this.scaleBandX1 - (this.options.minorTicks.length + this.options.majorTicks.width);
                var y2 = y1;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * gets the point at which the text for a major tick value should be rendered
            */
            SliderScaleE.prototype.getPointFoprScaleNumber = function (maj) {
                var x = this.dialOptions.width - (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length + this.options.font.pixelSize / 2);
                var y = this.options.sideMargin + (this.majorTickSpacing * maj);
                var r = Math.PI / 2;
                ;
                return new Dials.TranslationAndRotation(x, y, r);
            };
            return SliderScaleE;
        })(Dials.SliderScale);
        Dials.SliderScaleE = SliderScaleE;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScaleFactory = (function () {
            function SliderScaleFactory() {
            }
            SliderScaleFactory.prototype.create = function (options, context) {
                if (typeof this[options.orientation] == 'function') {
                    return this[options.orientation](options, context);
                }
                return this.north(options, context);
            };

            SliderScaleFactory.prototype.north = function (options, context) {
                return new Dials.SliderScaleN(options, context);
            };

            SliderScaleFactory.prototype.south = function (options, context) {
                return new Dials.SliderScaleS(options, context);
            };

            SliderScaleFactory.prototype.east = function (options, context) {
                return new Dials.SliderScaleE(options, context);
            };

            SliderScaleFactory.prototype.west = function (options, context) {
                return new Dials.SliderScaleW(options, context);
            };
            return SliderScaleFactory;
        })();
        Dials.SliderScaleFactory = SliderScaleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScaleN = (function (_super) {
            __extends(SliderScaleN, _super);
            function SliderScaleN(dialOptions, context) {
                _super.call(this, dialOptions, context);

                this.scaleBandX1 = this.options.sideMargin;
                this.scaleBandY1 = this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width);
                this.scaleBandX2 = this.dialOptions.width - this.options.sideMargin;
                this.scaleBandY2 = this.scaleBandY1;
                this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count - 1);
                this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
            }
            /**
            * calculate the start and end points of a major tick line for this dial and orientation
            */
            SliderScaleN.prototype.getMajorTickLine = function (step) {
                var x1 = this.scaleBandX1 + (this.majorTickSpacing * step);
                var y1 = this.scaleBandY1;
                var x2 = x1;
                var y2 = y1 + this.options.majorTicks.length + this.options.width;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * calculate the start and end points of a minor tick line for this dial and orientation
            */
            SliderScaleN.prototype.getMinorTickLine = function (step, increment) {
                var start = this.scaleBandX1 + (this.majorTickSpacing * step);
                var x1 = start + (this.minorTickSpacing * increment);
                var y1 = this.scaleBandY1;
                var x2 = x1;
                var y2 = y1 + this.options.minorTicks.length + this.options.majorTicks.width;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * gets the point at which the text for a major tick value should be rendered
            */
            SliderScaleN.prototype.getPointFoprScaleNumber = function (maj) {
                var x = this.options.sideMargin + (this.majorTickSpacing * maj);
                var y = this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length + this.options.font.pixelSize / 2;
                return new Dials.TranslationAndRotation(x, y, 0);
            };
            return SliderScaleN;
        })(Dials.SliderScale);
        Dials.SliderScaleN = SliderScaleN;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScaleS = (function (_super) {
            __extends(SliderScaleS, _super);
            function SliderScaleS(dialOptions, context) {
                _super.call(this, dialOptions, context);

                this.scaleBandX1 = this.options.sideMargin;
                this.scaleBandY1 = this.dialOptions.height - (this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width));
                this.scaleBandX2 = this.dialOptions.width - this.options.sideMargin;
                this.scaleBandY2 = this.scaleBandY1;
                this.majorTickSpacing = (this.scaleBandX2 - this.scaleBandX1) / (this.options.majorTicks.count - 1);
                this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
            }
            /**
            * calculate the start and end points of a major tick line for this dial and orientation
            */
            SliderScaleS.prototype.getMajorTickLine = function (step) {
                var x1 = this.scaleBandX1 + (this.majorTickSpacing * step);
                var y1 = this.scaleBandY1;
                var x2 = x1;
                var y2 = y1 - (this.options.majorTicks.length + this.options.width);
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * calculate the start and end points of a minor tick line for this dial and orientation
            */
            SliderScaleS.prototype.getMinorTickLine = function (step, increment) {
                var start = this.scaleBandX1 + (this.majorTickSpacing * step);
                var x1 = start + (this.minorTickSpacing * increment);
                var y1 = this.scaleBandY1;
                var x2 = x1;
                var y2 = y1 - (this.options.minorTicks.length + this.options.majorTicks.width);
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * gets the point at which the text for a major tick value should be rendered
            */
            SliderScaleS.prototype.getPointFoprScaleNumber = function (maj) {
                var x = this.options.sideMargin + (this.majorTickSpacing * maj);
                var y = this.dialOptions.height - (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length - 3);
                return new Dials.TranslationAndRotation(x, y, 0);
            };
            return SliderScaleS;
        })(Dials.SliderScale);
        Dials.SliderScaleS = SliderScaleS;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var SliderScaleW = (function (_super) {
            __extends(SliderScaleW, _super);
            function SliderScaleW(dialOptions, context) {
                _super.call(this, dialOptions, context);

                this.scaleBandX1 = (this.dialOptions.bezel.margin + this.dialOptions.bezel.width + this.options.margin + (this.options.width));
                this.scaleBandY1 = this.options.sideMargin;
                this.scaleBandX2 = this.scaleBandX1;
                this.scaleBandY2 = this.dialOptions.height - this.options.sideMargin;
                this.majorTickSpacing = (this.scaleBandY2 - this.scaleBandY1) / (this.options.majorTicks.count - 1);
                this.minorTickSpacing = this.majorTickSpacing / this.options.minorTicks.count;
            }
            /**
            * calculate the start and end points of a major tick line for this dial and orientation
            */
            SliderScaleW.prototype.getMajorTickLine = function (step) {
                var x1 = this.scaleBandX1;
                var y1 = this.scaleBandY1 + (this.majorTickSpacing * step);
                var x2 = this.scaleBandX1 + this.options.majorTicks.length + this.options.width;
                var y2 = y1;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * calculate the start and end points of a minor tick line for this dial and orientation
            */
            SliderScaleW.prototype.getMinorTickLine = function (step, increment) {
                var start = this.scaleBandY1 + (this.majorTickSpacing * step);
                var x1 = this.scaleBandX1;
                var y1 = start + (this.minorTickSpacing * increment);
                var x2 = this.scaleBandX1 + this.options.minorTicks.length + this.options.majorTicks.width;
                var y2 = y1;
                return new Dials.Line(x1, y1, x2, y2);
            };

            /**
            * gets the point at which the text for a major tick value should be rendered
            */
            SliderScaleW.prototype.getPointFoprScaleNumber = function (maj) {
                var x = (this.scaleY + this.options.width + this.options.margin + this.options.majorTicks.length) + this.options.font.pixelSize / 2;
                var y = this.options.sideMargin + (this.majorTickSpacing * maj);
                var r = -Math.PI / 2;
                return new Dials.TranslationAndRotation(x, y, r);
            };
            return SliderScaleW;
        })(Dials.SliderScale);
        Dials.SliderScaleW = SliderScaleW;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ThermometerNeedle = (function (_super) {
            __extends(ThermometerNeedle, _super);
            function ThermometerNeedle(options, needleContext) {
                _super.call(this, options, needleContext);
                this.metrics = ThermometerNeedle.calculateMetrics(options);
            }
            ThermometerNeedle.prototype.render = function (stepValue) {
                var normalized = (stepValue - this.options.value.min) / (this.options.value.max - this.options.value.min);
                this.clear();

                // this.showMetrics();
                var ty = this.metrics.h / 2;

                this.needleContext.translate((this.metrics.x + this.metrics.w / 2), (ty));
                this.needleContext.rotate(this.options.prv.needleRotation);
                this.needleContext.translate(-(this.metrics.x + this.metrics.w / 2), -(ty));
                this.needleContext.translate(this.options.prv.needleX, this.options.prv.needleY);

                if (false) {
                    // draw the orange debug rect
                    this.needleContext.fillStyle = "rgba(245,123,45,1)";
                    this.needleContext.fillRect(0, 0, this.options.width, this.options.height);
                }

                this.needleContext.fillStyle = this.options.needle.fillStyle;
                this.needleContext.strokeStyle = this.options.needle.strokeStyle;
                this.needleContext.lineWidth = this.options.needle.strokeWidth + 1;

                this.needleContext.save();
                this.createPath();
                this.needleContext.clip();

                //  var lg = this.needleContext.createLinearGradient(0, 0, this.options.prv.effectiveWidth, this.options.prv.effectiveHeight);
                var lg = this.needleContext.createRadialGradient(this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, 1, this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, this.metrics.bowlRadius);
                lg.addColorStop(0, "#fff");
                lg.addColorStop(1, this.options.needle.fillStyle);
                this.needleContext.fillStyle = lg;

                this.needleContext.fillRect(this.metrics.bowlCenter.x - this.metrics.bowlRadius, this.metrics.bowlCenter.y - this.metrics.bowlRadius, this.metrics.bowlRadius * 2, this.metrics.bowlRadius * 2);

                var heightAtMax = (-(this.metrics.tubeBaseY - this.metrics.y));
                this.needleContext.fillStyle = this.options.needle.fillStyle;
                this.needleContext.fillRect(this.metrics.x, this.metrics.tubeBaseY, this.metrics.w, normalized * heightAtMax);

                this.needleContext.restore();

                this.createPath();
                this.needleContext.stroke();

                this.needleContext.translate(-this.options.prv.needleX, -this.options.prv.needleY);
            };

            ThermometerNeedle.prototype.createPath = function () {
                var r = this.metrics.bubbleRadius;
                var topRadius = this.metrics.w / 2;

                this.needleContext.beginPath();
                this.needleContext.moveTo(this.metrics.x, this.metrics.y + topRadius);
                this.needleContext.lineTo(this.metrics.x, this.metrics.tubeBaseY);
                this.needleContext.arc(this.metrics.x, this.metrics.tubeBaseY + r, r, 1.5 * Math.PI, Math.PI, true);

                this.needleContext.arc(this.metrics.bowlCenter.x, this.metrics.bowlCenter.y, this.metrics.bowlRadius, Math.PI, 0, true);
                this.needleContext.arc(this.metrics.x + r, this.metrics.tubeBaseY + r, r, 0, 1.5 * Math.PI, true);
                this.needleContext.lineTo(this.metrics.x + this.metrics.w, this.metrics.y + topRadius);
                this.needleContext.arc(this.metrics.x + this.metrics.w / 2, this.metrics.y + topRadius, topRadius, 0, Math.PI, true);
                this.needleContext.closePath();
            };

            ThermometerNeedle.prototype.tween = function (normalizedValue) {
                return new Dials.Point(this.options.prv.minPoint.x + ((this.options.prv.maxPoint.x - this.options.prv.minPoint.x) * normalizedValue), this.options.prv.minPoint.y + ((this.options.prv.maxPoint.y - this.options.prv.minPoint.y) * normalizedValue));
            };

            ThermometerNeedle.calculateMetrics = function (options) {
                var toTop = options.bezel.margin * 2 + options.bezel.width + options.scale.margin;
                var maxis = Math.max(options.prv.effectiveHeight, options.prv.effectiveWidth);
                var bottomSpaceForValue = options.bezel.margin * 2 + options.bezel.width + options.value.margin + options.value.font.pixelSize;

                var mertics = {
                    x: (options.prv.effectiveWidth / 2) - options.needle.width,
                    y: toTop,
                    w: options.needle.width * 2,
                    bubbleRadius: options.needle.width * 2,
                    h: maxis - (toTop + bottomSpaceForValue),
                    tubeBaseY: 0,
                    bowlCenter: { x: 0, y: 0 },
                    bowlRadius: 0
                };
                mertics.tubeBaseY = mertics.h - mertics.bubbleRadius;

                var r = mertics.bubbleRadius;
                mertics.bowlCenter = new Dials.Point(mertics.x + mertics.w / 2, mertics.tubeBaseY + r);
                mertics.bowlRadius = r + mertics.w / 2;

                return mertics;
            };

            ThermometerNeedle.prototype.showMetrics = function () {
                var c = this.needleContext;
                c.strokeStyle = "#00dd00";
                c.strokeRect(this.metrics.x, this.metrics.y, this.metrics.w, this.metrics.h);
                c.strokeRect(0, this.metrics.y, this.options.prv.effectiveWidth, this.metrics.h);

                c.strokeStyle = "#dd00dd";
                c.strokeRect(0, this.metrics.y, this.options.prv.effectiveWidth, this.metrics.tubeBaseY - this.metrics.y);

                c.strokeStyle = "#006677";
                c.strokeRect(this.options.prv.effectiveWidth / 2, 0, 0.5, 220);
            };
            return ThermometerNeedle;
        })(Dials.NeedleBase);
        Dials.ThermometerNeedle = ThermometerNeedle;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ThermometerNeedleFactory = (function () {
            function ThermometerNeedleFactory() {
            }
            ThermometerNeedleFactory.prototype.create = function (options, needleContext) {
                return new Dials.ThermometerNeedle(options, needleContext);
            };
            return ThermometerNeedleFactory;
        })();
        Dials.ThermometerNeedleFactory = ThermometerNeedleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ThermometerScale = (function (_super) {
            __extends(ThermometerScale, _super);
            function ThermometerScale(dialOptions, context) {
                _super.call(this, dialOptions, context);
                this.options = dialOptions.scale;
                this.metrics = Dials.ThermometerNeedle.calculateMetrics(dialOptions);
                this.needleCenterTop = new Dials.Point(this.metrics.x + this.metrics.w / 2, this.metrics.y);
                this.needleCenterBottom = new Dials.Point(this.metrics.x + this.metrics.w / 2, this.metrics.tubeBaseY);
            }
            ThermometerScale.prototype.render = function () {
                this.drawMajorTicks();
                this.drawScaleBand();
            };

            /**
            * draw the outer scale band
            * @param ctx
            * @param metrics
            */
            ThermometerScale.prototype.drawScaleBand = function () {
                this.context.beginPath();
                this.context.strokeStyle = this.options.strokeStyle;
                this.context.lineWidth = this.options.width;

                var deltaX = this.metrics.w / 2 + this.options.margin + this.options.width / 2;
                this.drawMirrorScaleBand(deltaX);
                this.drawMirrorScaleBand(-deltaX);

                this.context.stroke();
                this.context.closePath();
            };

            ThermometerScale.prototype.drawMirrorScaleBand = function (offset) {
                this.drawLine(new Dials.Line(this.needleCenterTop.x + offset, this.needleCenterTop.y - this.options.majorTicks.width / 2, this.needleCenterBottom.x + offset, this.needleCenterBottom.y + this.options.majorTicks.width / 2));
            };

            ThermometerScale.prototype.drawMajorTicks = function () {
                var deltaX = this.metrics.w / 2 + this.options.margin + this.options.width / 2;
                var majorTickSpacing = (this.metrics.tubeBaseY - this.metrics.y) / (this.options.majorTicks.count - 1);
                var minorTickGap = (majorTickSpacing / (this.options.minorTicks.count));
                for (var maj = 0; maj < this.options.majorTicks.count; maj++) {
                    var step = maj / (this.options.majorTicks.count - 1);
                    var pos = new Dials.Point(deltaX, this.metrics.tubeBaseY - ((this.metrics.tubeBaseY - this.metrics.y) * step));

                    // we draw minor tick ahead of the current major tick, so omit this step for the closing tick
                    if (maj < this.options.majorTicks.count - 1) {
                        this.drawMinorTicks(pos, minorTickGap);
                    }
                    this.drawMirrorTickLine(pos, 1, this.options.majorTicks);
                    this.drawMirrorTickLine(pos, -1, this.options.majorTicks);
                }
            };

            ThermometerScale.prototype.drawMirrorTickLine = function (pos, sense, tickOpts) {
                var startX = this.needleCenterTop.x + (pos.x * sense);
                this.drawTickLine(new Dials.Line(startX, pos.y, startX + (tickOpts.length * sense), pos.y), tickOpts);
            };

            ThermometerScale.prototype.drawMinorTicks = function (majorPos, gap) {
                for (var min = 0; min < this.options.minorTicks.count + 1; min++) {
                    var pos = { x: majorPos.x + this.options.majorTicks.width, y: majorPos.y - (min * gap) };
                    this.drawMirrorTickLine(pos, 1, this.options.minorTicks);
                    this.drawMirrorTickLine(pos, -1, this.options.minorTicks);
                }
            };
            return ThermometerScale;
        })(Dials.ScaleBase);
        Dials.ThermometerScale = ThermometerScale;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ThermometerScaleFactory = (function () {
            function ThermometerScaleFactory() {
            }
            ThermometerScaleFactory.prototype.create = function (options, context) {
                if (typeof this[options.orientation] == 'function') {
                    return this[options.orientation](options, context);
                }
                return this.north(options, context);
            };

            ThermometerScaleFactory.prototype.north = function (options, context) {
                return new Dials.ThermometerScale(options, context);
            };

            ThermometerScaleFactory.prototype.south = function (options, context) {
                return this.north(options, context);
            };

            ThermometerScaleFactory.prototype.east = function (options, context) {
                return this.north(options, context);
            };

            ThermometerScaleFactory.prototype.west = function (options, context) {
                return this.north(options, context);
            };
            return ThermometerScaleFactory;
        })();
        Dials.ThermometerScaleFactory = ThermometerScaleFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var Thermometer = (function (_super) {
            __extends(Thermometer, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function Thermometer(options, target) {
                _super.call(this, Thermometer.overrideDefaults, options, target, {
                    needleFactory: new Dials.ThermometerNeedleFactory(),
                    scaleFactory: new Dials.ThermometerScaleFactory()
                });
                this.target = target;
                this.needleLength = 10;
            }
            /**
            * Applies a mask to the prevent glass highlights etc over flowing
            */
            Thermometer.prototype.getMask = function () {
                return new Dials.SliderMask(this);
            };

            Thermometer.prototype.addBezel = function (ctx) {
                var b = new Dials.SliderBezel(this);
                b.addLayer(ctx);
            };

            Thermometer.prototype.effectiveHeight = function () {
                return this.options.height || this.target.height();
            };

            Thermometer.prototype.effectiveWidth = function () {
                return this.options.width || this.target.width();
            };

            /**
            * gets the y position for a horizontal gauges arrow in North orientation. This will be the x for a West dial and effective-that for other side
            */
            Thermometer.prototype.needleCenterFromTop = function () {
                return (this.options.bezel.margin + this.options.bezel.width + this.options.scale.margin + this.options.scale.width + (this.needleLength / 2));
            };

            Thermometer.prototype.needleMinimumOffSet = function () {
                return this.options.scale.sideMargin + this.options.scale.majorTicks.width / 2;
            };
            Thermometer.overrideDefaults = {
                type: Dials.DialBase.Thermometer,
                value: {}
            };
            return Thermometer;
        })(Dials.DialBase);
        Dials.Thermometer = Thermometer;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var ThermometerE = (function (_super) {
            __extends(ThermometerE, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function ThermometerE(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var x = this.effectiveWidth() - this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleX: 0,
                    needleY: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(x, this.needleMinimumOffSet()),
                    maxPoint: new Dials.Point(x, this.effectiveHeight() - this.needleMinimumOffSet()),
                    needleRotation: 0
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            ThermometerE.prototype.getDialValuePostion = function () {
                var tx = (this.options.prv.effectiveWidth / 2);

                console.log(this.options.prv.effectiveWidth);

                var margin = this.options.bezel.margin * 2 + this.options.bezel.width + this.options.value.margin;

                var ty = (this.options.height - margin);

                //var t = this.needle.needleContext.strokeStyle;
                //this.needle.needleContext.strokeStyle = "blue";
                //this.needle.needleContext.strokeRect(0, this.options.height - margin, this.options.width, - this.options.value.font.pixelSize);
                //this.needle.needleContext.strokeStyle = t;
                return { x: tx, y: ty, r: 0 };
            };
            return ThermometerE;
        })(Dials.Thermometer);
        Dials.ThermometerE = ThermometerE;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        var ThermometerFactory = (function (_super) {
            __extends(ThermometerFactory, _super);
            function ThermometerFactory(options, target) {
                _super.call(this, options, target, Dials.ControlFactoryBase.thermometer);
            }
            ThermometerFactory.prototype.north = function (options, target) {
                return new Dials.ThermometerN(options, target);
            };

            ThermometerFactory.prototype.south = function (options, target) {
                return this.north(options, target);
            };

            ThermometerFactory.prototype.east = function (options, target) {
                return new Dials.ThermometerE(options, target);
            };

            ThermometerFactory.prototype.west = function (options, target) {
                return this.east(options, target);
            };
            return ThermometerFactory;
        })(Dials.ControlFactoryBase);
        Dials.ThermometerFactory = ThermometerFactory;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
var DbDashboards;
(function (DbDashboards) {
    (function (Dials) {
        /**
        * A horizontal gauge
        */
        var ThermometerN = (function (_super) {
            __extends(ThermometerN, _super);
            /**
            * Constructs a new Dial360
            * @param options the options for the Dial360
            */
            function ThermometerN(options, target) {
                _super.call(this, options, target);
                this.target = target;

                var y = this.needleCenterFromTop();

                this.options.prv = {
                    effectiveHeight: this.effectiveHeight(),
                    effectiveWidth: this.effectiveWidth(),
                    scaleStartAngle: 0,
                    scaleEndAngle: 0,
                    needleZeroOffset: 0,
                    needleSweep: 0,
                    needleLength: this.needleLength,
                    minPoint: new Dials.Point(this.needleMinimumOffSet(), y),
                    maxPoint: new Dials.Point(this.effectiveWidth() - this.needleMinimumOffSet(), y),
                    needleRotation: Math.PI / 2,
                    needleX: -40,
                    needleY: 20
                };
            }
            /**
            * Ask the dial where its value should be displayed
            */
            ThermometerN.prototype.getDialValuePostion = function () {
                var ty = (this.options.prv.effectiveHeight / 2);
                var bezOffset = (this.options.bezel.width / 2) + this.options.bezel.margin;
                var tx = (bezOffset + (this.options.value.font.pixelSize / 2));
                return { x: tx, y: ty, r: Math.PI / 2 };
            };
            return ThermometerN;
        })(Dials.Thermometer);
        Dials.ThermometerN = ThermometerN;
    })(DbDashboards.Dials || (DbDashboards.Dials = {}));
    var Dials = DbDashboards.Dials;
})(DbDashboards || (DbDashboards = {}));
//# sourceMappingURL=cDash.js.map
