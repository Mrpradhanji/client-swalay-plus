import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import BankData from '@/models/Bank';
import Label from '@/models/Label'; // Assuming you have a User model
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
    try {
        await connect();

        const body = await request.json();
        const { labelId, accountDetails } = body;

        let bankDetails = await BankData.findOneAndUpdate(
            { labelId },
            { ...accountDetails }, // Update with the properties of accountDetails
            { new: true, runValidators: true }
        );

        if (bankDetails) {
            // Retrieve user email from User model
            const user = await Label.findOne({ labelId });
            if (!user) {
                return NextResponse.json({
                    message: "User not found",
                    success: false,
                    status: 404
                });
            }

            const userEmail = user.email;

            // Send email notification
            const resend = new Resend(process.env.RESEND_API_KEY);
            try {
                await resend.emails.send({
                    from: 'support@swalay.in', // Your verified email address
                    to: userEmail, // Email to notify
                    subject: 'Bank Details Updated',
                    html: `<p>Dear User,</p><p>Your bank details have been successfully updated.</p><p><strong>Updated Details:</strong></p><p>${JSON.stringify(accountDetails)}</p><p>Best regards,<br>SwaLay Support Team</p>`
                });
            } catch (emailError) {
                console.error('Failed to send email:', emailError);
                // Handle email sending failure
            }

            return NextResponse.json({
                message: "Bank details updated",
                data: bankDetails,
                success: true,
                status: 201
            });
        } else {
            bankDetails = new BankData({
                labelId, ...accountDetails // Create new entry with account details spread into the document
            });
            const savedBankDetails = await bankDetails.save();

            return NextResponse.json({
                message: "Bank details added",
                data: savedBankDetails,
                success: true,
                status: 201
            });
        }
    } catch (error) {
        console.error('Internal server error:', error);
        return NextResponse.json({
            message: "Internal server error",
            success: false,
            status: 500
        });
        
    }
}
