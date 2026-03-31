// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
console.log('Resend API Key:', process.env.RESEND_API_KEY); // Debugging line to check if the API key is loaded
const resend = new Resend(process.env.RESEND_API_KEY);
const receiverEmailAddress = process.env.SAM_EMAIL;

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, role, message, q1, q2, outcome } = data;

    // --- 1. PREPARE THE EMAIL CONTENT ---
    let receiverSubject = '';
    let receiverBody = '';
    let userSubject = '';
    let userBody = '';

    if (outcome === 'calendar') {
      // Hot Lead (Calendar)
      receiverSubject = `🔥 HOT LEAD: ${name} wants to chat!`;
      receiverBody = `
        Hi Sam,
        Great news! A high-priority lead just submitted the contact form and was directed to Google Meet/Calendly.
        
        Name: ${name}
        Email: ${email}
        Profile: ${role}
        Status: ${q1}
        
        Message: "${message}"
        
        Note: Keep an eye on your calendar notifications to confirm they completed the booking.
      `;

      userSubject = `Looking forward to our chat, ${name}! 📅`;
      userBody = `
        Hi ${name},
        Thanks for reaching out! We are thrilled to connect with you.
        
        If you didn't get a chance to pick a time on the final screen, you can easily book your time with Sam right here: [INSERT CALENDLY LINK]
        
        Have a nice day!
        Sam & The Team
      `;
    } else {
      // Standard Email / Browsing
      receiverSubject = `New Website Inquiry: ${name} (${role})`;
      receiverBody = `
        Hi Sam,
        You have a new contact form submission.
        
        Name: ${name}
        Email: ${email}
        Profile: ${role}
        Status: ${q1}
        
        Message: "${message}"
        
        Action required: Please reply directly to their email when you have a moment.
      `;

      userSubject = `Thanks for reaching out! 👋`;
      userBody = `
        Hi ${name},
        Thanks for saying hello! We've received your message and safely stored your details.
        
        Sam or one of the team will be reviewing your message and will follow up with you via email shortly.
        
        Have a nice day!
        Sam & The Team
      `;
    }

    // --- 2. SEND THE EMAILS ---
    // 1. Send the notification to Sam (You)
    await resend.emails.send({
      // Use Resend's required testing address while in development
      from: 'onboarding@resend.dev', 
      to: receiverEmailAddress,
      replyTo: email, 
      subject: receiverSubject,
      text: receiverBody,
    });

    // 2. Send the confirmation to the User
    await resend.emails.send({
      // Use Resend's required testing address while in development
      from: 'onboarding@resend.dev', 
      // Replace the hardcoded email with the dynamic variable from the form
      to: email, 
      subject: userSubject,
      text: userBody,
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}