"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _readableStream = require("readable-stream");

var _N3Writer = _interopRequireDefault(require("./N3Writer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **N3StreamWriter** serializes a quad stream into a text stream.
// ## Constructor
class N3StreamWriter extends _readableStream.Transform {
  constructor(options) {
    super({
      encoding: 'utf8',
      writableObjectMode: true
    }); // Set up writer with a dummy stream object

    const writer = this._writer = new _N3Writer.default({
      write: (quad, encoding, callback) => {
        this.push(quad);
        callback && callback();
      },
      end: callback => {
        this.push(null);
        callback && callback();
      }
    }, options); // Implement Transform methods on top of writer

    this._transform = (quad, encoding, done) => {
      writer.addQuad(quad, done);
    };

    this._flush = done => {
      writer.end(done);
    };
  } // ### Serializes a stream of quads


  import(stream) {
    stream.on('data', quad => {
      this.write(quad);
    });
    stream.on('end', () => {
      this.end();
    });
    stream.on('error', error => {
      this.emit('error', error);
    });
    stream.on('prefix', (prefix, iri) => {
      this._writer.addPrefix(prefix, iri);
    });
    return this;
  }

}

exports.default = N3StreamWriter;