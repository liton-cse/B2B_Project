import bcrypt from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { model, Schema } from 'mongoose';
import config from '../../../config';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { IUser, UserModal } from './user.interface';

const userSchema = new Schema<IUser, UserModal>(
  {
    name: {
      type: String,
      required: true,
    },
    businessName: {
      type: String,
    },
    businessType: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    contact: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      minlength: 8,
    },
    image: {
      type: String,
      default: 'https://i.ibb.co/z5YHLV9/profile.png',
    },
    status: {
      type: String,
      enum: ['pending', 'approve', 'reject', 'block', 'unblock'],
      default: 'pending',
    },
    customerType: {
      type: String,
      lowercase: true,
      trim: true,
      default: 'base customer',
    },
    isActive: {
      type: String,
      enum: ['active', 'inActive'],
      default: 'active',
    },
    fcmToken: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: true,
    },
    authentication: {
      type: {
        isResetPassword: {
          type: Boolean,
          default: false,
        },
        oneTimeCode: {
          type: Number,
          default: null,
        },
        expireAt: {
          type: Date,
          default: null,
        },
      },
      select: 0,
    },
  },
  { timestamps: true }
);

//exist user check
userSchema.statics.isExistUserById = async (id: string) => {
  const isExist = await User.findById(id);
  return isExist;
};

userSchema.statics.isExistUserByEmail = async (email: string) => {
  const isExist = await User.findOne({ email });
  return isExist;
};

//is match password
userSchema.statics.isMatchPassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

//check user
userSchema.pre('save', async function () {
  const user = this;

  // Check if email exists
  const isExist = await User.findOne({ email: user.email });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists!');
  }

  // Hash password
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
});

export const User = model<IUser, UserModal>('User', userSchema);
