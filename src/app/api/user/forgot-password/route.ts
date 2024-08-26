// pages/api/user/forgot-password.ts
import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Label from '@/models/Label';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/Email/Welcome';
// Initialize Resend API
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  await connect();

  try {
    const { email } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: 'Invalid email format'
      });
    }

    const user = await Label.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        success: false,
        error: "User doesn't exist"
      });
    }

    // Generate a password reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: '1h' });

    // Create reset link
    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;

    // Send reset email
    const { error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: "itadmin@talantoncore.in",
      subject: 'Password Reset Request',
      react: EmailTemplate({ resetLink })
    });

    if (error) {
      console.error('Error sending email:', error);
      return NextResponse.json({
        status: 500,
        success: false,
        error: 'Failed to send reset email'
      });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: 'Reset link sent successfully'
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      status: 500,
      success: false,
      error: error.message
    });
  }
}
