// app/api/contact/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, role, message, q1, q2, outcome } = data;

    // --- 1. PREPARE THE EMAIL CONTENT ---
    let samSubject = '';
    let samBody = '';
    let userSubject = '';
    let userBody = '';

    if (outcome === 'calendar') {
      // Hot Lead (Calendar)
      samSubject = `🔥 HOT LEAD: ${name} wants to chat!`;
      samBody = `
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
        
        Talk soon,
        Sam & The Team
      `;
    } else {
      // Standard Email / Browsing
      samSubject = `New Website Inquiry: ${name} (${role})`;
      samBody = `
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
        
        For your records, here is what you sent us:
        "${message}"
        
        Speak soon,
        Sam & The Team
      `;
    }

    // --- 2. SEND THE EMAILS ---
    // TODO: Replace this pseudo-code with your actual email provider logic (e.g., Resend, SendGrid)
    /*
    await resend.emails.send({
      from: 'hello@yourdomain.com',
      to: 'sam@yourdomain.com',
      reply_to: email, // so Sam can directly reply to user
      subject: samSubject,
      text: samBody,
    });

    await resend.emails.send({
      from: 'hello@yourdomain.com',
      to: email, // The user's email
      subject: userSubject,
      text: userBody,
    });
    */

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}