import mongoose from 'mongoose';
import passport from 'passport';
import passportLocalMongoose from 'passport-local-mongoose';
import {Strategy} from 'passport-local';
import moment from 'moment';
var strategySchema = new mongoose.Schema({
  strategyname: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    get: function (date) {
      return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }

  }
});

strategySchema.plugin(passportLocalMongoose);

var StrategyModel = mongoose.model('Strategy', strategySchema);
//todo
passport.use(new Strategy(StrategyModel.authenticate()));
passport.serializeUser(StrategyModel.serializeUser());
passport.deserializeUser(StrategyModel.deserializeUser());

export default StrategyModel;
