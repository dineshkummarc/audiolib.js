(function(proto){

proto.resetFFT = proto.reset;

proto.reset = function(sampleRate, bufferSize){
	audioLib.FourierTransform.apply(this, arguments);
	this.resetBuffer.apply(this, [].slice.call(arguments, 1));
	this.resetFT.apply(this, arguments);
	this.resetFFT.apply(this, [].slice.call(arguments, 1));
};

proto.process = function(buffer){
	this[this.method](buffer || this.buffer);
	return this.calculateSpectrum();
};

proto.setParam = function (name, value) {
	switch (name) {
	case "bufferSize":
		if (this.bufferSize === value) break;

		this.fullScratch = this.fullScratch || this.scratch;
		if (this.fullScratch.length < value) {
			this.fullScratch = new Float32Array(value);
		}

		this.scratch = this.fullScratch.subarray(0, value);
		break;
	}
	this[name] = value;
};

proto.resetScratch = function () {
	this.fullScratch	= null;
	this.scratch		= new Float32Array(this.bufferSize);
};

proto.fullScratch	= null;
proto.sampleRate	= 44100;
proto.method		= 'forward';

}(FFT.prototype));

/**
 * A Fast Fourier Transform module.
 *
 * @name FFT
 * @processor
 *
 * @arg =!sampleRate
 * @arg =!bufferSize
 *
 * @param type:UInt units:Hz default:44100 sampleRate Sample Rate the apparatus operates on.
 * @param type:UInt default:4096 bufferSize The buffer size of the FFT.
 * @param type:String min:0.0 default:forward method The direction to do the FFT to.
*/

/**
 * Forward process the buffer.
 *
 * @name forward
 * @method FFT
*/

/**
 * Backward process the buffer.
 *
 * @name backward
 * @method FFT
*/

/**
 * Calculate the spectrum for the FFT buffer.
 *
 * @name calculateSpectrum
 * @method FFT
*/

