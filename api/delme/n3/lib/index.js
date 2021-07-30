"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Lexer", {
  enumerable: true,
  get: function () {
    return _N3Lexer.default;
  }
});
Object.defineProperty(exports, "Parser", {
  enumerable: true,
  get: function () {
    return _N3Parser.default;
  }
});
Object.defineProperty(exports, "Writer", {
  enumerable: true,
  get: function () {
    return _N3Writer.default;
  }
});
Object.defineProperty(exports, "Store", {
  enumerable: true,
  get: function () {
    return _N3Store.default;
  }
});
Object.defineProperty(exports, "StreamParser", {
  enumerable: true,
  get: function () {
    return _N3StreamParser.default;
  }
});
Object.defineProperty(exports, "StreamWriter", {
  enumerable: true,
  get: function () {
    return _N3StreamWriter.default;
  }
});
Object.defineProperty(exports, "DataFactory", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.default;
  }
});
Object.defineProperty(exports, "Term", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.Term;
  }
});
Object.defineProperty(exports, "NamedNode", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.NamedNode;
  }
});
Object.defineProperty(exports, "Literal", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.Literal;
  }
});
Object.defineProperty(exports, "BlankNode", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.BlankNode;
  }
});
Object.defineProperty(exports, "Variable", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.Variable;
  }
});
Object.defineProperty(exports, "DefaultGraph", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.DefaultGraph;
  }
});
Object.defineProperty(exports, "Quad", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.Quad;
  }
});
Object.defineProperty(exports, "Triple", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.Triple;
  }
});
Object.defineProperty(exports, "termFromId", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.termFromId;
  }
});
Object.defineProperty(exports, "termToId", {
  enumerable: true,
  get: function () {
    return _N3DataFactory.termToId;
  }
});
exports.Util = void 0;

var _N3Lexer = _interopRequireDefault(require("./N3Lexer"));

var _N3Parser = _interopRequireDefault(require("./N3Parser"));

var _N3Writer = _interopRequireDefault(require("./N3Writer"));

var _N3Store = _interopRequireDefault(require("./N3Store"));

var _N3StreamParser = _interopRequireDefault(require("./N3StreamParser"));

var _N3StreamWriter = _interopRequireDefault(require("./N3StreamWriter"));

var Util = _interopRequireWildcard(require("./N3Util"));

exports.Util = Util;

var _N3DataFactory = _interopRequireWildcard(require("./N3DataFactory"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }