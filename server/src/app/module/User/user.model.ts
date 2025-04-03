import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { USER_ROLE } from './user.constant';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Hide password by default
    },
    profilePicture: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: Object.keys(USER_ROLE),
      default: 'USER',
    },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isVerified: {
      type: Boolean,
      default: false,
    },
    premiumUser: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// // Middleware to exclude soft-deleted users
// userSchema.pre(/^find/, function (next) {
//   this.where({ isDeleted: { $ne: true } });
//   next();
// });

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Remove password from response after saving
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Static Methods
userSchema.statics.isUserExistsById = async function (id: string) {
  return await User.findOne({ _id: id }).select('+password');
};

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: number,
  jwtIssuedTimestamp: number
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};


// Export the model
export const User = model<TUser, UserModel>('User', userSchema);
