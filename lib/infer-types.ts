import { PrismaClient, Account, User, EmailVerificationToken, Product, ProductVariant, VariantImage, VariantTag } from '@prisma/client';

const prisma = new PrismaClient();

// Infer types for each model
export type AccountType = Account;
export type UserType = User;
export type EmailVerificationTokenType = EmailVerificationToken;
// export type PasswordResetTokenType = passwordResetTokens;
// export type TwoFactorTokenType = twoFactorToken;
export type ProductType = Product;
export type ProductVariantType = ProductVariant;
export type VariantImageType = VariantImage;
export type VariantTagType = VariantTag;

// Example function to fetch all users
export const getAllUsers = async (): Promise<UserType[]> => {
    return await prisma.user.findMany();
};

// Example function to create a new product
export const createProduct = async (data: Omit<ProductType, 'id' | 'created'>): Promise<ProductType> => {
    return await prisma.product.create({ data });
};

// Example function to find a user by email
export const findUserByEmail = async (email: string): Promise<UserType | null> => {
    return await prisma.user.findUnique({ where: { email } });
};

export default prisma;
