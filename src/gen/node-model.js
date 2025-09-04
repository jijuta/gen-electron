
const setctrl = function (payload, self) {

    let vHtml = `/**
 * @Class Name : ${payload.Sample} Model
 * @Description : ${payload.pageTitle} Model
 * @Modification Information
 * @
 * @  수정일         수정자             수정내용
 * @ -------		--------    ---------------------------
 * @ ${payload.pageTodays}   AUTO               최초 생성
 * @author AUTO
 * @since ${payload.pageTodays}
 * @version 1.0
 * @see
 *
 */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const ${payload.SampleSm}Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsAvailable: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

const ${payload.sampleNmFirst} = mongoose.model('Cinema', ${payload.SampleSm}Schema);

module.exports = ${payload.sampleNmFirst};`;
    return vHtml;
}
module.exports = {
    getCtrl: setctrl
}